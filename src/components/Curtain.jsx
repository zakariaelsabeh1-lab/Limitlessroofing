import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Page-load curtain reveal with the brandmark, then wipes up.
export default function Curtain() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setShow(false), reduced ? 200 : 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="curtain" initial={false}>
          <motion.div
            className="panel"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="brandmark"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src="/logo.png" alt="Limitless Roofing Inc." />
            <div className="load-line">
              <motion.i
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
