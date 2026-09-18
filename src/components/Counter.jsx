import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

// Animated count-up that fires when scrolled into view.
export default function Counter({ to, duration = 1600, prefix = '', suffix = '', display }) {
  const [ref, inView] = useInView()
  const [val, setVal] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (!inView || done.current) return
    done.current = true
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dur = reduced ? 0 : duration
    let raf
    const start = performance.now()
    const ease = (x) => 1 - Math.pow(1 - x, 3)
    const tick = (now) => {
      const p = dur === 0 ? 1 : Math.min((now - start) / dur, 1)
      setVal(Math.round(ease(p) * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className="num">
      {display ? (
        display
      ) : (
        <>
          {prefix}
          {val}
          {suffix && <span className="u">{suffix}</span>}
        </>
      )}
    </span>
  )
}
