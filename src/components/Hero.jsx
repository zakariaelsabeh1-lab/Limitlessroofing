import { motion } from 'framer-motion'
import { useRef } from 'react'
import { BUSINESS } from '../data'
import { useRoofScene } from '../hooks/useRoofScene'
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
  const canvasRef = useRef(null)
  useRoofScene(canvasRef)

  return (
    <section className="hero" id="top">
      <div className="hero-canvas" aria-hidden="true">
        <canvas ref={canvasRef} />
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
