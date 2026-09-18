import { useEffect, useRef } from 'react'

// Custom cursor with 0.08 lerp on the ring, instant dot.
// Only mounts on fine-pointer, hover-capable devices.
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine) return

    document.body.classList.add('custom-cursor')
    const dot = dotRef.current
    const ring = ringRef.current
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`
      if (reduced) ring.style.transform = `translate(${mx - 19}px, ${my - 19}px)`
    }
    const onOver = (e) => {
      if (e.target.closest('a, button, input, select, textarea, .flip, .gitem, label')) {
        ring.classList.add('hot')
      } else {
        ring.classList.remove('hot')
      }
    }
    const loop = () => {
      rx += (mx - rx) * 0.08
      ry += (my - ry) * 0.08
      ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
