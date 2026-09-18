import { useState } from 'react'
import { BUSINESS, SERVICES } from '../data'
import Reveal from './Reveal'
import { Arrow, Clock, Mail, Phone, Pin } from './Icons'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // Stubbed handler. Wire to email/CRM/serverless endpoint when ready.
    const data = Object.fromEntries(new FormData(e.currentTarget))
    console.log('Estimate request:', data)
    setSent(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Get a Free Estimate</span>
          <h2 className="section-title">
            Let&apos;s talk about <span className="hl">your roof</span>
          </h2>
          <p className="lede">
            Tell us what you need. We&apos;ll set up a free, no pressure estimate anywhere in BC.
            Prefer to talk now? Call {BUSINESS.phoneDisplay}.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            {sent ? (
              <div className="form-success" role="status">
                Thanks, your request is in. Anthony will reach out shortly to book your free
                estimate. Need it sooner? Call {BUSINESS.phoneDisplay}.
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit}>
                <div className="row">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="250-000-0000" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com" />
                </div>
                <div className="field">
                  <label htmlFor="service">Service needed</label>
                  <select id="service" name="service" defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Not sure">Not sure yet</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="message">Project details</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Roof type, rough size, timeline, anything helpful."
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Request My Free Estimate
                  <Arrow />
                </button>
                <p className="form-note">Free estimates. No obligation. We serve all of BC.</p>
              </form>
            )}
          </Reveal>

          <Reveal className="contact-side" delay={0.1}>
            <a className="cinfo" href={BUSINESS.phoneHref}>
              <span className="ci-ic">
                <Phone />
              </span>
              <span>
                <span className="ci-k">Call Now</span>
                <span className="ci-v big">{BUSINESS.phoneDisplay}</span>
              </span>
            </a>
            <a className="cinfo" href={`mailto:${BUSINESS.email}`}>
              <span className="ci-ic">
                <Mail />
              </span>
              <span>
                <span className="ci-k">Email</span>
                <span className="ci-v">{BUSINESS.email}</span>
              </span>
            </a>
            <div className="cinfo">
              <span className="ci-ic">
                <Clock />
              </span>
              <span>
                <span className="ci-k">Hours</span>
                <span className="ci-v">{BUSINESS.hours}</span>
              </span>
            </div>
            <div className="cinfo">
              <span className="ci-ic">
                <Pin />
              </span>
              <span>
                <span className="ci-k">Service Area</span>
                <span className="ci-v">
                  {BUSINESS.city}. {BUSINESS.serviceArea}.
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
