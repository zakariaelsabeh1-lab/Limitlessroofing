import { assets } from 'virtual:site-assets'
import { BUSINESS, WARRANTY_POINTS } from '../data'
import { useParallax } from '../hooks/useParallax'
import Reveal from './Reveal'
import { Arrow } from './Icons'

export default function Warranty() {
  const bgRef = useParallax(0.18)
  const img = assets.sections.warranty
  return (
    <section className="section warranty has-bg" id="warranty">
      <div className="section-bg" aria-hidden="true">
        <div
          className="section-bg-media"
          ref={bgRef}
          style={img ? { backgroundImage: `url(${img})` } : undefined}
        />
        <div className="section-bg-overlay warranty-overlay" />
      </div>

      <div className="wrap warranty-grid">
        <Reveal className="warranty-seal">
          <span className="ring" />
          <span className="ring g" />
          <span className="core">
            <span className="big">{BUSINESS.warrantyYears}</span>
            <span className="lbl">Year Labour Warranty</span>
          </span>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">Why Choose Limitless</span>
            <h2 className="section-title">
              A roof, and a <span className="hl">promise</span>
            </h2>
          </Reveal>

          <div className="warranty-list">
            {WARRANTY_POINTS.map((p, i) => (
              <Reveal className="wpoint" key={i} delay={i * 0.08}>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <a className="btn btn-primary" href="#contact" style={{ marginTop: '2rem' }}>
              Get a Free Estimate
              <Arrow />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
