import sharp from 'sharp'
import { readFile, writeFile, rename } from 'node:fs/promises'

const src = 'public/logo.png'
const buf = await readFile(src)
const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info
const idx = (x, y) => (y * W + x) * C
const isBg = (i) => data[i] < 36 && data[i + 1] < 36 && data[i + 2] < 36

// flood fill transparency from the borders through connected near-black bg
const stack = []
const seen = new Uint8Array(W * H)
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return
  const p = y * W + x
  if (seen[p]) return
  seen[p] = 1
  if (isBg(idx(x, y))) stack.push(x, y)
}
for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1) }
for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y) }
while (stack.length) {
  const y = stack.pop(), x = stack.pop()
  data[idx(x, y) + 3] = 0
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1)
}

const out = await sharp(data, { raw: { width: W, height: H, channels: C } }).png().toBuffer()
await writeFile('public/logo.tmp.png', out)
await rename('public/logo.tmp.png', src)
let transp = 0
for (let i = 3; i < data.length; i += C) if (data[i] === 0) transp++
console.log(`transparent now: ${Math.round((100 * transp) / (W * H))}% of ${W}x${H}`)
