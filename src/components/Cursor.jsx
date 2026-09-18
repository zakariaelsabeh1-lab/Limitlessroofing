import { useEffect, useRef, useState } from 'react'

// Eligible only on true desktop pointers: fine pointer, hover capable,
// not a coarse/touch device, and viewport >= 1024px.
function isEligible() {
  if (typeof window === 'undefined') return false
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  const wide = window.matchMedia('(min-width: 1024px)').matches
  const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
  return fine && !coarse && wide && !(touch && !fine)
}

export default function Cursor() {
  const [eligible, setEligible] = useState(false)

  // Re-evaluate on resize/orientation so it drops out below 1024px.
  useEffect(() => {
    const check = () => setEligible(isEligible())
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!eligible) return null
  return <CursorLayer />
}

function CursorLayer() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('custom-cursor')
    const dot = dotRef.current
    const ring = ringRef.current
    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let raf
    let shown = false

    const reveal = () => {
      if (shown) return
      shown = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!shown) {
        rx = mx
        ry = my
        reveal()
      }
      dot.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`
      if (reduced) ring.style.transform = `translate(${mx - 19}px, ${my - 19}px)`
    }
    const onOver = (e) => {
      if (e.target.closest('a, button, input, select, textarea, .scard, .gitem, label')) {
        ring.classList.add('hot')
      } else {
        ring.classList.remove('hot')
      }
    }
    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      shown = false
    }
    const loop = () => {
      rx += (mx - rx) * 0.08
      ry += (my - ry) * 0.08
      ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('mouseleave', onLeave)
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
