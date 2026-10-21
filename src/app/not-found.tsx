import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-start justify-center gap-6 px-4 pt-24 md:px-8">
      <h1 className="text-5xl md:text-7xl">That page is not here.</h1>
      <p className="max-w-[46ch] text-lg text-muted">The link may be old, or the project may have moved.</p>
      <ButtonLink href="/projects/">Find a home</ButtonLink>
    </section>
  );
}
