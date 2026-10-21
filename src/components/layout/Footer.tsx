import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { Brand } from "./Brand";
import { site } from "@/data/site";
import credits from "@/data/credits.json";

interface Credit {
  src: string;
  title: string;
  creator: string;
  license: string;
  url: string;
}

export function Footer() {
  const list = credits as Credit[];
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr] md:px-8">
        <div>
          <Brand />
          <p className="mt-5 max-w-[46ch] text-muted">{site.description}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPin size={20} className="mt-0.5 shrink-0" />{site.address}</li>
            <li className="flex items-center gap-3"><Phone size={20} className="shrink-0" />{site.phone}</li>
            <li className="flex items-center gap-3"><EnvelopeSimple size={20} className="shrink-0" />{site.email}</li>
          </ul>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-sm">
          <ul className="space-y-3">
            <li><Link href="/projects/" className="hover:text-accent">Projects</Link></li>
            <li><Link href="/landowners/" className="hover:text-accent">Landowners</Link></li>
            <li><Link href="/about/" className="hover:text-accent">About</Link></li>
          </ul>
          <ul className="space-y-3">
            <li><Link href="/contact/" className="hover:text-accent">Book a visit</Link></li>
            {site.facebook && (
              <li><a href={site.facebook} className="hover:text-accent" rel="noopener noreferrer">Facebook</a></li>
            )}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-5 text-xs text-muted md:px-8">
          <p>Images on this site are illustrative. Specifications are indicative and subject to final approved plans.</p>
          {list.length > 0 && (
            <p className="mt-2">
              Photo credits:{" "}
              {list.map((c, i) => (
                <span key={c.src}>
                  {i > 0 && "; "}
                  <a href={c.url} className="underline" rel="noopener noreferrer">{c.title}</a> by {c.creator} ({c.license.toUpperCase()})
                </span>
              ))}
            </p>
          )}
          <p className="mt-2">&copy; {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
