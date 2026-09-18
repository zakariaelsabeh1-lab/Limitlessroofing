import { TRUST } from '../data'

export default function Marquee() {
  const items = [...TRUST, ...TRUST]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
            <svg className="star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2 15 9l7 3-7 3-3 7-3-7-7-3 7-3z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
