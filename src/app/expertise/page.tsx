import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { imageRef } from "@/data/image-plan";

export const metadata: Metadata = {
  title: "Expertise",
  description: "Apartments, offices, duplex homes and joint ventures: the work SS Garden does in Dhaka, from design to handover.",
};

const groups = [
  {
    title: "What we build",
    items: [
      { name: "Apartment development", text: "Residential buildings with shared terraces, planned parking and naturally lit stair cores." },
      { name: "Commercial buildings", text: "Office floors with flexible layouts, good daylight and planting built into the facade." },
      { name: "Duplex and villas", text: "Low-rise homes with private gardens, double-height rooms and timber screening." },
    ],
  },
  {
    title: "How we work",
    items: [
      { name: "Joint-venture development", text: "We build on your land under a written agreement and you receive an agreed share of the flats." },
      { name: "Design and approvals", text: "Our team prepares drawings and handles submissions to the relevant authorities." },
      { name: "Construction management", text: "Our site engineers oversee materials, safety and schedule until the day of handover." },
    ],
  },
];

export default function ExpertisePage() {
  const img = imageRef("/images/site/about.webp");
  return (
    <>
      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-16 pt-28 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div>
          <Reveal inView={false}>
            <h1 className="text-5xl leading-[1.02] md:text-7xl">What we do</h1>
          </Reveal>
          <Reveal inView={false} delay={0.08}>
            <p className="mt-6 max-w-[46ch] text-lg text-muted">
              We design, approve and build homes and offices in Dhaka, and we look after each project until handover.
            </p>
          </Reveal>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image src={img.src} alt={img.alt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28" aria-label="Services">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {groups.map((g) => (
            <Reveal key={g.title}>
              <div className="border-t border-text pt-5">
                <h2 className="text-3xl md:text-4xl">{g.title}</h2>
                <ul className="mt-8 grid gap-8">
                  {g.items.map((i) => (
                    <li key={i.name}>
                      <h3 className="text-xl">{i.name}</h3>
                      <p className="mt-1 max-w-[48ch] text-muted">{i.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface" aria-labelledby="next-title">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
          <h2 id="next-title" className="text-4xl md:text-6xl">Where to next</h2>
          <p className="mt-4 max-w-[46ch] text-lg text-muted">
            See what is available now, or talk to us about developing your plot.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects/">Find a home</ButtonLink>
            <ButtonLink href="/landowners/" variant="secondary">For landowners</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
