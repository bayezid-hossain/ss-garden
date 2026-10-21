import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { imageSlots } from "../src/data/image-plan";

async function main() {
  const [src, k] = process.argv.slice(2);
  if (!src || !k) throw new Error("usage: tsx scripts/promote-horde.ts <image src> <candidate number>");
  const candidate = path.join(".cache", "horde", `${src.replace(/[\/]/g, "_")}-${k}.webp`);
  if (!fs.existsSync(candidate)) throw new Error(`No candidate at ${candidate}`);
  const out = path.join("public", src);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const slot = imageSlots.find((s) => s.src === src);
  const img = sharp(candidate);
  await (slot ? img.resize(slot.w, slot.h, { fit: "cover" }) : img).webp({ quality: 85 }).toFile(out);
  console.log("promoted", candidate, "->", out);
}

main().catch((e) => { console.error(e); process.exit(1); });
