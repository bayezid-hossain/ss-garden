import fs from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:4000";
const pages = ["/", "/projects/", "/projects/arboretum-residences/", "/landowners/", "/about/", "/contact/"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "phone", width: 390, height: 844 },
];

async function main() {
  fs.mkdirSync(".cache/shots", { recursive: true });
  const browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  for (const scheme of ["light", "dark"] as const) {
    for (const vp of viewports) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: scheme,
      });
      const page = await ctx.newPage();
      for (const p of pages) {
        await page.goto(BASE + p, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        const name = (p === "/" ? "home" : p.replace(/\//g, "_").replace(/^_|_$/g, "")) + `-${scheme}-${vp.name}`;
        await page.screenshot({ path: `.cache/shots/${name}-fold.png` });
        console.log("shot", name);
      }
      await ctx.close();
    }
  }
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
