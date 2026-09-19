import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { works } from 'virtual:work-gallery'
import Reveal from './Reveal'
import { ArrowUpRight, Close } from './Icons'

const GRID_COUNT = 5

function Thumb({ w, index, onOpen }) {
  return (
    <button
      className={`wtile ${index === 0 ? 'wtile--lead' : ''}`}
      onClick={() => onOpen(index)}
      aria-label={`Open photo ${index + 1} of ${works.length} in full screen`}
    >
      <picture>
        <source srcSet={w.thumbWebp} type="image/webp" />
        <img src={w.thumbJpg} alt="Limitless Roofing project" loading="lazy" decoding="async" />
      </picture>
    </button>
  )
}

function Lightbox({ index, setIndex, onClose }) {
  const touchX = useRef(null)
  const total = works.length
  const go = (dir) => setIndex((i) => (i + dir + total) % total)

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // handlers only use stable setters/constants
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // preload neighbours so next/prev is instant
  useEffect(() => {
    for (const d of [1, -1]) {
      const n = works[(index + d + total) % total]
      const img = new Image()
      img.src = n.webp || n.jpg
    }
  }, [index, total])

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const cur = works[index]

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="lb-close" aria-label="Close gallery" onClick={onClose}>
        <Close />
      </button>

      {total > 1 && (
        <>
          <button
            className="lb-nav prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
          >
            <ArrowUpRight style={{ transform: 'rotate(-135deg)' }} />
          </button>
          <button
            className="lb-nav next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
          >
            <ArrowUpRight style={{ transform: 'rotate(45deg)' }} />
          </button>
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={cur.name}
          className="lb-stage"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <picture>
            <source srcSet={cur.webp} type="image/webp" />
            <img src={cur.jpg} alt={`Limitless Roofing project ${index + 1}`} />
          </picture>
        </motion.div>
      </AnimatePresence>

      <div className="lb-count">
        {index + 1} / {total}
      </div>
    </motion.div>
  )
}

export default function Work() {
  const [open, setOpen] = useState(null)
  const has = works && works.length > 0
  const grid = works.slice(0, GRID_COUNT)

  return (
    <section className="section work" id="work">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Our Work</span>
          <h2 className="section-title">
            Work we are <span className="hl">proud of</span>
          </h2>
          <p className="lede">Real projects across British Columbia. Tap any photo to view the full gallery.</p>
        </Reveal>

        {has ? (
          <>
            <Reveal className="wgrid">
              {grid.map((w, i) => (
                <Thumb key={w.name} w={w} index={i} onOpen={setOpen} />
              ))}
            </Reveal>

            {works.length > GRID_COUNT && (
              <Reveal className="wall-wrap" delay={0.1}>
                <button className="btn btn-ghost wall-btn" onClick={() => setOpen(0)}>
                  View all {works.length} photos
                  <ArrowUpRight />
                </button>
              </Reveal>
            )}
          </>
        ) : (
          <p className="lede">Project photos coming soon.</p>
        )}
      </div>

      <AnimatePresence>
        {open !== null && has && (
          <Lightbox index={open} setIndex={setOpen} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
