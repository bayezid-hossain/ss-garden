import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { imageRef } from "@/data/image-plan";

export const metadata: Metadata = {
  title: "About",
  description: "SS Garden is a building developer in Dhaka that designs, builds and hands over apartments, offices and homes.",
};

const approach = [
  { title: "Plan carefully", text: "Soil tests, structural design and approvals come before sales." },
  { title: "Build in the open", text: "Buyers and landowners see monthly progress, not just a handover." },
  { title: "Plant everywhere possible", text: "Terraces, planters and roof gardens are part of every design." },
  { title: "Stay after handover", text: "We keep the documents and answer questions long after the keys are given." },
];

// Sample team. Replace with the real people before launch.
const team = [
  { name: "Engr. Rafiqul Islam", role: "Managing Director" },
  { name: "Nusrat Jahan", role: "Head of Design" },
  { name: "Arif Hossain", role: "Construction Manager" },
  { name: "Maliha Karim", role: "Sales and Customer Care" },
];

export default function AboutPage() {
  const img = imageRef("/images/site/about.webp");
  return (
    <>
      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-16 pt-28 md:grid-cols-[1.1fr_1fr] md:px-8">
        <div>
          <Reveal inView={false}>
            <h1 className="text-5xl leading-[1.02] md:text-7xl">Built to last, planted to stay.</h1>
          </Reveal>
          <Reveal inView={false} delay={0.08}>
            <p className="mt-6 max-w-[52ch] text-lg text-muted">
              SS Garden is a building developer in Dhaka. We design, build and sell apartments, commercial floors and private homes, and we develop landowners&apos; plots under joint-venture agreements.
            </p>
          </Reveal>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image src={img.src} alt={img.alt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-surface" aria-labelledby="approach-title">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
          <h2 id="approach-title" className="text-4xl md:text-6xl">How we work</h2>
          <ul className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {approach.map((a) => (
              <li key={a.title}>
                <h3 className="text-2xl">{a.title}</h3>
                <p className="mt-2 max-w-[44ch] text-muted">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="team" className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28" aria-labelledby="team-title">
        <h2 id="team-title" className="text-4xl md:text-6xl">The team</h2>
        <ul className="mt-12 grid gap-x-16 gap-y-8 md:grid-cols-2">
          {team.map((t) => (
            <li key={t.name} className="border-t border-text pt-4">
              <p className="font-display text-2xl">{t.name}</p>
              <p className="text-muted">{t.role}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
