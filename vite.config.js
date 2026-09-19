import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const publicDir = fileURLToPath(new URL('./public', import.meta.url))

// Scans public/work for image pairs and exposes them as a virtual module.
// Drop new files named work-XX.webp / work-XX.jpg into public/work and they
// appear on the site automatically. No code changes needed.
function workGalleryPlugin() {
  const virtualId = 'virtual:work-gallery'
  const resolvedId = '\0' + virtualId
  const workDir = fileURLToPath(new URL('./public/work', import.meta.url))

  function scan() {
    let files = []
    try {
      files = readdirSync(workDir)
    } catch {
      return []
    }
    // collect display bases (ignore -thumb variants; they belong to a base)
    const bases = new Set()
    for (const f of files) {
      const m = f.match(/^(.*)\.(webp|jpg|jpeg|png)$/i)
      if (m && !/-thumb$/i.test(m[1])) bases.add(m[1])
    }
    const names = [...bases].sort()
    return names.map((name) => {
      const has = (n) => files.some((f) => f.toLowerCase() === n.toLowerCase())
      const pick = (n) => (has(n) ? `/work/${n}` : null)
      const fullWebp = pick(`${name}.webp`)
      const fullJpg =
        pick(`${name}.jpg`) || pick(`${name}.jpeg`) || pick(`${name}.png`) || fullWebp
      const thumbWebp = pick(`${name}-thumb.webp`)
      const thumbJpg = pick(`${name}-thumb.jpg`)
      return {
        name,
        // full-resolution for the lightbox
        webp: fullWebp || fullJpg,
        jpg: fullJpg,
        // mobile-optimised thumbnail for the grid (falls back to full)
        thumbWebp: thumbWebp || fullWebp || fullJpg,
        thumbJpg: thumbJpg || fullJpg,
      }
    })
  }

  return {
    name: 'work-gallery',
    resolveId: (id) => (id === virtualId ? resolvedId : undefined),
    load(id) {
      if (id === resolvedId) return `export const works = ${JSON.stringify(scan())}`
    },
    configureServer(server) {
      const invalidate = () => {
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.add(workDir)
      server.watcher.on('add', invalidate)
      server.watcher.on('unlink', invalidate)
    },
  }
}

// Detects which optional media assets exist in public/ so components can render
// real photos/video when present and fall back to a dark gradient otherwise.
// Guarantees no 404s: paths are only emitted for files that actually exist.
function siteAssetsPlugin() {
  const virtualId = 'virtual:site-assets'
  const resolvedId = '\0' + virtualId

  const has = (rel) => (existsSync(fileURLToPath(new URL(`./public/${rel}`, import.meta.url))) ? `/${rel}` : null)

  function scan() {
    return {
      heroVideo: has('hero.mp4'),
      heroPoster: has('hero-poster.jpg'),
      services: {
        metal: has('services/metal.jpg'),
        shingles: has('services/shingles.jpg'),
        composite: has('services/composite.jpg'),
        'torch-on': has('services/torch-on.jpg'),
        epdm: has('services/epdm.jpg'),
      },
      sections: {
        why: has('sections/why.jpg'),
        warranty: has('sections/warranty.jpg'),
      },
    }
  }

  return {
    name: 'site-assets',
    resolveId: (id) => (id === virtualId ? resolvedId : undefined),
    load(id) {
      if (id === resolvedId) return `export const assets = ${JSON.stringify(scan())}`
    },
    configureServer(server) {
      const invalidate = () => {
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.add(publicDir)
      server.watcher.on('add', invalidate)
      server.watcher.on('unlink', invalidate)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), workGalleryPlugin(), siteAssetsPlugin()],
})
