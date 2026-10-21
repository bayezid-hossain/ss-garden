"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ImageRef } from "@/data/types";

export interface HeroSlide {
  image: ImageRef;
  name: string;
  href: string;
}

const INTERVAL_MS = 6500;

/** Full-bleed crossfading photo banner with a slow push-in, used behind the hero text. */
export function HeroBanner({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused || slides.length < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-scrim">
      {slides.map((s, i) => (
        <div
          key={s.image.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.image.src}
            alt={i === active ? s.image.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover will-change-transform"
            style={i === active ? { animation: `hero-drift ${INTERVAL_MS + 2000}ms ease-out forwards` } : undefined}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-scrim/85 via-scrim/55 to-scrim/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-scrim/70 to-transparent" />

      {slides.length > 1 && (
        <div
          className="absolute bottom-6 left-4 z-10 flex items-end gap-3 md:bottom-8 md:left-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Link
            href={slides[active].href}
            className="hidden max-w-[28ch] text-sm text-on-image underline-offset-4 hover:underline md:block"
          >
            {slides[active].name}
          </Link>
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.image.src}
                type="button"
                aria-label={`Show ${s.name}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className="flex h-8 w-10 items-end focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-image"
              >
                <span className={`block h-0.5 w-full ${i === active ? "bg-on-image" : "bg-on-image/40"}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
