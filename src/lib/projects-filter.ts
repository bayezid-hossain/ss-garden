import type { Project, ProjectStatus, ProjectType } from "../data/types";

export type StatusFilter = ProjectStatus | "all";
export type TypeFilter = ProjectType | "all";

export const PAGE_SIZE = 6;

const STATUSES: ProjectStatus[] = ["ongoing", "upcoming", "completed"];
const TYPES: ProjectType[] = ["residential", "commercial", "duplex-villa"];

export function parseStatus(v: string | null): StatusFilter {
  return STATUSES.includes(v as ProjectStatus) ? (v as ProjectStatus) : "all";
}

export function parseType(v: string | null): TypeFilter {
  return TYPES.includes(v as ProjectType) ? (v as ProjectType) : "all";
}

export function filterProjects(
  list: Project[],
  f: { status: StatusFilter; type: TypeFilter },
): Project[] {
  return list.filter(
    (p) => (f.status === "all" || p.status === f.status) && (f.type === "all" || p.type === f.type),
  );
}

export function paginate<T>(list: T[], page: number, size: number): { items: T[]; hasMore: boolean } {
  const end = page * size;
  return { items: list.slice(0, end), hasMore: list.length > end };
}

export function countByStatus(list: Project[]): Record<ProjectStatus, number> {
  const out: Record<ProjectStatus, number> = { ongoing: 0, upcoming: 0, completed: 0 };
  for (const p of list) out[p.status] += 1;
  return out;
}
