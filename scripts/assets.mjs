import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

async function main() {
  await mkdir('public/work', { recursive: true })

  // --- Sample the dominant vivid green from the logo ---
  const logo = 'Logo/1.png'
  const { data, info } = await sharp(logo)
    .resize(320, 320, { fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true })
  const ch = info.channels
  const buckets = new Map()
  let best = null
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    // vivid green: green dominant, saturated
    if (g > 110 && g > r * 1.35 && g > b * 1.35) {
      const key = `${r >> 3}_${g >> 3}_${b >> 3}`
      const cur = buckets.get(key) || { r: 0, g: 0, b: 0, n: 0 }
      cur.r += r; cur.g += g; cur.b += b; cur.n++
      buckets.set(key, cur)
      if (!best || cur.n > best.n) best = cur
    }
  }
  const R = Math.round(best.r / best.n)
  const G = Math.round(best.g / best.n)
  const B = Math.round(best.b / best.n)
  const hex = '#' + [R, G, B].map((v) => v.toString(16).padStart(2, '0')).join('')
  console.log('DOMINANT GREEN:', hex, { R, G, B })

  // --- Optimize logo into public/ ---
  await sharp(logo)
    .resize(512, 512, { fit: 'inside' })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile('public/logo.png')
  console.log('wrote public/logo.png')

  // --- Convert gallery photos ---
  const gallery = [
    ['Gallery/IMG_0679.jpeg', 'work-01'],
    ['Gallery/IMG_0677.jpeg', 'work-02'],
    ['Gallery/IMG_0142.jpeg', 'work-03'],
  ]
  for (const [src, name] of gallery) {
    await sharp(src)
      .rotate()
      .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(`public/work/${name}.webp`)
    await sharp(src)
      .rotate()
      .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(`public/work/${name}.jpg`)
    console.log('wrote public/work/' + name)
  }

  // --- OG image from a gallery shot ---
  await sharp('Gallery/IMG_0679.jpeg')
    .rotate()
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile('public/og.jpg')
  console.log('wrote public/og.jpg')
}

main().catch((e) => { console.error(e); process.exit(1) })
