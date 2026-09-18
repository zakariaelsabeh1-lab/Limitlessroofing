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
  const labels = [
    'Standing Seam Metal',
    'Architectural Shingle',
    'Flat Roof System',
    'Specialty Metal',
    'Cedar Shake',
    'Composite Roof',
  ]

  function scan() {
    let files = []
    try {
      files = readdirSync(workDir)
    } catch {
      return []
    }
    const bases = new Set()
    for (const f of files) {
      const m = f.match(/^(.*)\.(webp|jpg|jpeg|png)$/i)
      if (m) bases.add(m[1])
    }
    const names = [...bases].sort()
    return names.map((name, i) => {
      const has = (ext) => files.some((f) => f.toLowerCase() === `${name}.${ext}`.toLowerCase())
      const webp = has('webp') ? `/work/${name}.webp` : null
      const jpg = has('jpg')
        ? `/work/${name}.jpg`
        : has('jpeg')
          ? `/work/${name}.jpeg`
          : has('png')
            ? `/work/${name}.png`
            : webp
      // work-NN files use the rotating roof labels; any other filename is
      // humanized (e.g. deck-rebuild.jpg -> "Deck Rebuild") so non-roof
      // photos label themselves.
      const label = /^work-\d+$/i.test(name)
        ? labels[i % labels.length]
        : name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      return { name, webp: webp || jpg, jpg, label }
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
