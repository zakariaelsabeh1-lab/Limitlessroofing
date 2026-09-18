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

// `image` maps to public/services/<image>.jpg (rendered when the file exists,
// dark textured placeholder otherwise). One line of copy per card.
export const SERVICES = [
  {
    id: 'metal',
    name: 'Metal Roofing',
    desc: 'Standing seam and interlocking metal built to shed BC snow for decades.',
    icon: 'metal',
    image: 'metal',
  },
  {
    id: 'shingles',
    name: 'Asphalt Shingles',
    desc: 'BP architectural shingles installed clean and tight, the workhorse roof done right.',
    icon: 'shingle',
    image: 'shingles',
  },
  {
    id: 'composite',
    name: 'Composite',
    desc: 'The look of slate or shake with modern toughness and low maintenance.',
    icon: 'composite',
    image: 'composite',
  },
  {
    id: 'torch-on',
    name: 'Torch On',
    desc: 'Torch on membrane flat roofing sealed watertight on low slope roofs.',
    icon: 'flat',
    image: 'torch-on',
  },
  {
    id: 'epdm',
    name: 'EPDM',
    desc: 'EPDM rubber flat roofing built for durability and clean, lasting seams.',
    icon: 'specialty',
    image: 'epdm',
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
  'Metal, Shingle and Flat Roofing',
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
