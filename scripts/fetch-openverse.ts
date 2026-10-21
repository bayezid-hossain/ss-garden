import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { imageSlots } from "../src/data/image-plan";

interface Hit {
  id: string; title: string | null; creator: string | null; license: string;
  license_version: string; url: string; foreign_landing_url: string; width: number | null;
}

const UA = { "User-Agent": "ssgarden-site/1.0" };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function search(query: string, license: string, minWidth: number): Promise<Hit[]> {
  const u = new URL("https://api.openverse.org/v1/images/");
  u.searchParams.set("q", query);
  u.searchParams.set("license", license);
  u.searchParams.set("category", "photograph");
  u.searchParams.set("page_size", "20");
  const r = await fetch(u, { headers: UA });
  if (!r.ok) return [];
  const j = await r.json();
  return ((j.results ?? []) as Hit[]).filter((x) => x.width === null || x.width >= minWidth);
}

async function main() {
  const force = process.argv.includes("--force");
  const used = new Set<string>();
  const rows: string[] = [];
  const attribution: unknown[] = [];

  for (const s of imageSlots.filter((x) => x.source === "openverse" && x.query)) {
    const out = path.join("public", s.src);
    let hits = await search(s.query!, "cc0,pdm", s.w * 0.6);
    if (hits.length === 0) hits = await search(s.query!, "by", s.w * 0.6);
    if (hits.length === 0) {
      const short = s.query!.split(" ").slice(-2).join(" ");
      hits = await search(short, "cc0,pdm", s.w * 0.6);
      if (hits.length === 0) hits = await search(short, "by", s.w * 0.6);
    }
    let done = false;
    for (const h of hits.filter((x) => !used.has(x.id)).slice(0, 8)) {
      try {
        const res = await fetch(h.url, { headers: UA });
        if (!res.ok) continue;
        const buf = Buffer.from(await res.arrayBuffer());
        const meta = await sharp(buf).metadata();
        if ((meta.width ?? 0) < s.w * 0.6) continue;
        const exists = fs.existsSync(out);
        const isPlaceholder = exists && fs.statSync(out).size < 30000;
        if (!force && exists && !isPlaceholder) { done = true; break; }
        fs.mkdirSync(path.dirname(out), { recursive: true });
        await sharp(buf).resize(s.w, s.h, { fit: "cover" }).webp({ quality: 82 }).toFile(out);
        used.add(h.id);
        const lic = `${h.license}${h.license_version ? ` ${h.license_version}` : ""}`;
        rows.push(`| ${s.src} | ${h.title ?? "Untitled"} | ${h.creator ?? "Unknown"} | ${lic.toUpperCase()} | ${h.foreign_landing_url} |`);
        if (!["cc0", "pdm"].includes(h.license)) {
          attribution.push({ src: s.src, title: h.title ?? "Untitled", creator: h.creator ?? "Unknown", license: lic, url: h.foreign_landing_url });
        }
        console.log("saved", s.src, "from", h.foreign_landing_url);
        done = true;
        break;
      } catch {}
    }
    if (!done) console.log("NO MATCH, keeping placeholder:", s.src, `(${s.query})`);
    await sleep(1000);
  }

  if (rows.length > 0) {
    const header = "# Image credits\n\nPhotos found through Openverse. CC0 and public-domain photos need no credit; others are credited in the site footer.\n\n| Slot | Title | Creator | Licence | Source |\n|---|---|---|---|---|\n";
    fs.appendFileSync("CREDITS.md", fs.existsSync("CREDITS.md") ? rows.join("\n") + "\n" : header + rows.join("\n") + "\n");
    const existing = JSON.parse(fs.readFileSync("src/data/credits.json", "utf8")) as unknown[];
    fs.writeFileSync("src/data/credits.json", JSON.stringify([...existing, ...attribution], null, 2) + "\n");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
