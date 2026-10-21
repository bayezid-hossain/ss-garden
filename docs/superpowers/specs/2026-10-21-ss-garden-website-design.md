# SS Garden Website Design

Date: 2026-10-21

## Summary

Marketing and project-showcase website for SS Garden, a full-service building developer in Dhaka, Bangladesh. It builds residential apartments, commercial buildings, duplexes/villas/private homes, and develops landowners' plots under joint-venture agreements. The site is modelled on the structure of trikonarchitects.com (projects listing with filters, project detail page with spec list, story, concept and gallery), adapted for a developer selling to flat buyers and landowners.

## Design Read

Reading this as: premium real-estate developer site for flat buyers and landowners in Dhaka, with a "Forest Monolith" language (stone and concrete greys with the logo green, sharp corners), leaning toward Tailwind v4 utilities, Cabinet Grotesk + Satoshi, and a real-time 3D hero.

Dials: DESIGN_VARIANCE 7, MOTION_INTENSITY 6, VISUAL_DENSITY 3.

Brand: logo at `icon.jpg` (green leaf mark, serif wordmark "SS Garden", tagline "Your ultimate solution for landscaping and gardening"). The tagline describes landscaping and does not match the business; the site uses its own copy. The logo itself is kept unchanged.

## Goals and Non-Goals

Goals:
- Show completed, ongoing and upcoming projects with enough detail for a buyer to enquire.
- Give landowners a clear joint-venture pitch and a way to submit a plot.
- Feel premium and 3D without hurting load time or phone performance.
- Deploy to cPanel shared hosting as plain static files.

Non-goals:
- No CMS, user accounts, payments or online booking.
- No Bangla language toggle (English only for now).
- No server-side rendering or Node process on the host.

## Stack and Deployment

- Next.js App Router with `output: 'export'` and `trailingSlash: true`. `npm run build` produces `out/`, uploaded to `public_html`.
- Tailwind v4, Phosphor icons (one family, one stroke width).
- Fonts: Cabinet Grotesk (headings) and Satoshi (body), both from Fontshare, self-hosted with `font-display: swap`.
- Motion (`motion/react`) for reveals, hover and micro-interactions. GSAP + ScrollTrigger only for the pinned horizontal pan and the sticky card stack. Each GSAP section is an isolated `'use client'` leaf; GSAP and Three.js are never mixed with Motion in one component tree.
- 3D: `three`, `@react-three/fiber`, `@react-three/drei`, lazy-loaded.
- Theme: light and dark via CSS variables, defaulting to `prefers-color-scheme`, with a manual toggle in the nav. One accent (logo green) across the whole page. One shape system: sharp corners (radius 0) everywhere.
- Enquiry form posts to `public/api/enquiry.php`, which sends mail with PHP `mail()`. `.htaccess` adds caching rules and a custom 404.
- Dependencies are checked against `package.json` before use; install commands are given before any import.

## Sitemap

| Route | Purpose |
|---|---|
| `/` | Home |
| `/projects/` | All projects with filters |
| `/projects/[slug]/` | Project detail, pre-rendered per project via `generateStaticParams` |
| `/landowners/` | Joint-venture pitch and plot-submission form |
| `/about/` | Company, approach, team |
| `/contact/` | Form, map, office details |

One label per CTA intent across the site: **Find a home** (browse projects), **For landowners** (joint venture), **Book a visit** (contact).

## Home Page

Each section uses a different layout family.

1. **Hero (asymmetric split).** Left: headline "Buildings that breathe.", one line of copy (max 20 words), CTAs Find a home and For landowners. Right: live 3D tower with planted terraces. Fits the first viewport; top padding at most `pt-24`; nav is one line and at most 72px tall.
2. **Featured projects (pinned horizontal pan, GSAP).** Four large renders slide sideways while scrolling. Each shows name, area, status and links to its page.
3. **Browse by status (bento grid).** Exactly four tiles (Ongoing, Upcoming, Completed, Commercial) in mixed sizes, each with a real image.
4. **Landowner joint venture (full-width zoom-parallax image).** Short pitch plus a four-step strip: Share your plot, Feasibility, Agreement, Build and handover.
5. **Green-first build (sticky card stack, GSAP).** Three or four commitments as stacking cards, implemented per the canonical sticky-stack pattern (`start: "top top"`, `pin: true`).
6. **Testimonials (carousel).** Quotes of at most three lines, with name and role.
7. **Enquiry (form + office image).** Name, phone, interest (Buy, Landowner, Commercial), message.
8. **Footer.** Logo, links, address, phone, social, photo credits line.

There is at most one marquee on the page (none planned). Eyebrow labels are used at most three times across the page. No section-number labels, scroll cues, decorative dots or em-dashes anywhere.

