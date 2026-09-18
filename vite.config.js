import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Scans public/work for image pairs and exposes them as a virtual module.
// Drop new files named work-XX.webp / work-XX.jpg into public/work and they
// appear on the site automatically. No code changes needed.
function workGalleryPlugin() {
  const virtualId = 'virtual:work-gallery'
  const resolvedId = '\0' + virtualId
  const workDir = fileURLToPath(new URL('./public/work', import.meta.url))
  // Rotating roof-type labels for the hover overlay + lightbox caption.
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
      return {
        name,
        webp: webp || jpg,
        jpg,
        label: labels[i % labels.length],
      }
    })
  }

  return {
    name: 'work-gallery',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(id) {
      if (id === resolvedId) {
        return `export const works = ${JSON.stringify(scan())}`
      }
    },
    configureServer(server) {
      // Refresh the module when files are added/removed in dev.
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), workGalleryPlugin()],
})
