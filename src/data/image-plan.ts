export type SlotSource = "horde" | "openverse" | "plan";

export interface ImageSlot {
  src: string;
  /** Final size of the file served on the site */
  w: number;
  h: number;
  source: SlotSource;
  alt: string;
  /** Stable Horde prompt (source "horde") */
  prompt?: string;
  /** Size requested from Stable Horde when it differs from w x h (anonymous cap is 637 px) */
  gen?: { w: number; h: number };
  /** Ask Horde to upscale the result 4x (free, used for large slots) */
  upscale?: boolean;
  /** Openverse search text (source "openverse") */
  query?: string;
}

const PHOTO = "wide angle, entire building visible in frame, professional architectural photograph, shot on a full-frame camera, ultra detailed, realistic";

const typeLook = {
  residential: "modern luxury residential apartment building in Dhaka Bangladesh, white concrete facade with deep green planted balconies and terraces",
  commercial: "modern commercial office tower in Dhaka Bangladesh, glass and concrete facade with vertical green planters",
  "duplex-villa": "modern two-storey duplex villa in Dhaka Bangladesh, white walls and timber screens, lush garden with palm trees and lawn",
} as const;

const DAY = "clear blue sky, soft daylight";
const DUSK = "at dusk, warm glowing windows, deep blue sky";

const hordeInterior = new Set([
  "arboretum-residences", "kalpa-business-centre", "purbachal-green-court",
  "nirjhor-duplexes", "dhanmondi-terraces", "lakeview-villa-row",
]);

const INTERIOR = "bright natural light, interior design photography, wide angle, highly detailed";
const hordeInteriorPrompt = {
  residential: `modern apartment living room in Dhaka Bangladesh, large window, indoor plants, light wooden floor, ${INTERIOR}`,
  commercial: `modern office reception and lobby, concrete and timber, indoor plants, ${INTERIOR}`,
  "duplex-villa": `modern duplex house double-height living room with timber staircase and garden view, ${INTERIOR}`,
} as const;

const interiorQuery = {
  residential: "apartment interior bedroom",
  commercial: "modern office lobby interior",
  "duplex-villa": "modern home interior",
} as const;

interface ProjectPlan {
  slug: string;
  name: string;
  type: keyof typeof typeLook;
  /** Extra description so each project looks different */
  look: string;
}

const projectPlans: ProjectPlan[] = [
  { slug: "arboretum-residences", name: "Arboretum Residences", type: "residential",
    look: "thirteen storeys, corner plot, tree-lined street" },
  { slug: "kalpa-business-centre", name: "Kalpa Business Centre", type: "commercial",
    look: "eighteen storeys, busy city avenue, sky terraces with trees" },
  { slug: "purbachal-green-court", name: "Purbachal Green Court", type: "residential",
    look: "ten storeys wrapped around a landscaped garden court, wide new-town road" },
  { slug: "nirjhor-duplexes", name: "Nirjhor Duplexes", type: "duplex-villa",
    look: "row of detached homes behind a low garden wall, quiet street" },
  { slug: "dhanmondi-terraces", name: "Dhanmondi Terraces", type: "residential",
    look: "nine storeys, balconies full of plants, leafy residential road" },
  { slug: "lakeview-villa-row", name: "Lakeview Villa Row", type: "duplex-villa",
    look: "four villas with rooftop terraces facing a lake" },
];

const slots: ImageSlot[] = [];

for (const p of projectPlans) {
  const base = `/images/projects/${p.slug}`;
  slots.push(
    { src: `${base}/hero.webp`, w: 1600, h: 1000, source: "horde", gen: { w: 576, h: 384 }, upscale: true,
      prompt: `photograph of a ${typeLook[p.type]}, ${p.look}, ${DAY}, ${PHOTO}`,
      alt: `${p.name}, exterior view in daylight` },
    { src: `${base}/gallery-1.webp`, w: 1600, h: 1000, source: "horde", gen: { w: 576, h: 384 }, upscale: true,
      prompt: `photograph of a ${typeLook[p.type]}, ${p.look}, ${DUSK}, ${PHOTO}`,
      alt: `${p.name}, exterior view at dusk` },
    { src: `${base}/gallery-2.webp`, w: 576, h: 384, source: "horde",
      prompt: `${typeLook[p.type]}, soft daylight, architectural photography, wide shot, highly detailed`,
      alt: `${p.name}, street-side impression of the facade and planting` },
    hordeInterior.has(p.slug)
      ? { src: `${base}/gallery-3.webp`, w: 576, h: 384, source: "horde", prompt: hordeInteriorPrompt[p.type],
          alt: `${p.name}, sample interior` }
      : { src: `${base}/gallery-3.webp`, w: 1200, h: 800, source: "openverse", query: interiorQuery[p.type],
          alt: `${p.name}, sample interior` },
    { src: `${base}/plan.webp`, w: 1200, h: 900, source: "plan",
      alt: `${p.name}, sample typical floor plan` },
  );
}

slots.push(
  { src: "/images/site/landowner.webp", w: 2000, h: 1200, source: "horde", gen: { w: 576, h: 384 }, upscale: true,
    prompt: `photograph of a newly built modern residential building with green terraces beside an open plot of land in Dhaka Bangladesh, ${DUSK}, ${PHOTO}`,
    alt: "Residential building at dusk with lit windows and planted terraces" },
  { src: "/images/site/about.webp", w: 576, h: 384, source: "horde",
    prompt: "architectural scale model of a residential tower and rolled blueprints on a wooden table, studio lighting, close-up, highly detailed",
    alt: "Architectural model and building plans on a table" },
  { src: "/images/site/office.webp", w: 576, h: 384, source: "horde",
    prompt: "modern real estate sales office reception, timber desk, indoor plants, large window, bright natural light, interior design photography, highly detailed",
    alt: "Reception area of a modern sales office" },
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
