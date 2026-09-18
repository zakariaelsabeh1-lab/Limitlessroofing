import { assets } from 'virtual:site-assets'
import { SERVICES } from '../data'
import Reveal from './Reveal'
import { Arrow } from './Icons'

// Tall image card: full-bleed photo, dark gradient from the bottom, name and
// one line of copy over the gradient, green accent bar + gentle lift on hover.
// Falls back to a dark textured panel when the photo is missing.
function Card({ s, index }) {
  const img = assets.services[s.image]
  return (
    <Reveal
      as="a"
      href="#contact"
      className={`scard ${img ? '' : 'no-img'}`}
      delay={index * 0.07}
      aria-label={`${s.name}. ${s.desc} Get a free estimate.`}
      style={img ? { backgroundImage: `url(${img})` } : undefined}
    >
      <span className="scard-shade" />
      <span className="scard-body">
        <h3>{s.name}</h3>
        <span className="scard-desc">{s.desc}</span>
        <span className="scard-cta">
          Get Estimate
          <Arrow />
        </span>
      </span>
      <span className="scard-bar" />
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
