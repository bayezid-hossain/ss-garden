import type { Metadata } from "next";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { MapEmbed } from "@/components/projects/MapEmbed";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a visit",
  description: "Visit SS Garden's office in Dhaka or send an enquiry about a project or your plot.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-24 pt-28 md:grid-cols-2 md:gap-16 md:px-8">
      <div>
        <h1 className="text-5xl md:text-7xl">Book a visit</h1>
        <p className="mb-8 mt-4 max-w-[46ch] text-lg text-muted">
          Tell us what you are looking for and we will call you to fix a time.
        </p>
        <EnquiryForm />
      </div>
      <div className="md:pt-4">
        <ul className="space-y-4">
          <li className="flex items-start gap-3"><MapPin size={22} className="mt-0.5 shrink-0" />{site.address}</li>
          <li className="flex items-center gap-3"><Phone size={22} className="shrink-0" />{site.phone}</li>
          <li className="flex items-center gap-3"><EnvelopeSimple size={22} className="shrink-0" />{site.email}</li>
        </ul>
        <p className="mb-8 mt-4 text-sm text-muted">{site.hours}</p>
        <MapEmbed lat={site.lat} lng={site.lng} name={`${site.name} office`} />
      </div>
    </section>
  );
}
