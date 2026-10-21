import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";
import { imageSlots } from "../src/data/image-plan";

const PORT = 3100;
const BASE = `http://localhost:${PORT}`;

async function waitFor(url: string, ms = 120000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("dev server did not become ready");
}

async function main() {
  const only = process.argv.slice(2);
  const slots = imageSlots.filter(
    (s) => s.source === "render" && (only.length === 0 || only.some((o) => s.src.includes(o))),
  );
  if (slots.length === 0) {
    console.log("No matching render slots");
    return;
  }

  const server = spawn("npx", ["next", "dev", "-p", String(PORT)], { shell: true, stdio: "ignore" });
  try {
    await waitFor(`${BASE}/dev-tower/`);
    const browser = await chromium.launch({
      args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-webgl"],
    });
    for (const s of slots) {
      const r = s.render!;
      const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
      const q = new URLSearchParams({
        floors: String(r.floors), seed: String(r.seed), sky: r.sky,
        az: String(r.az), el: String(r.el), dist: String(r.dist),
      });
      await page.goto(`${BASE}/dev-tower/?${q}`);
      await page.waitForFunction(() => (window as unknown as { __towerReady?: boolean }).__towerReady === true, null, { timeout: 90000 });
      await page.waitForTimeout(600);
      const png = await page.screenshot({ type: "png" });
      const out = path.join("public", s.src);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await sharp(png).webp({ quality: 82 }).toFile(out);
      await page.close();
      console.log("rendered", s.src);
    }
    await browser.close();
  } finally {
    if (process.platform === "win32" && server.pid) {
      try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" }); } catch {}
    } else {
      server.kill();
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
