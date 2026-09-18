// Inline SVG icons. Stroke-based, 24x24 viewBox, currentColor.
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Phone = (p) => (
  <svg {...base} {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
)
export const Arrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowUpRight = (p) => (
  <svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const Mail = (p) => (
  <svg {...base} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
)
export const Clock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const Pin = (p) => (
  <svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
)
export const Expand = (p) => (
  <svg {...base} {...p}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
)
export const Close = (p) => (
  <svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
)
export const Check = (p) => (
  <svg {...base} {...p}><path d="M20 6 9 17l-5-5" /></svg>
)

// service icons
export const Metal = (p) => (
  <svg {...base} {...p}><path d="M3 10 12 4l9 6" /><path d="M5 10v10M9 10v10M12 10v10M15 10v10M19 10v10" /><path d="M3 20h18" /></svg>
)
export const Shingle = (p) => (
  <svg {...base} {...p}><path d="M2 9 12 4l10 5" /><path d="M4 11h4v3H4zM10 11h4v3h-4zM16 11h4v3h-4zM7 15h4v3H7zM13 15h4v3h-4z" /></svg>
)
export const Cedar = (p) => (
  <svg {...base} {...p}><path d="M4 8 12 4l8 4" /><path d="M6 9v11M10 9v11M14 9v11M18 9v11" /><path d="M4 20h16" /></svg>
)
export const Composite = (p) => (
  <svg {...base} {...p}><path d="M3 9 12 4l9 5v11H3z" /><path d="M3 13h18M8 9v11M16 9v11" /></svg>
)
export const Flat = (p) => (
  <svg {...base} {...p}><path d="M3 8h18v3H3z" /><path d="M5 11v9M19 11v9M5 20h14" /><path d="M9 8V5h6v3" /></svg>
)
export const Specialty = (p) => (
  <svg {...base} {...p}><path d="M12 3 3 8v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5M12 13v8" /></svg>
)

export const SERVICE_ICONS = {
  metal: Metal,
  shingle: Shingle,
  cedar: Cedar,
  composite: Composite,
  flat: Flat,
  specialty: Specialty,
}
