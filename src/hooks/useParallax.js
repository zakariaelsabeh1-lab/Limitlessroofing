import { useEffect, useRef } from 'react'

// Subtle scroll parallax. Translates the target on Y as it moves through the
// viewport. `speed` is the fraction of scroll distance to offset by.
// Disabled for reduced-motion users.
export function useParallax(speed = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let ticking = false
    const update = () => {
      const rect = el.parentElement.getBoundingClientRect()
      const vh = window.innerHeight
      // progress: -1 (below) .. 1 (above), 0 when centered
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh
      const shift = -progress * speed * 100
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(1.12)`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        raf = requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])
  return ref
}
