import { Suspense } from "react";
import type { Metadata } from "next";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ongoing, upcoming and completed apartments, offices and homes by SS Garden in Dhaka.",
};

function Skeleton() {
  return (
    <ul className="mt-24 grid gap-x-8 gap-y-14 md:grid-cols-2" aria-hidden="true">
      {[0, 1].map((i) => (
        <li key={i}>
          <div className="aspect-[4/3] animate-pulse bg-surface" />
          <div className="mt-4 h-7 w-2/3 animate-pulse bg-surface" />
        </li>
      ))}
    </ul>
  );
}

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 md:px-8">
      <h1 className="text-5xl md:text-7xl">Projects</h1>
      <p className="mt-4 max-w-[50ch] text-lg text-muted">
        Apartments, offices and homes across Dhaka, from the first foundation to the final handover.
      </p>
      <Suspense fallback={<Skeleton />}>
        <ProjectsBrowser projects={projects} />
      </Suspense>
    </section>
  );
}
