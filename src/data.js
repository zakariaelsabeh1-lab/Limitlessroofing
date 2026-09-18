// Central content + config for Limitless Roofing Inc.

export const BUSINESS = {
  name: 'Limitless Roofing Inc.',
  phoneDisplay: '250-991-1992',
  phoneHref: 'tel:+12509911992',
  email: 'info@limitlessroofing.ca',
  hours: 'Mon to Fri, 8am to 5pm',
  city: 'Prince George, BC',
  serviceArea: 'Serving British Columbia',
  experienceYears: 20,
  warrantyYears: 5,
  founded: 2025,
}

// Flip the testimonials block on once real reviews exist.
export const SHOW_TESTIMONIALS = false

export const SERVICES = [
  {
    id: 'metal',
    name: 'Residential Metal',
    tag: 'Standing seam and specialty',
    desc: 'Standing seam, interlocking metal shingles, and specialty profiles built to shed BC snow and last decades.',
    icon: 'metal',
  },
  {
    id: 'shingles',
    name: 'BP Shingles',
    tag: 'Asphalt and architectural',
    desc: 'BP asphalt and architectural shingles installed clean and tight, the dependable workhorse roof done right.',
    icon: 'shingle',
  },
  {
    id: 'cedar',
    name: 'Cedar Shakes',
    tag: 'Natural character',
    desc: 'Hand laid cedar shake roofing that brings warmth and character, sealed and ventilated to protect it.',
    icon: 'cedar',
  },
  {
    id: 'composite',
    name: 'Composite',
    tag: 'Modern and durable',
    desc: 'Composite roofing that mimics slate or shake with the toughness and low maintenance of modern materials.',
    icon: 'composite',
  },
  {
    id: 'flat',
    name: 'Flat Roofing',
    tag: 'Torch on, EPDM, TPO',
    desc: 'Commercial and residential flat systems. Torch on membrane, EPDM rubber, and welded TPO done watertight.',
    icon: 'flat',
  },
  {
    id: 'specialty',
    name: 'Specialty Metal',
    tag: 'Interlocking shingle',
    desc: 'Interlocking metal shingle systems and custom flashing work for roofs that need a sharper finish.',
    icon: 'specialty',
  },
]

export const STATS = [
  { value: 20, suffix: '', label: 'Years of experience', sub: 'Hands-on across every roof type' },
  { value: 5, suffix: 'yr', label: 'Labour warranty', sub: 'Backed in writing on every job' },
  { value: 100, suffix: '%', label: 'Free estimates', sub: 'No cost, no pressure quotes' },
  { value: 1, suffix: '', label: 'Province served', prefix: '', display: 'BC', label2: 'BC wide coverage', sub: 'Based in Prince George' },
]

export const TRUST = [
  'Free Estimates',
  '5 Year Labour Warranty',
  '20 Years Experience',
  'Serving All of BC',
  'Residential and Commercial',
  'Metal, Shingle, Cedar and Flat',
]

export const WARRANTY_POINTS = [
  {
    title: '5 Year Labour Warranty',
    body: 'Every installation is backed by a five year labour warranty in writing. If our workmanship fails, we make it right. That is our name on your roof.',
  },
  {
    title: 'Free Estimates, Always',
    body: 'We come out, climb up, and give you an honest, detailed quote at no cost. No pressure, no surprises, no fine print games.',
  },
  {
    title: '20 Years of Roofs',
    body: 'Owner Anthony has spent two decades on roofs across every material and every kind of weather BC can throw at a building. That experience is on every job.',
  },
]

// Kept behind SHOW_TESTIMONIALS. Placeholder copy until real reviews land.
export const TESTIMONIALS = [
  {
    quote: 'Placeholder testimonial. Real reviews go here once the first jobs are complete.',
    author: 'Client Name',
    role: 'Prince George, BC',
  },
]
