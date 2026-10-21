"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react";
import { statusLabel, type Project } from "@/data/types";
import { ProjectPeek } from "../projects/ProjectPeek";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedPan({ projects }: { projects: Project[] }) {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      },
      wrap,
    );
    return () => mm.revert();
  }, []);

  return (
    // The outer div is the node React removes on navigation. GSAP wraps the pinned section in a
    // pin-spacer, so the section itself must never be the root React tries to detach.
    <div>
    <section ref={wrap} aria-labelledby="featured-title" className="h-[100dvh] overflow-hidden motion-reduce:overflow-x-auto">
      <div
        ref={track}
        className="flex h-[100dvh] w-max items-center gap-4 px-4 md:gap-8 md:px-8"
      >
        <div className="w-[80vw] shrink-0 md:w-[30vw]">
          <h2 id="featured-title" className="text-4xl md:text-6xl">Now building and opening soon</h2>
          <p className="mt-4 max-w-[40ch] text-lg text-muted">
            Four projects across Dhaka, from the foundation to the final handover.
          </p>
        </div>
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}/`}
            className="group w-[80vw] shrink-0 md:w-[42vw]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={p.hero.src}
                alt={p.hero.alt}
                fill
                sizes="(min-width: 768px) 42vw, 80vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <ProjectPeek project={p} />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl">{p.name}</h3>
                <p className="mt-1 text-muted">{p.address}</p>
                <p className="mt-1 text-sm font-medium text-accent">{statusLabel[p.status]}</p>
              </div>
              <ArrowRight size={28} className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
    </div>
  );
}
