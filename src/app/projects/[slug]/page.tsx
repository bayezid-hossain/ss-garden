import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { projects, getProject } from "@/data/projects";
import { statusLabel, typeLabel } from "@/data/types";
import { StoryFold } from "@/components/projects/StoryFold";
import { GalleryLightbox } from "@/components/projects/GalleryLightbox";
import { MapEmbed } from "@/components/projects/MapEmbed";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.name, description: `${p.name}, ${p.address}. ${p.tagline}` };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 md:px-8">
      <Link href="/projects/" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-text">
        <ArrowLeft size={18} /> All projects
      </Link>

      <header className="mt-8">
        <p className="text-sm font-medium text-accent">{statusLabel[p.status]}, {typeLabel[p.type]}</p>
        <h1 className="mt-2 text-5xl md:text-7xl">{p.name}</h1>
        <p className="mt-3 text-lg text-muted">{p.address}</p>
      </header>

      <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-surface">
        <Image src={p.hero.src} alt={p.hero.alt} fill priority sizes="(min-width: 1400px) 1336px, 100vw" className="object-cover" />
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-text pt-6 md:grid-cols-4">
        {p.specs.map((s) => (
          <div key={s.label}>
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="mt-1 font-display text-xl">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-muted">Specifications are indicative and subject to final approved plans.</p>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        <section aria-labelledby="story-title">
          <h2 id="story-title" className="mb-6 text-3xl md:text-4xl">The project</h2>
          <StoryFold paragraphs={p.story} />
        </section>
        <section aria-labelledby="concept-title">
          <h2 id="concept-title" className="mb-6 text-3xl md:text-4xl">Concept</h2>
          <div className="space-y-4 text-lg">{p.concept.map((t) => <p key={t}>{t}</p>)}</div>
        </section>
      </div>

      <section className="mt-20" aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="mb-6 text-3xl md:text-5xl">Gallery</h2>
        <GalleryLightbox images={p.gallery} />
      </section>

      <section className="mt-20" aria-labelledby="plan-title">
        <h2 id="plan-title" className="mb-6 text-3xl md:text-5xl">Floor plans</h2>
        {p.floorPlans.map((f) => (
          <figure key={f.src} className="max-w-[900px]">
            <Image src={f.src} alt={f.alt} width={f.width} height={f.height} className="h-auto w-full border border-line" />
            <figcaption className="mt-2 text-sm text-muted">{f.alt}</figcaption>
          </figure>
        ))}
      </section>

      <section className="mt-20" aria-labelledby="map-title">
        <h2 id="map-title" className="mb-6 text-3xl md:text-5xl">Location</h2>
        <MapEmbed lat={p.map.lat} lng={p.map.lng} name={p.name} />
      </section>

      <section className="mt-20 grid gap-10 md:grid-cols-2 md:gap-16" aria-labelledby="enquire-title">
        <div>
          <h2 id="enquire-title" className="text-3xl md:text-5xl">Book a visit to {p.name}</h2>
          <p className="mt-4 max-w-[46ch] text-lg text-muted">Leave your number and we will call you to fix a time.</p>
        </div>
        <EnquiryForm project={p.name} />
      </section>
    </article>
  );
}
