import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { imageSlots } from "../src/data/image-plan";

interface Room { x: number; y: number; w: number; h: number; label: string; balcony?: boolean }

const rooms: Room[] = [
  { x: 60, y: 60, w: 540, h: 400, label: "Living and dining" },
  { x: 600, y: 60, w: 300, h: 220, label: "Kitchen" },
  { x: 900, y: 60, w: 240, h: 400, label: "Bedroom 1" },
  { x: 600, y: 280, w: 150, h: 180, label: "Bath" },
  { x: 750, y: 280, w: 150, h: 180, label: "Utility" },
  { x: 60, y: 460, w: 360, h: 380, label: "Bedroom 2" },
  { x: 420, y: 460, w: 360, h: 380, label: "Bedroom 3" },
  { x: 780, y: 460, w: 180, h: 380, label: "Bath" },
  { x: 960, y: 460, w: 180, h: 380, label: "Balcony", balcony: true },
];

function planSvg(flip: boolean) {
  const body = rooms
    .map((r) => {
      const x = flip ? 1200 - r.x - r.w : r.x;
      const fill = r.balcony ? "#cfe6c0" : "#fbfcf9";
      return (
        `<rect x="${x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${fill}" stroke="#2b3a2a" stroke-width="6"/>` +
        `<text x="${x + r.w / 2}" y="${r.y + r.h / 2}" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#2b3a2a">${r.label}</text>`
      );
    })
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">` +
    `<rect width="1200" height="900" fill="#f1f3ee"/>${body}` +
    `<text x="600" y="878" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#465044">Sample plan, not to scale</text></svg>`
  );
}

async function main() {
  for (const s of imageSlots.filter((x) => x.source === "plan")) {
    const out = path.join("public", s.src);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(Buffer.from(planSvg(s.src.length % 2 === 0))).resize(s.w, s.h).webp({ quality: 90 }).toFile(out);
    console.log("plan", s.src);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
