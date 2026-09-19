// Second stage: turn the WIC-decoded <base>.wic.jpg temporaries into the same
// optimized web set as scripts/work.mjs, then delete the temp and the .heic.
import sharp from 'sharp'
import { readdir, readFile, unlink, access } from 'node:fs/promises'

const dir = 'public/work'

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

async function main() {
  const files = await readdir(dir)
  const temps = files.filter((f) => f.endsWith('.wic.jpg'))
  let n = 0
  for (const t of temps) {
    const base = t.replace(/\.wic\.jpg$/, '')
    const input = await readFile(`${dir}/${t}`)
    const pipe = () => sharp(input, { failOn: 'none' }).rotate()
    await pipe().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${dir}/${base}.webp`)
    await pipe().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${dir}/${base}.jpg`)
    await pipe().resize(800, 800, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 74 }).toFile(`${dir}/${base}-thumb.webp`)
    await pipe().resize(800, 800, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 70, mozjpeg: true }).toFile(`${dir}/${base}-thumb.jpg`)
    await unlink(`${dir}/${t}`)
    if (await exists(`${dir}/${base}.heic`)) await unlink(`${dir}/${base}.heic`)
    n++
    process.stdout.write(`  ${base}          \r`)
  }
  console.log(`finished ${n} HEIC photos            `)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
