import { Suspense } from "react";
import type { Metadata } from "next";
import { NewsBrowser } from "@/components/news/NewsBrowser";

export const metadata: Metadata = {
  title: "News",
  description: "Project milestones, handovers, publications, interviews and blog posts from SS Garden in Dhaka.",
};

function Skeleton() {
  return (
    <div className="mt-24" aria-hidden="true">
      <div className="aspect-[16/9] animate-pulse bg-surface" />
      <div className="mt-5 h-8 w-2/3 animate-pulse bg-surface" />
    </div>
  );
}

export default function NewsPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 md:px-8">
      <h1 className="text-5xl md:text-7xl">News and stories</h1>
      <p className="mt-4 max-w-[50ch] text-lg text-muted">
        Progress on our sites, papers from our team, conversations and practical advice for buyers and landowners.
      </p>
      <Suspense fallback={<Skeleton />}>
        <NewsBrowser />
      </Suspense>
    </section>
  );
}
