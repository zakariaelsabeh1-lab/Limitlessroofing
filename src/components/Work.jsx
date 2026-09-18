import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { works } from 'virtual:work-gallery'
import { useInView } from '../hooks/useInView'
import Reveal from './Reveal'
import { ArrowUpRight, Close, Expand } from './Icons'

function GalleryItem({ w, index, onOpen }) {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <button
      ref={ref}
      className={`gitem ${inView ? 'in' : ''}`}
      onClick={() => onOpen(index)}
      aria-label={`View ${w.label} project`}
    >
      <picture>
        {w.webp && <source srcSet={w.webp} type="image/webp" />}
        <img src={w.jpg} alt={`${w.label} project by Limitless Roofing`} loading="lazy" decoding="async" />
      </picture>
      <span className="gexpand">
        <Expand />
      </span>
      <span className="glabel">
        <span className="gk">Limitless Roofing</span>
        <span className="gt">{w.label}</span>
      </span>
      <span className="reveal-mask" />
    </button>
  )
}

export default function Work() {
  const [open, setOpen] = useState(null)
  const has = works && works.length > 0

  useEffect(() => {
    if (open === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % works.length)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + works.length) % works.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <section className="section work" id="work">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Our Work</span>
          <h2 className="section-title">
            Work we are <span className="hl">proud of</span>
          </h2>
          <p className="lede">
            Real projects, real BC weather. A look at the standard Limitless brings to every job.
          </p>
        </Reveal>

        {has ? (
          <div className="gallery">
            {works.map((w, i) => (
              <GalleryItem key={w.name} w={w} index={i} onOpen={setOpen} />
            ))}
          </div>
        ) : (
          <p className="lede">Project photos coming soon.</p>
        )}
      </div>

      <AnimatePresence>
        {open !== null && has && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
          >
            <button className="lb-close" aria-label="Close" onClick={() => setOpen(null)}>
              <Close />
            </button>
            {works.length > 1 && (
              <>
                <button
                  className="lb-nav prev"
                  aria-label="Previous"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpen((i) => (i - 1 + works.length) % works.length)
                  }}
                >
                  <ArrowUpRight style={{ transform: 'rotate(-135deg)' }} />
                </button>
                <button
                  className="lb-nav next"
                  aria-label="Next"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpen((i) => (i + 1) % works.length)
                  }}
                >
                  <ArrowUpRight style={{ transform: 'rotate(45deg)' }} />
                </button>
              </>
            )}
            <motion.div
              key={works[open].name}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <picture>
                {works[open].webp && <source srcSet={works[open].webp} type="image/webp" />}
                <img src={works[open].jpg} alt={`${works[open].label} project`} />
              </picture>
            </motion.div>
            <div className="lb-cap">{works[open].label}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
