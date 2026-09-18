import { TESTIMONIALS } from '../data'
import Reveal from './Reveal'

// Rendered only when SHOW_TESTIMONIALS is true (see App / data.js).
export default function Testimonials() {
  return (
    <section className="section testimonials" id="testimonials">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">What Clients Say</span>
          <h2 className="section-title">
            Trusted by <span className="hl">BC homeowners</span>
          </h2>
        </Reveal>
        <div className="tgrid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal className="tcard" key={i} delay={i * 0.08}>
              <p className="q">&ldquo;{t.quote}&rdquo;</p>
              <div className="a">
                {t.author}
                <span>{t.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
