import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { HeroBanner, type HeroSlide } from "./HeroBanner";
import { getProject } from "@/data/projects";

const slideSlugs = ["arboretum-residences", "kalpa-business-centre", "lakeview-villa-row", "dhanmondi-terraces"];

const slides: HeroSlide[] = slideSlugs.flatMap((slug) => {
  const p = getProject(slug);
  return p ? [{ image: p.hero, name: p.name, href: `/projects/${p.slug}/` }] : [];
});

export function Hero() {
  return (
    <section className="relative isolate min-h-[100dvh] text-hero-ink">
      <HeroBanner slides={slides} />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] items-center px-4 pb-24 pt-24 md:px-8">
        <div className="max-w-[760px]">
          <Reveal inView={false}>
            <h1 className="text-5xl leading-[1.02] md:text-7xl">Buildings that breathe.</h1>
          </Reveal>
          <Reveal inView={false} delay={0.08}>
            <p className="mt-6 max-w-[46ch] text-lg text-hero-ink/90">
              SS Garden designs and builds apartments, offices and homes across Dhaka, with green terraces in every plan.
            </p>
          </Reveal>
          <Reveal inView={false} delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects/">Find a home</ButtonLink>
              <ButtonLink href="/landowners/" variant="onImage">For landowners</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
