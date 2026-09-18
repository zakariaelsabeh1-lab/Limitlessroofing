import { BUSINESS, WARRANTY_POINTS } from '../data'
import Reveal from './Reveal'
import { Arrow } from './Icons'

export default function Warranty() {
  return (
    <section className="section warranty" id="warranty">
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
