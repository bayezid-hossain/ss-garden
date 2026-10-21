import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { HeroTower } from "./HeroTower";
import { imageRef } from "@/data/image-plan";

export function Hero() {
  return (
    <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] items-center gap-8 px-4 pb-12 pt-24 md:px-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <Reveal inView={false}>
          <h1 className="text-5xl leading-[1.02] md:text-7xl">Buildings that breathe.</h1>
        </Reveal>
        <Reveal inView={false} delay={0.08}>
          <p className="mt-6 max-w-[46ch] text-lg text-muted">
            SS Garden designs and builds apartments, offices and homes across Dhaka, with green terraces in every plan.
          </p>
        </Reveal>
        <Reveal inView={false} delay={0.16}>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects/">Find a home</ButtonLink>
            <ButtonLink href="/landowners/" variant="secondary">For landowners</ButtonLink>
          </div>
        </Reveal>
      </div>
      <div className="relative h-[52dvh] min-h-[360px] lg:h-[78dvh]">
        <HeroTower still={imageRef("/images/site/hero-still.webp")} />
      </div>
    </section>
  );
}
