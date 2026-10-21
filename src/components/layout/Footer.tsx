import Link from "next/link";
import { ArrowUp, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { Brand } from "./Brand";
import { ButtonLink } from "../ui/Button";
import { site } from "@/data/site";
import credits from "@/data/credits.json";

interface Credit {
  src: string;
  title: string;
  creator: string;
  license: string;
  url: string;
}

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects/" },
      { label: "Expertise", href: "/expertise/" },
      { label: "Landowners", href: "/landowners/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about/" },
      { label: "Our team", href: "/about/#team" },
      { label: "News", href: "/news/" },
      { label: "Career", href: "/career/" },
    ],
  },
];

const linkClass = "text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Footer() {
  const list = credits as Credit[];
  return (
    <footer className="overflow-hidden border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1400px] items-end gap-8 px-4 py-16 md:grid-cols-[1.5fr_1fr] md:px-8 md:py-24">
        <h2 className="text-4xl leading-[1.05] md:text-6xl">Looking for a home, or have a plot to develop?</h2>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <ButtonLink href="/contact/">Book a visit</ButtonLink>
          <ButtonLink href="/landowners/" variant="secondary">For landowners</ButtonLink>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-14 md:grid-cols-[1.3fr_0.7fr_0.7fr_1.2fr] md:px-8">
          <div>
            <Brand />
            <p className="mt-5 max-w-[38ch] text-muted">{site.description}</p>
            {site.facebook && (
              <a href={site.facebook} rel="noopener noreferrer" className={`mt-5 inline-block text-sm underline underline-offset-4 ${linkClass}`}>
                Facebook
              </a>
            )}
          </div>

          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-medium">{c.title}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="font-medium">Visit us</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-3"><MapPin size={20} className="mt-0.5 shrink-0 text-accent" />{site.address}</li>
              <li className="flex items-center gap-3"><Phone size={20} className="shrink-0 text-accent" /><a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className={linkClass}>{site.phone}</a></li>
              <li className="flex items-center gap-3"><EnvelopeSimple size={20} className="shrink-0 text-accent" /><a href={`mailto:${site.email}`} className={linkClass}>{site.email}</a></li>
            </ul>
            <p className="mt-4 text-sm text-muted">{site.hours}</p>
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mx-auto max-w-[1400px] select-none whitespace-nowrap px-4 font-display text-[clamp(4.5rem,18.5vw,17rem)] font-extrabold leading-[0.8] tracking-tighter text-text/[0.06] md:px-8"
      >
        SS Garden
      </p>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 pb-24 pt-6 text-xs text-muted md:flex-row md:items-start md:justify-between md:px-8 md:pb-8 md:pr-28">
          <div className="space-y-2">
            <p>Images on this site are illustrative. Specifications are indicative and subject to final approved plans.</p>
            {list.length > 0 && (
              <p>
                Photo credits:{" "}
                {list.map((c, i) => (
                  <span key={c.src}>
                    {i > 0 && "; "}
                    <a href={c.url} className="underline" rel="noopener noreferrer">{c.title}</a> by {c.creator} ({c.license.toUpperCase()})
                  </span>
                ))}
              </p>
            )}
            <p>&copy; {new Date().getFullYear()} {site.name}</p>
          </div>
          <a href="#" className={`inline-flex items-center gap-2 text-sm ${linkClass}`}>
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
