import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/data/news";

function Wrap({ item, className, children }: { item: NewsItem; className: string; children: React.ReactNode }) {
  return item.href ? (
    <Link href={item.href} className={`${className} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}>
      {children}
    </Link>
  ) : (
    <article className={className}>{children}</article>
  );
}

export function NewsLead({ item, date }: { item: NewsItem; date: string }) {
  return (
    <Wrap item={item} className="block">
      <div className="relative aspect-[16/9] overflow-hidden bg-surface">
        <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1400px) 1336px, 100vw" className="object-cover" />
      </div>
      <div className="mt-5 max-w-[60ch]">
        <time dateTime={item.date} className="text-sm text-muted">{date}</time>
        <h2 className="mt-1 text-3xl md:text-5xl">{item.title}</h2>
        <p className="mt-3 text-lg text-muted">{item.summary}</p>
      </div>
    </Wrap>
  );
}

export function NewsRow({ item, date }: { item: NewsItem; date: string }) {
  return (
    <Wrap item={item} className="grid grid-cols-[96px_1fr] gap-5 py-6 md:grid-cols-[160px_1fr] md:gap-8">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image src={item.image.src} alt={item.image.alt} fill sizes="160px" className="object-cover" />
      </div>
      <div>
        <time dateTime={item.date} className="text-sm text-muted">{date}</time>
        <h3 className="mt-1 text-xl md:text-2xl">{item.title}</h3>
        <p className="mt-2 max-w-[60ch] text-muted">{item.summary}</p>
      </div>
    </Wrap>
  );
}
