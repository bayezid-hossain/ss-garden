"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Project } from "@/data/types";
import {
  filterProjects, paginate, parseStatus, parseType, PAGE_SIZE,
  type StatusFilter, type TypeFilter,
} from "@/lib/projects-filter";
import { ProjectCard } from "./ProjectCard";
import { buttonClass } from "../ui/Button";

const statusTabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

const typeTabs: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "duplex-villa", label: "Duplex / Villa" },
];

function Tabs<T extends string>({
  label, value, options, onChange,
}: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`h-10 border px-4 text-sm transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              on ? "border-text bg-text text-bg" : "border-field hover:border-text"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const [status, setStatus] = useState<StatusFilter>(() => parseStatus(params.get("status")));
  const [type, setType] = useState<TypeFilter>(() => parseType(params.get("type")));
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterProjects(projects, { status, type }), [projects, status, type]);
  const { items, hasMore } = paginate(filtered, page, PAGE_SIZE);

  return (
    <div>
      <div className="mt-10 grid gap-4">
        <Tabs label="Filter by status" value={status} options={statusTabs} onChange={(v) => { setStatus(v); setPage(1); }} />
        <Tabs label="Filter by type" value={type} options={typeTabs} onChange={(v) => { setType(v); setPage(1); }} />
      </div>

      {items.length === 0 ? (
        <div className="mt-16 border border-line p-10">
          <p className="font-display text-2xl">No projects match these filters.</p>
          <p className="mt-2 text-muted">Try a different status or type.</p>
          <button
            type="button"
            onClick={() => { setStatus("all"); setType("all"); setPage(1); }}
            className={buttonClass("secondary", "mt-6")}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {items.map((p) => (
            <li key={p.slug}><ProjectCard project={p} /></li>
          ))}
        </ul>
      )}

      {hasMore && (
        <div className="mt-14">
          <button type="button" onClick={() => setPage(page + 1)} className={buttonClass("secondary")}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
