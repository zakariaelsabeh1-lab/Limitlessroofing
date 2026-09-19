// Convert + optimize every source photo in public/work into web formats.
// For each <base> it writes:
//   <base>.webp / <base>.jpg          full size (max 1600px long edge)
//   <base>-thumb.webp / <base>-thumb.jpg   grid thumbnail (max 800px)
// Source HEIC/HEIF and raw oversized JPEGs are removed after conversion so
// only optimized web assets ship. Re-run any time new photos are dropped in.
import sharp from 'sharp'
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises'

const dir = 'public/work'
const SRC = /\.(heic|heif|jpe?g|png)$/i

function baseOf(f) {
  return f.replace(SRC, '')
}

async function main() {
  const files = await readdir(dir)
  // unique base names from real source images, ignoring generated thumbs
  const bases = new Map()
  for (const f of files) {
    if (!SRC.test(f)) continue
    const base = baseOf(f)
    if (base.endsWith('-thumb')) continue
    // prefer a non-jpg original (heic) as the highest-quality source
    if (!bases.has(base) || /\.(heic|heif)$/i.test(f)) bases.set(base, f)
  }

  let n = 0
  const done = new Set()
  const failed = []
  for (const [base, src] of bases) {
    try {
      const input = await readFile(`${dir}/${src}`)
      const pipe = () => sharp(input, { failOn: 'none' }).rotate()
      await pipe().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${dir}/${base}.webp`)
      await pipe().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${dir}/${base}.jpg`)
      await pipe().resize(800, 800, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 74 }).toFile(`${dir}/${base}-thumb.webp`)
      await pipe().resize(800, 800, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 70, mozjpeg: true }).toFile(`${dir}/${base}-thumb.jpg`)
      done.add(base)
      n++
      process.stdout.write(`  ${base}          \r`)
    } catch (e) {
      failed.push(`${src}: ${String(e.message).split('\n')[0]}`)
    }
  }
  console.log(`converted ${n}/${bases.size} photos            `)
  if (failed.length) {
    console.log('FAILED:')
    failed.forEach((f) => console.log('  ' + f))
  }

  // remove non-web originals only for bases that converted successfully
  const keep = new Set()
  for (const base of done) {
    keep.add(`${base}.webp`)
    keep.add(`${base}.jpg`)
    keep.add(`${base}-thumb.webp`)
    keep.add(`${base}-thumb.jpg`)
  }
  let removed = 0
  for (const f of await readdir(dir)) {
    // only remove originals whose base converted successfully
    if (SRC.test(f) && done.has(baseOf(f)) && !keep.has(f)) {
      await unlink(`${dir}/${f}`)
      removed++
    }
  }
  console.log(`removed ${removed} source originals`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
