"use client";

import { useRef } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Testimonial } from "@/data/testimonials";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const list = useRef<HTMLUListElement>(null);

  function go(dir: 1 | -1) {
    const el = list.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  }

  const arrow =
    "flex h-11 w-11 items-center justify-center border border-text transition active:scale-[0.96] hover:bg-text hover:text-bg focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32" aria-labelledby="quotes-title">
      <div className="flex items-end justify-between gap-6">
        <h2 id="quotes-title" className="text-4xl md:text-6xl">What owners say</h2>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous quote" onClick={() => go(-1)} className={arrow}><CaretLeft size={20} /></button>
          <button type="button" aria-label="Next quote" onClick={() => go(1)} className={arrow}><CaretRight size={20} /></button>
        </div>
      </div>
      <ul ref={list} className="mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4">
        {items.map((t) => (
          <li key={t.name} className="w-[88%] shrink-0 snap-start border-t border-text pt-6 md:w-[52%]">
            <blockquote className="font-display text-xl leading-snug md:text-2xl">&ldquo;{t.quote}&rdquo;</blockquote>
            <p className="mt-5 font-medium">{t.name}</p>
            <p className="text-sm text-muted">{t.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
