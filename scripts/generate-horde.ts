import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { imageSlots } from "../src/data/image-plan";

const API = "https://aihorde.net/api/v2";
const KEY = process.env.HORDE_API_KEY ?? "0000000000";
const HEADERS = { apikey: KEY, "Client-Agent": "ssgarden:1:site", "Content-Type": "application/json" };
const NEGATIVE = "cartoon, toy, 3d render, cgi, low poly, illustration, painting, drawing, blurry, text, watermark, logo, low quality, people, deformed, distorted";
const CANDIDATES = 2;
const CONCURRENCY = 3;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function submit(prompt: string, w: number, h: number, upscale: boolean): Promise<string> {
  for (;;) {
    const res = await fetch(`${API}/generate/async`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        prompt: `${prompt} ### ${NEGATIVE}`,
        params: {
          width: w, height: h, steps: 30, n: CANDIDATES, sampler_name: "k_euler_a", cfg_scale: 6,
          ...(upscale ? { post_processing: ["RealESRGAN_x4plus"] } : {}),
        },
        nsfw: false, trusted_workers: false, slow_workers: true, r2: true,
      }),
    });
    if (res.status === 429) { await sleep(15000); continue; }
    const j = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(j));
    return j.id as string;
  }
}

async function waitDone(id: string) {
  for (;;) {
    const j = await (await fetch(`${API}/generate/check/${id}`)).json();
    if (j.faulted) throw new Error(`job ${id} faulted`);
    if (j.done) return;
    await sleep(8000);
  }
}

async function runSlot(src: string, prompt: string, w: number, h: number, upscale: boolean) {
  const id = await submit(prompt, w, h, upscale);
  console.log("submitted", src);
  await waitDone(id);
  const j = await (await fetch(`${API}/generate/status/${id}`)).json();
  const gens = (j.generations ?? []) as { img: string }[];
  const dir = path.join(".cache", "horde");
  fs.mkdirSync(dir, { recursive: true });
  for (let k = 0; k < gens.length; k++) {
    const buf = Buffer.from(await (await fetch(gens[k].img)).arrayBuffer());
    const file = path.join(dir, `${src.replace(/[\/]/g, "_")}-${k + 1}.webp`);
    await sharp(buf).webp({ quality: 90 }).toFile(file);
    console.log("saved", file);
  }
}

async function main() {
  const only = process.argv.slice(2);
  const slots = imageSlots.filter(
    (s) => s.source === "horde" && s.prompt && (only.length === 0 || only.some((o) => s.src.includes(o))),
  );
  if (KEY === "0000000000") {
    for (const s of slots) {
      const g = s.gen ?? { w: s.w, h: s.h };
      if (g.w > 637 || g.h > 637 || g.w * g.h > 637 * 637) {
        throw new Error(`${s.src} requests ${g.w}x${g.h}; anonymous Horde users are limited to 637x637`);
      }
    }
  }
  for (let i = 0; i < slots.length; i += CONCURRENCY) {
    await Promise.all(slots.slice(i, i + CONCURRENCY).map((s) => {
      const g = s.gen ?? { w: s.w, h: s.h };
      return runSlot(s.src, s.prompt!, g.w, g.h, !!s.upscale);
    }));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
