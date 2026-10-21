import { imageRef } from "./image-plan";
import type { Project, ProjectSpec } from "./types";

const specs = (
  land: string, storeys: string, units: string, sizes: string,
  facing: string, parking: string, handover: string,
): ProjectSpec[] => [
  { label: "Land area", value: land },
  { label: "Storeys", value: storeys },
  { label: "Units", value: units },
  { label: "Flat sizes", value: sizes },
  { label: "Facing", value: facing },
  { label: "Parking", value: parking },
  { label: "Handover", value: handover },
];

const media = (slug: string) => ({
  hero: imageRef(`/images/projects/${slug}/hero.webp`),
  gallery: [
    imageRef(`/images/projects/${slug}/gallery-1.webp`),
    imageRef(`/images/projects/${slug}/gallery-2.webp`),
    imageRef(`/images/projects/${slug}/gallery-3.webp`),
  ],
  floorPlans: [imageRef(`/images/projects/${slug}/plan.webp`)],
});

// All specs, addresses and descriptions are sample data until the real project list is supplied.
export const projects: Project[] = [
  {
    slug: "arboretum-residences",
    name: "Arboretum Residences",
    address: "Block D, Bashundhara R/A, Dhaka",
    status: "ongoing",
    type: "residential",
    tagline: "Thirteen floors of apartments with a planted terrace every third level.",
    specs: specs("10 katha", "G + 12", "48", "1,450 to 1,850 sft", "South", "Ground and basement", "December 2027"),
    story: [
      "Arboretum Residences sits on a corner plot in Block D, a few minutes from the main avenue. Each floor holds four apartments arranged around a naturally lit stair core.",
      "Every third floor extends forward into a shared terrace with planters and shade trees, so residents have outdoor space that is not a private balcony.",
    ],
    concept: [
      "The tower is stepped so that terraces catch afternoon light and break the facade into readable layers. Planting is part of the structure, with drainage and irrigation built into each planter edge.",
    ],
    ...media("arboretum-residences"),
    map: { lat: 23.819, lng: 90.429 },
  },
  {
    slug: "kalpa-business-centre",
    name: "Kalpa Business Centre",
    address: "Kemal Ataturk Avenue, Banani, Dhaka",
    status: "ongoing",
    type: "commercial",
    tagline: "Eighteen floors of office space with planted sky terraces.",
    specs: specs("14 katha", "B2 + G + 17", "36 office floors and 4 shops", "1,200 to 4,800 sft", "East", "Two basements", "June 2028"),
    story: [
      "Kalpa Business Centre is planned for companies that want large, flexible floor plates close to Banani's restaurants and transport.",
      "Floor plates are column-light, with services concentrated in one core so tenants can divide space freely.",
    ],
    concept: [
      "Vertical planters run along the south face to cut heat gain, and a sky terrace every few floors gives staff somewhere to step outside during the day.",
    ],
    ...media("kalpa-business-centre"),
    map: { lat: 23.7937, lng: 90.4066 },
  },
  {
    slug: "purbachal-green-court",
    name: "Purbachal Green Court",
    address: "Sector 6, Purbachal New Town, Dhaka",
    status: "upcoming",
    type: "residential",
    tagline: "Ten floors around a landscaped central court.",
    specs: specs("12 katha", "G + 9", "36", "1,300 to 1,700 sft", "North and south", "Ground and basement", "March 2029"),
    story: [
      "Purbachal Green Court is the company's first project in the new town. The plot is wide, so the building wraps a shared garden court instead of rising as a single slab.",
      "Bookings open once approvals are complete. Registered interest is contacted first.",
    ],
    concept: [
      "Apartments look onto the court on one side and the street on the other, giving cross-ventilation in every unit.",
    ],
    ...media("purbachal-green-court"),
    map: { lat: 23.835, lng: 90.51 },
  },
  {
    slug: "nirjhor-duplexes",
    name: "Nirjhor Duplexes",
    address: "Sector 11, Uttara, Dhaka",
    status: "upcoming",
    type: "duplex-villa",
    tagline: "Six detached duplex homes, each with its own garden.",
    specs: specs("8 katha", "G + 2", "6", "2,600 to 3,100 sft", "East", "Two cars per home", "September 2028"),
    story: [
      "Nirjhor Duplexes is a small gated row of six homes for families who want a house, not a flat. Each home has a private entrance and a rear garden.",
      "Layouts are shared across the row, and buyers choose finishes before construction reaches each floor.",
    ],
    concept: [
      "Timber screens and deep eaves shade the south-facing rooms. The garden wall steps down toward the street to keep the row open to passers-by.",
    ],
    ...media("nirjhor-duplexes"),
    map: { lat: 23.87, lng: 90.387 },
  },
  {
    slug: "dhanmondi-terraces",
    name: "Dhanmondi Terraces",
    address: "Road 27, Dhanmondi, Dhaka",
    status: "completed",
    type: "residential",
    tagline: "Nine floors of apartments, handed over and fully occupied.",
    specs: specs("7 katha", "G + 8", "32", "1,150 to 1,500 sft", "West", "Ground floor", "Handed over 2024"),
    story: [
      "Dhanmondi Terraces replaced two older houses on a quiet stretch of Road 27. Every apartment has a balcony large enough for a table and plants.",
      "The building was handed over to its owners' association with full as-built drawings.",
    ],
    concept: [
      "A rooftop garden with raised beds and a covered seating area is shared by all residents.",
    ],
    ...media("dhanmondi-terraces"),
    map: { lat: 23.751, lng: 90.375 },
  },
  {
    slug: "lakeview-villa-row",
    name: "Lakeview Villa Row",
    address: "Baridhara DOHS, Dhaka",
    status: "completed",
    type: "duplex-villa",
    tagline: "Four lakeside villas, finished and occupied.",
    specs: specs("9 katha", "G + 3", "4", "3,400 to 3,900 sft", "North", "Three cars per villa", "Handed over 2023"),
    story: [
      "Lakeview Villa Row is a row of four villas facing the lake path. Each has a double-height living room and a rooftop terrace.",
      "All four were sold before completion and handed over together.",
    ],
    concept: [
      "Living rooms face the water, and service rooms sit on the street side to keep the lake frontage quiet.",
    ],
    ...media("lakeview-villa-row"),
    map: { lat: 23.816, lng: 90.423 },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
