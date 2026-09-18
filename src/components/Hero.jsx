import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { assets } from 'virtual:site-assets'
import { BUSINESS } from '../data'
import { Arrow, Phone } from './Icons'

const LINES = [
  [{ t: 'Trusted Roofing' }],
  [{ t: 'Across BC' }],
  [{ t: 'Backed By ' }, { t: '20 Years', hl: true }],
  [{ t: 'Of Experience' }],
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.45 } },
}
const lineV = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}
const fadeV = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const mediaRef = useRef(null)

  // Slow parallax drift on the media as the hero scrolls out of view.
  useEffect(() => {
    const el = mediaRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let ticking = false
    const update = () => {
      const y = window.scrollY || 0
      const shift = Math.min(y, window.innerHeight) * 0.28
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        raf = requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-media" ref={mediaRef}>
          {assets.heroVideo ? (
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster={assets.heroPoster || undefined}
            >
              <source src={assets.heroVideo} type="video/mp4" />
            </video>
          ) : assets.heroPoster ? (
            <img className="hero-video" src={assets.heroPoster} alt="" />
          ) : null}
        </div>
      </div>

      <div className="wrap hero-inner">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={fadeV}>
            <span className="badge-free">
              <span className="dot" />
              Free Estimates
            </span>
          </motion.div>

          <h1>
            {LINES.map((line, i) => (
              <span className="line" key={i}>
                <motion.span variants={lineV}>
                  {line.map((seg, j) => (
                    <span key={j} className={seg.hl ? 'hl' : ''}>
                      {seg.t}
                    </span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero-sub" variants={fadeV}>
            Limitless Roofing Inc. builds roofs to last across British Columbia. Metal, shingle,
            cedar, composite, and flat systems installed with two decades of hands-on experience and
            a 5 year labour warranty.
          </motion.p>

          <motion.div className="hero-cta" variants={fadeV}>
            <a className="btn btn-primary" href="#contact">
              Get a Free Estimate
              <Arrow />
            </a>
            <a className="btn btn-ghost" href={BUSINESS.phoneHref}>
              <Phone />
              Call {BUSINESS.phoneDisplay}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="mouse">
          <i />
        </div>
        Scroll
      </div>
    </section>
  )
}
