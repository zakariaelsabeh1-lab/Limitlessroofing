import { STATS } from '../data'
import Counter from './Counter'
import Reveal from './Reveal'

export default function WhyUs() {
  return (
    <section className="section why" id="why">
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
