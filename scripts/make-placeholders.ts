import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { imageSlots } from "../src/data/image-plan";

async function main() {
  const missing = imageSlots.filter((s) => !fs.existsSync(path.join("public", s.src)));

  if (process.argv.includes("--check")) {
    console.log(missing.length ? `Missing:\n${missing.map((m) => `${m.src} (${m.source})`).join("\n")}` : "No missing images");
    return;
  }

  for (const s of missing) {
    const size = Math.round(Math.min(s.w, s.h) / 16);
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${s.w}" height="${s.h}">` +
      `<rect width="100%" height="100%" fill="#d6dcd0"/>` +
      `<text x="50%" y="46%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size}" fill="#465044">Image slot</text>` +
      `<text x="50%" y="56%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(size * 0.6)}" fill="#465044">${s.src} (${s.w}x${s.h}, ${s.source})</text></svg>`;
    const out = path.join("public", s.src);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(out);
    console.log("placeholder", s.src);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
