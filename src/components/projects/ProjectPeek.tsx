import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/data/types";

const KEYS = ["Land area", "Storeys", "Units", "Handover"];

/** Brief details panel that slides up over a project image on hover or keyboard focus. */
export function ProjectPeek({ project: p }: { project: Project }) {
  const specs = p.specs.filter((s) => KEYS.includes(s.label));
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full border-t border-text bg-surface p-4 text-text transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none [@media(hover:none)]:hidden">
      <p className="text-sm text-muted">{p.tagline}</p>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {specs.map((s) => (
          <div key={s.label}>
            <dt className="text-muted">{s.label}</dt>
            <dd className="mt-0.5 font-medium">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 flex items-center gap-1 text-sm font-medium text-accent">
        View project <ArrowRight size={16} />
      </p>
    </div>
  );
}
