import Image from "next/image";
import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { imageRef } from "@/data/image-plan";
import { jvSteps } from "@/data/joint-venture";

export const metadata: Metadata = {
  title: "For landowners",
  description: "Develop your plot in Dhaka with SS Garden under a joint-venture agreement and receive an agreed share of the finished flats.",
};

const expectations = [
  { title: "A written agreement first", text: "Nothing starts until the terms are signed." },
  { title: "Your share, by floor and unit", text: "The agreement names exactly which flats are yours." },
  { title: "Monthly progress updates", text: "Site visits and photographs until handover." },
  { title: "Documents with your handover", text: "Approved plans and as-built drawings for your share." },
];

export default function LandownersPage() {
  const img = imageRef("/images/site/landowner.webp");
  return (
    <>
      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-16 pt-28 md:grid-cols-2 md:px-8">
        <div>
          <Reveal inView={false}>
            <h1 className="text-5xl leading-[1.02] md:text-7xl">Your plot, our building.</h1>
          </Reveal>
          <Reveal inView={false} delay={0.08}>
            <p className="mt-6 max-w-[46ch] text-lg text-muted">
              Bring the land. We handle design, approvals and construction, and you receive an agreed share of the finished flats.
            </p>
          </Reveal>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image src={img.src} alt={img.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28" aria-labelledby="how-title">
        <h2 id="how-title" className="text-4xl md:text-6xl">How it works</h2>
        <ol className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {jvSteps.map((s) => (
            <li key={s.title} className="border-t border-text pt-5">
              <h3 className="text-2xl md:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-[48ch] text-muted">{s.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-surface" aria-labelledby="expect-title">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
          <h2 id="expect-title" className="text-4xl md:text-6xl">What you can expect</h2>
          <ul className="mt-12 grid gap-x-16 gap-y-8 md:grid-cols-2">
            {expectations.map((e) => (
              <li key={e.title}>
                <h3 className="text-xl">{e.title}</h3>
                <p className="mt-1 text-muted">{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28" aria-labelledby="plot-title">
        <div>
          <h2 id="plot-title" className="text-4xl md:text-6xl">Tell us about your plot</h2>
          <p className="mt-4 max-w-[46ch] text-lg text-muted">
            Share the location and size. We will call you to discuss the next step.
          </p>
        </div>
        <EnquiryForm variant="landowner" />
      </section>
    </>
  );
}
