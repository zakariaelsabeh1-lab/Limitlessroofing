import { BUSINESS } from '../data'
import { Arrow, Phone } from './Icons'

// Mobile-only sticky bottom bar (shown via CSS media query).
export default function StickyCallBar() {
  return (
    <div className="callbar">
      <a className="cb-call" href={BUSINESS.phoneHref}>
        <Phone />
        Call Now
      </a>
      <a className="cb-quote" href="#contact">
        Free Estimate
        <Arrow />
      </a>
    </div>
  )
}
