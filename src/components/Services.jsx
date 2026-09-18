import { useState } from 'react'
import { SERVICES } from '../data'
import Reveal from './Reveal'
import { Arrow, SERVICE_ICONS } from './Icons'

function Card({ s, index }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = SERVICE_ICONS[s.icon]
  return (
    <Reveal
      className={`flip ${flipped ? 'flipped' : ''}`}
      delay={(index % 3) * 0.08}
      role="button"
      tabIndex={0}
      aria-label={`${s.name}. ${s.desc}`}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((v) => !v)
        }
      }}
    >
      <div className="flip-inner">
        <div className="flip-face flip-front">
          <span className="fnum">0{index + 1}</span>
          <div className="flip-icon">
            <Icon />
          </div>
          <div>
            <h3>{s.name}</h3>
            <div className="ftag">{s.tag}</div>
            <div className="fhint">Hover to learn more</div>
          </div>
        </div>
        <div className="flip-face flip-back">
          <div>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
          </div>
          <a className="estimate" href="#contact" onClick={(e) => e.stopPropagation()}>
            Get Estimate
            <Arrow />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">What We Do</span>
          <h2 className="section-title">
            Every roof, <span className="hl">done right</span>
          </h2>
          <p className="lede">
            Residential and commercial roofing across BC. Pick the system that fits your building
            and your budget, we install all of them to the same standard.
          </p>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Card key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
