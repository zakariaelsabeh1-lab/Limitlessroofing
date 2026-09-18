# Limitless Roofing Inc.

Single-page marketing site for Limitless Roofing Inc. (Prince George, BC, serving all of BC). Built to chase leads: every section drives to a free estimate or a phone call.

## Stack

- React 19 + Vite
- Framer Motion (reveals, curtain, mobile menu, lightbox)
- Google Fonts: Barlow Condensed (display) + Sora (body)

## Media assets (drop in, no code changes)

All optional media is auto-detected at build time. Drop the file in, rebuild,
and it appears. If a file is missing, the site falls back to a dark gradient or
panel so nothing breaks.

- `public/hero.mp4` + `public/hero-poster.jpg` — full-screen hero video (slow zoom + parallax)
- `public/services/metal.jpg`, `shingles.jpg`, `composite.jpg`, `torch-on.jpg`, `epdm.jpg` — service card backgrounds
- `public/sections/why.jpg`, `public/sections/warranty.jpg` — section backgrounds (parallax)

## Develop

```bash
npm install
npm run dev
```

Build and preview production:

```bash
npm run build
npm run preview
```

## Adding gallery photos (no code changes)

The "Our Work" gallery reads whatever image pairs exist in `public/work/`.
Drop optimized files named `work-04.webp` and `work-04.jpg` (and so on) into
`public/work/`, then rebuild. They appear automatically. A rotating roof-type
label is applied to each new photo.

To optimize new source photos (resize + webp/jpg), adjust the file list in
`scripts/assets.mjs` and run:

```bash
node scripts/assets.mjs
```

This script also extracts the brand green from the logo and writes `public/logo.png`.

## Configuration

- Business details (phone, hours, email, service area): `src/data.js`
- Testimonials block is built but hidden behind `SHOW_TESTIMONIALS` in `src/data.js`.
  Flip it to `true` once real reviews exist.
- Brand colours and design tokens: top of `src/index.css`.
- Contact form uses a stubbed submit handler (`src/components/Contact.jsx`).
  Wire it to an email service, CRM, or serverless endpoint when ready.

## SEO

Title, meta description, Open Graph/Twitter tags, and `RoofingContractor`
JSON-LD (name, phone, hours, service area) live in `index.html`.
