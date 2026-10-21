export type ProjectStatus = "ongoing" | "upcoming" | "completed";
export type ProjectType = "residential" | "commercial" | "duplex-villa";

export const statusLabel: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
};

export const typeLabel: Record<ProjectType, string> = {
  residential: "Residential",
  commercial: "Commercial",
  "duplex-villa": "Duplex / Villa",
};

export interface ImageRef {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  address: string;
  status: ProjectStatus;
  type: ProjectType;
  tagline: string;
  specs: ProjectSpec[];
  story: string[];
  concept: string[];
  hero: ImageRef;
  gallery: ImageRef[];
  floorPlans: ImageRef[];
  map: { lat: number; lng: number };
}
