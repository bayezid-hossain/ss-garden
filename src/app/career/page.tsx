import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Career",
  description: "Open roles at SS Garden in Dhaka for engineers, sales staff and draftspeople.",
};

// SAMPLE roles until real vacancies are supplied.
const roles = [
  {
    title: "Site Engineer",
    description: "Supervise structural and finishing work on an active building site in Dhaka. You will check quality, record progress and report to the project manager.",
    requirements: ["Degree in civil engineering", "Experience on residential sites", "Comfortable working on site daily"],
  },
  {
    title: "Sales Executive",
    description: "Meet buyers, show flats and explain plans, pricing and payment schedules. You will follow each enquiry through to booking.",
    requirements: ["Clear spoken Bangla and English", "Experience in property or retail sales", "Patient, honest and well organised"],
  },
  {
    title: "Architectural Draftsperson",
    description: "Prepare and revise drawings for approval and construction. You will work closely with our architects and site engineers.",
    requirements: ["Skilled in AutoCAD or similar", "Accurate and careful with detail", "Diploma or degree in architecture"],
  },
];

// Sample address, replace with the real careers mailbox.
const CAREERS_EMAIL = "careers@ssgarden.example";

export default function CareerPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 pb-16 pt-28 md:px-8">
        <Reveal inView={false}>
          <h1 className="text-5xl leading-[1.02] md:text-7xl">Build with us</h1>
        </Reveal>
        <Reveal inView={false} delay={0.08}>
          <p className="mt-6 max-w-[50ch] text-lg text-muted">
            We are a small team that builds in Dhaka. People here own their work, learn on real sites and see projects through to handover.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8 md:pb-28" aria-labelledby="roles-title">
        <h2 id="roles-title" className="text-4xl md:text-6xl">Open roles</h2>
        <div className="mt-10 border-b border-line">
          {roles.map((r) => (
            <details key={r.title} className="group border-t border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block text-2xl md:text-3xl">{r.title}</span>
                  <span className="mt-1 block text-sm text-muted">Dhaka</span>
                </span>
                <span aria-hidden="true" className="text-2xl transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <div className="pb-8">
                <p className="max-w-[60ch] text-muted">{r.description}</p>
                <ul className="mt-4 grid gap-1">
                  {r.requirements.map((q) => (
                    <li key={q} className="border-l border-text pl-3">{q}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-surface" aria-labelledby="cv-title">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
          <h2 id="cv-title" className="text-4xl md:text-6xl">Send your CV</h2>
          <p className="mt-4 max-w-[46ch] text-lg text-muted">
            Tell us which role you are applying for and a little about your experience.
          </p>
          <a href={`mailto:${CAREERS_EMAIL}`} className={buttonClass("primary", "mt-8")}>
            Send your CV to {CAREERS_EMAIL}
          </a>
        </div>
      </section>
    </>
  );
}
