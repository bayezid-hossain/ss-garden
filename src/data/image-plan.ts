export type SlotSource = "render" | "horde" | "openverse" | "plan";

export interface RenderParams {
  floors: number;
  seed: number;
  sky: "day" | "dusk";
  az: number;
  el: number;
  dist: number;
}

export interface ImageSlot {
  src: string;
  w: number;
  h: number;
  source: SlotSource;
  alt: string;
  /** Stable Horde prompt (source "horde") */
  prompt?: string;
  /** Openverse search text (source "openverse") */
  query?: string;
  /** Tower parameters (source "render") */
  render?: RenderParams;
}

const TIME = "soft daylight, architectural photography, wide shot, highly detailed";
const hordePrompt = {
  residential: `modern residential apartment building in Dhaka Bangladesh, white concrete facade, lush green planted balconies and terraces, ${TIME}`,
  commercial: `modern commercial office building in Dhaka Bangladesh, glass and concrete facade with vertical green planters, ${TIME}`,
  "duplex-villa": `modern two-storey duplex house in Dhaka Bangladesh, white walls, timber screens, garden with palm trees and lawn, ${TIME}`,
} as const;

const interiorQuery = {
  residential: "modern apartment living room",
  commercial: "modern office lobby interior",
  "duplex-villa": "modern house interior staircase",
} as const;

interface ProjectPlan {
  slug: string;
  name: string;
  type: keyof typeof hordePrompt;
  render: RenderParams;
  renderAlt: RenderParams;
}

const projectPlans: ProjectPlan[] = [
  { slug: "arboretum-residences", name: "Arboretum Residences", type: "residential",
    render: { floors: 13, seed: 11, sky: "day", az: 28, el: 12, dist: 14 },
    renderAlt: { floors: 13, seed: 11, sky: "dusk", az: -35, el: 9, dist: 13 } },
  { slug: "kalpa-business-centre", name: "Kalpa Business Centre", type: "commercial",
    render: { floors: 18, seed: 23, sky: "day", az: -24, el: 10, dist: 17 },
    renderAlt: { floors: 18, seed: 23, sky: "dusk", az: 32, el: 8, dist: 16 } },
  { slug: "purbachal-green-court", name: "Purbachal Green Court", type: "residential",
    render: { floors: 10, seed: 37, sky: "day", az: 40, el: 14, dist: 12 },
    renderAlt: { floors: 10, seed: 37, sky: "day", az: -20, el: 22, dist: 12 } },
  { slug: "nirjhor-duplexes", name: "Nirjhor Duplexes", type: "duplex-villa",
    render: { floors: 3, seed: 41, sky: "day", az: 30, el: 11, dist: 8 },
    renderAlt: { floors: 3, seed: 41, sky: "dusk", az: -28, el: 8, dist: 8 } },
  { slug: "dhanmondi-terraces", name: "Dhanmondi Terraces", type: "residential",
    render: { floors: 9, seed: 53, sky: "day", az: -30, el: 13, dist: 11 },
    renderAlt: { floors: 9, seed: 53, sky: "dusk", az: 24, el: 10, dist: 11 } },
  { slug: "lakeview-villa-row", name: "Lakeview Villa Row", type: "duplex-villa",
    render: { floors: 4, seed: 67, sky: "day", az: 22, el: 12, dist: 9 },
    renderAlt: { floors: 4, seed: 67, sky: "dusk", az: -34, el: 9, dist: 9 } },
];

const slots: ImageSlot[] = [];

for (const p of projectPlans) {
  const base = `/images/projects/${p.slug}`;
  slots.push(
    { src: `${base}/hero.webp`, w: 1600, h: 1000, source: "render", render: p.render,
      alt: `${p.name}, exterior view in daylight` },
    { src: `${base}/gallery-1.webp`, w: 1600, h: 1000, source: "render", render: p.renderAlt,
      alt: `${p.name}, exterior view at dusk` },
    { src: `${base}/gallery-2.webp`, w: 576, h: 384, source: "horde", prompt: hordePrompt[p.type],
      alt: `${p.name}, street-side impression of the facade and planting` },
    { src: `${base}/gallery-3.webp`, w: 1200, h: 800, source: "openverse", query: interiorQuery[p.type],
      alt: `${p.name}, sample interior` },
    { src: `${base}/plan.webp`, w: 1200, h: 900, source: "plan",
      alt: `${p.name}, sample typical floor plan` },
  );
}

slots.push(
  { src: "/images/site/hero-still.webp", w: 1600, h: 1400, source: "render",
    render: { floors: 14, seed: 11, sky: "day", az: 28, el: 14, dist: 13 },
    alt: "Render of a white concrete tower with planted terraces on every few floors" },
  { src: "/images/site/landowner.webp", w: 2000, h: 1200, source: "render",
    render: { floors: 12, seed: 71, sky: "dusk", az: 18, el: 7, dist: 15 },
    alt: "Residential tower at dusk with lit windows and planted terraces" },
  { src: "/images/site/about.webp", w: 1600, h: 1000, source: "openverse",
    query: "architects reviewing building plans", alt: "Team reviewing building plans on a table" },
  { src: "/images/site/office.webp", w: 1200, h: 900, source: "openverse",
    query: "modern office reception", alt: "Reception area of a modern office" },
);

export const imageSlots: ImageSlot[] = slots;

export const projectNames: Record<string, string> = Object.fromEntries(
  projectPlans.map((p) => [p.slug, p.name]),
);

const bySrc = new Map(slots.map((s) => [s.src, s]));

export function imageRef(src: string) {
  const s = bySrc.get(src);
  if (!s) throw new Error(`Image not in plan: ${src}`);
  return { src: s.src, alt: s.alt, width: s.w, height: s.h };
}
