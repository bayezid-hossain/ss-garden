import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/data/types";

export function StatusBento({ projects }: { projects: Project[] }) {
  const tiles = [
    { title: "Ongoing", href: "/projects/?status=ongoing", list: projects.filter((p) => p.status === "ongoing"), span: "md:col-span-2 md:row-span-2" },
    { title: "Upcoming", href: "/projects/?status=upcoming", list: projects.filter((p) => p.status === "upcoming"), span: "md:col-span-2" },
    { title: "Completed", href: "/projects/?status=completed", list: projects.filter((p) => p.status === "completed"), span: "" },
    { title: "Commercial", href: "/projects/?type=commercial", list: projects.filter((p) => p.type === "commercial"), span: "" },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32" aria-labelledby="browse-title">
      <h2 id="browse-title" className="text-4xl md:text-6xl">Browse the projects</h2>
      <div className="mt-10 grid grid-cols-1 gap-4 md:h-[min(80dvh,720px)] md:grid-cols-4 md:grid-rows-2">
        {tiles.map((t) => {
          const img = t.list[0]?.hero;
          return (
            <Link
              key={t.title}
              href={t.href}
              className={`group relative isolate flex min-h-[240px] items-end overflow-hidden bg-surface-2 p-6 ${t.span}`}
            >
              {img && (
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-scrim/80 via-scrim/20 to-transparent" />
              <div className="flex w-full items-end justify-between gap-4 text-on-image">
                <div>
                  <h3 className="text-3xl md:text-4xl">{t.title}</h3>
                  <p className="mt-1 text-sm">{t.list.length} {t.list.length === 1 ? "project" : "projects"}</p>
                </div>
                <ArrowRight size={28} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
