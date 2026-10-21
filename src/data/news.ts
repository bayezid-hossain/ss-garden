import { imageRef } from "./image-plan";

// All items below are SAMPLE content until real announcements, press and posts are supplied.

export type NewsTab = "news" | "publications" | "interviews" | "blogs";

export interface NewsItem {
  id: string;
  tab: NewsTab;
  title: string;
  /** ISO date, e.g. 2026-03-12 */
  date: string;
  /** Max 25 words */
  summary: string;
  image: ReturnType<typeof imageRef>;
  /** Optional link to a project page; items without it are plain articles */
  href?: string;
}

export const newsTabs: { value: NewsTab; label: string }[] = [
  { value: "news", label: "News" },
  { value: "publications", label: "Publications" },
  { value: "interviews", label: "Interviews" },
  { value: "blogs", label: "Blogs" },
];

const hero = (slug: string) => imageRef(`/images/projects/${slug}/hero.webp`);
const gallery = (slug: string, n: number) => imageRef(`/images/projects/${slug}/gallery-${n}.webp`);

export const newsItems: NewsItem[] = [
  {
    id: "arboretum-topping-out",
    tab: "news",
    title: "Arboretum Residences reaches its top floor",
    date: "2026-03-12",
    summary: "The structure of the thirteen-storey tower is complete. Brickwork and services on the lower floors are now under way.",
    image: hero("arboretum-residences"),
    href: "/projects/arboretum-residences/",
  },
  {
    id: "nirjhor-handover",
    tab: "news",
    title: "First families move into Nirjhor Duplexes",
    date: "2026-01-28",
    summary: "Keys were handed over to the first group of owners this month, with the remaining duplexes to follow in stages.",
    image: hero("nirjhor-duplexes"),
    href: "/projects/nirjhor-duplexes/",
  },
  {
    id: "kalpa-award",
    tab: "news",
    title: "Kalpa Business Centre shortlisted for a design award",
    date: "2025-11-20",
    summary: "The office building was named on a regional shortlist for its planted facade and naturally lit stair core.",
    image: hero("kalpa-business-centre"),
    href: "/projects/kalpa-business-centre/",
  },
  {
    id: "purbachal-launch",
    tab: "news",
    title: "Booking opens at Purbachal Green Court",
    date: "2025-09-04",
    summary: "Our sales office is now taking appointments for the new residential court, with plans and sample finishes on display.",
    image: hero("purbachal-green-court"),
    href: "/projects/purbachal-green-court/",
  },
  {
    id: "planting-in-structure",
    tab: "publications",
    title: "Notes on planting in structural design",
    date: "2026-02-10",
    summary: "A short paper from our engineering team on drainage, load and waterproofing for planters built into a concrete frame.",
    image: gallery("arboretum-residences", 1),
  },
  {
    id: "handover-guide",
    tab: "publications",
    title: "A guide to handover documents for buyers",
    date: "2025-10-15",
    summary: "What to expect at handover: approved plans, utility connections, the deed of transfer and the as-built drawings.",
    image: gallery("dhanmondi-terraces", 1),
  },
  {
    id: "jv-primer",
    tab: "publications",
    title: "Joint-venture development: a primer for landowners",
    date: "2025-06-02",
    summary: "A plain explanation of how a landowner agreement works, from valuation and share allocation to handover of your flats.",
    image: gallery("lakeview-villa-row", 1),
  },
  {
    id: "md-green-buildings",
    tab: "interviews",
    title: "Our managing director on building greener in Dhaka",
    date: "2026-02-24",
    summary: "An interview on shade, ventilation and planting in dense neighbourhoods, and why green design has to be planned from day one.",
    image: gallery("arboretum-residences", 2),
  },
  {
    id: "architect-interview",
    tab: "interviews",
    title: "The architect behind Dhanmondi Terraces",
    date: "2025-08-18",
    summary: "A conversation about fitting terraced homes onto a tight Dhanmondi plot and keeping every room naturally lit.",
    image: hero("dhanmondi-terraces"),
    href: "/projects/dhanmondi-terraces/",
  },
  {
    id: "site-manager-interview",
    tab: "interviews",
    title: "A day with a site manager",
    date: "2025-04-09",
    summary: "From the morning safety briefing to the evening concrete check, a site manager describes how a working day is planned.",
    image: gallery("kalpa-business-centre", 2),
  },
  {
    id: "choose-a-flat",
    tab: "blogs",
    title: "Six questions to ask before choosing a flat",
    date: "2026-03-02",
    summary: "Facing, floor level, parking, service charges and handover date: a short checklist for your first visit to a project.",
    image: gallery("purbachal-green-court", 1),
  },
  {
    id: "jv-blog",
    tab: "blogs",
    title: "What a landowner joint venture really involves",
    date: "2025-12-05",
    summary: "Common questions from landowners about timelines, approvals and which flats they receive, answered in plain terms.",
    image: gallery("nirjhor-duplexes", 2),
  },
  {
    id: "monsoon-site",
    tab: "blogs",
    title: "How we keep a site moving through monsoon",
    date: "2025-07-21",
    summary: "Drainage, covered storage and a revised pour schedule keep work safe and on track when the rains arrive.",
    image: gallery("lakeview-villa-row", 2),
  },
];

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Deterministic format, e.g. "12 March 2026" (UTC, so server and client match). */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export function parseTab(value: string | null): NewsTab {
  return newsTabs.some((t) => t.value === value) ? (value as NewsTab) : "news";
}

export function itemsForTab(tab: NewsTab): NewsItem[] {
  return newsItems.filter((i) => i.tab === tab).sort((a, b) => b.date.localeCompare(a.date));
}
