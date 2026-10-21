"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Buildings, CalendarCheck, FileText, Plant } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

// Owner to confirm each commitment before launch (see README).
const items = [
  { icon: Buildings, title: "Structure comes first.", text: "Every building starts with a soil test and an engineer's sign-off before the first floor is poured.", tone: "bg-surface" },
  { icon: Plant, title: "Green terraces in the plan.", text: "Planters, shade trees and rooftop gardens are drawn into the design, not added at handover.", tone: "bg-surface-2" },
  { icon: FileText, title: "Plans that clear approval.", text: "Designs are prepared for authority approval before sales begin, and the documents are shared with every buyer.", tone: "bg-surface" },
  { icon: CalendarCheck, title: "A handover date in writing.", text: "Buyers receive a written schedule and monthly progress photos until the keys are handed over.", tone: "bg-surface-2" },
];

export function CommitmentStack() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: cards[cards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: true },
          });
        });
      },
      ref,
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} aria-labelledby="commit-title">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:pb-16 md:pt-32">
        <h2 id="commit-title" className="text-4xl md:text-6xl">How we build</h2>
      </div>
      {items.map((it, i) => (
        <div
          key={it.title}
          style={{ zIndex: i + 1 }}
          className={`stack-card relative flex min-h-[100dvh] items-center ${it.tone}`}
        >
          <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 md:grid-cols-[auto_1fr] md:items-center md:gap-14 md:px-8">
            <it.icon size={72} className="text-accent" />
            <div>
              <h3 className="text-4xl md:text-6xl">{it.title}</h3>
              <p className="mt-4 max-w-[52ch] text-lg text-muted">{it.text}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
