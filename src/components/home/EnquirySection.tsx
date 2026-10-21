import Image from "next/image";
import { EnquiryForm } from "../forms/EnquiryForm";
import { imageRef } from "@/data/image-plan";
import { site } from "@/data/site";

export function EnquirySection() {
  const office = imageRef("/images/site/office.webp");
  return (
    <section className="mx-auto grid max-w-[1400px] gap-10 px-4 py-24 md:grid-cols-2 md:gap-16 md:px-8 md:py-32" aria-labelledby="visit-title">
      <div className="md:sticky md:top-24 md:self-start">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image src={office.src} alt={office.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <p className="mt-4 text-sm text-muted">{site.address}</p>
        <p className="text-sm text-muted">{site.hours}</p>
      </div>
      <div>
        <h2 id="visit-title" className="text-4xl md:text-6xl">Book a visit</h2>
        <p className="mb-8 mt-4 max-w-[50ch] text-lg text-muted">
          Tell us what you are looking for and we will call you to fix a time.
        </p>
        <EnquiryForm />
      </div>
    </section>
  );
}