## Projects Page

- Filter tabs for status (All, Ongoing, Upcoming, Completed) and type (Residential, Commercial, Duplex / Villa), as in the Trikon reference.
- Cards show image, project name and address, with a 3D tilt on hover (Motion motion values, never `useState`).
- "Load More" reveals further cards; with six demo projects, the first page shows all of them and the control is built and tested with a smaller page size in tests.
- Empty state when a filter combination has no results.

## Project Detail Page

Follows the Mirza Bari structure, adapted for buyers:

1. Go Back link
2. Title and address
3. Spec list: land area (katha), storeys, units, flat sizes (sft), facing, parking, status, handover date
4. Story, folded behind Show more / See less
5. Concept section
6. Gallery, opening a full-screen viewer with keyboard and swipe navigation
7. Floor plans
8. Location map
9. Enquiry form, pre-filled with the project name

All spec values are sample data and are marked as such in the data file.

## 3D Hero

- The tower is built in code from simple shapes (slab floors, columns, glass panels, planter boxes with stylised trees on each terrace): white concrete, green planting, soft shadow. No model file is downloaded.
- Cursor tilts the model; it floats gently. Scrolling past the hero orbits the camera by about 40 degrees, driven by `useScroll` and motion values.
- The 3D bundle loads after first paint. A pre-rendered still image shows until it is ready.
- Rendering pauses when the hero is off screen. A static still replaces the scene under `prefers-reduced-motion` and when WebGL is unavailable.
- Touch devices get a lower pixel ratio and no cursor tilt.

## Content Model

All projects live in `src/data/projects.ts`, typed:

- `slug`, `name`, `address`, `status` (ongoing | upcoming | completed), `type` (residential | commercial | duplex-villa)
- `specs` (land area, storeys, units, flat sizes, facing, parking, handover)
- `story`, `concept`
- `gallery` (image paths with alt text), `floorPlans`, `map` (coordinates)

Adding a project means adding one entry; no component changes. Six demo projects: two ongoing, two upcoming, two completed, mixed across types, located in Dhaka areas such as Bashundhara, Uttara, Dhanmondi and Purbachal.

## Images

Krea is not available and the free Pollinations test gave low-resolution, watermarked output, so images come from three sources:

1. **Hero and project exteriors:** renders of our own Three.js tower, captured at different angles, building heights and lighting (daylight and dusk), one set per project. Captured with a headless browser script and exported to WebP.
2. **Interiors, landowner and about images:** photos found through the Openverse API (no key). CC0 / public domain first, then CC-BY. Each used photo is recorded in `CREDITS.md` with source URL, author and licence; CC-BY photos also get a credit line in the footer.
3. **Fallback:** any slot with no suitable photo is a labelled placeholder, and the final report lists those slots.

Files are stored in `public/images/` as WebP, sized per slot, with explicit width and height to avoid layout shift.

## Enquiry Form

- Fields: name, phone, interest, message (plus project name where relevant). Labels above inputs, helper text in markup, errors below inputs.
- `enquiry.php` validates input, uses a hidden honeypot field and a per-IP time limit, sends mail, and returns JSON.
- States: idle, submitting, success, and error (inline). Form text, placeholders and focus rings meet WCAG AA contrast in both themes.
- Local development uses a mock endpoint. The PHP script can only be fully tested on the real server.

## Performance, Accessibility, Responsiveness

- Targets: LCP under 2.5 s, INP under 200 ms, CLS under 0.1.
- Everything above `MOTION_INTENSITY` 3 honours `prefers-reduced-motion`. Animate only `transform` and `opacity`. No `window` scroll listeners.
- Hero uses `min-h-[100dvh]`. Every multi-column layout declares its under-768px fallback (single column, `px-4`).
- GSAP and Three.js effects clean up in `useEffect` returns.

## Testing and Verification

- `next build` passes with no type errors.
- Unit tests for the filter logic and the project data shape.
- Manual checks in light and dark mode and at phone width.
- Lighthouse run before completion.
- Re-read all visible copy for broken or odd phrasing, and check there are no em-dashes on the page.

## Risks

- **Image coverage:** Openverse CC0 results were thin for apartments and rooftop gardens, so some slots may stay placeholders.
- **3D on low-end phones:** mitigated by lazy loading, lower pixel ratio, pause off-screen and a still fallback.
- **cPanel mail:** `mail()` may land in spam on some hosts; an SMTP option can follow later if needed.
- **Reference site access:** trikonarchitects.com blocks bots, so the reference structure came from Internet Archive copies of its projects page and Mirza Bari page. Its home page could not be retrieved, so the home layout is original.
