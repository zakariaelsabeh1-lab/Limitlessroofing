import { BUSINESS } from '../data'

export default function Footer() {
  const year = 2026
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a className="brand" href="#top">
              <img src="/logo.png" alt="Limitless Roofing Inc. logo" />
              <span className="bt">
                <strong>
                  LIMIT<b>LESS</b>
                </strong>
                <span>Roofing Inc.</span>
              </span>
            </a>
            <p className="footer-blurb">
              Trusted roofing across British Columbia, backed by 20 years of experience and a 5 year
              labour warranty. Free estimates, every time.
            </p>
          </div>

          <div className="footer-col">
            <h5>Explore</h5>
            <a href="#services">Services</a>
            <a href="#work">Our Work</a>
            <a href="#warranty">Warranty</a>
            <a href="#contact">Get a Free Estimate</a>
          </div>

          <div className="footer-col">
            <h5>Contact</h5>
            <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            <p>{BUSINESS.hours}</p>
            <p>
              {BUSINESS.city}. {BUSINESS.serviceArea}.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {BUSINESS.name}. All rights reserved. Prince George, BC. Serving all of BC.
          </span>
          <span className="footer-credit">
            Website developed by{' '}
            <a href="https://www.northgatedigital.ca" target="_blank" rel="noopener noreferrer">
              Northgate Digital
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
