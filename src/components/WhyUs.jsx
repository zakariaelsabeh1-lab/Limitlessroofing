import { assets } from 'virtual:site-assets'
import { STATS } from '../data'
import { useParallax } from '../hooks/useParallax'
import Counter from './Counter'
import Reveal from './Reveal'

export default function WhyUs() {
  const bgRef = useParallax(0.18)
  const img = assets.sections.why
  return (
    <section className="section why has-bg" id="why">
      <div className="section-bg" aria-hidden="true">
        <div
          className="section-bg-media"
          ref={bgRef}
          style={img ? { backgroundImage: `url(${img})` } : undefined}
        />
        <div className="section-bg-overlay" />
      </div>

      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Why Limitless</span>
          <h2 className="section-title">
            Built on <span className="hl">experience</span>, backed in writing
          </h2>
          <p className="lede">
            A new company with a veteran on the roof. Owner Anthony brings 20 years of hands-on
            roofing to Prince George and all of British Columbia, with free estimates and a real
            warranty behind every job.
          </p>
        </Reveal>

        <div className="stats-grid">
          {STATS.map((st, i) => (
            <Reveal className="stat" key={i} delay={i * 0.08}>
              <div>
                <Counter
                  to={st.value}
                  prefix={st.prefix || ''}
                  suffix={st.suffix || ''}
                  display={st.display}
                />
              </div>
              <div className="slabel">{st.label2 || st.label}</div>
              <div className="ssub">{st.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
