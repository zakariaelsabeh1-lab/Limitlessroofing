import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BUSINESS } from '../data'
import { Arrow, Phone } from './Icons'

const LINKS = [
  ['Services', '#services'],
  ['Our Work', '#work'],
  ['Warranty', '#warranty'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <a className="brand" href="#top" aria-label="Limitless Roofing Inc. home">
            <img src="/logo.png" alt="Limitless Roofing Inc. logo" />
            <span className="bt">
              <strong>
                LIMIT<b>LESS</b>
              </strong>
              <span>Roofing Inc.</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-cta">
            <a className="call-btn" href={BUSINESS.phoneHref}>
              <Phone />
              Call Now
            </a>
            <button
              className={`hamburger ${open ? 'open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map(([label, href], i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                <span className="n">0{i + 1}</span>
                {label}
              </motion.a>
            ))}
            <motion.div
              className="mm-ctas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>
                Get a Free Estimate
                <Arrow />
              </a>
              <a className="btn btn-ghost" href={BUSINESS.phoneHref} onClick={() => setOpen(false)}>
                <Phone />
                Call {BUSINESS.phoneDisplay}
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
