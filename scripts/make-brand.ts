import sharp from "sharp";
import fs from "node:fs";

/** Crops the leaf mark from icon.jpg and removes its pale-green background so it works on any theme. */
async function main() {
  fs.mkdirSync("public/brand", { recursive: true });
  const { data, info } = await sharp("icon.jpg")
    .extract({ left: 91, top: 837, width: 450, height: 388 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Background colour = top-right corner pixel (clear of the leaves).
  const o = (info.width - 2) * 4;
  const bg = [data[o], data[o + 1], data[o + 2]];
  const T0 = 22; // at or below this colour distance: fully transparent
  const T1 = 70; // at or above: fully opaque

  for (let i = 0; i < data.length; i += 4) {
    const d = Math.hypot(data[i] - bg[0], data[i + 1] - bg[1], data[i + 2] - bg[2]);
    const a = Math.min(1, Math.max(0, (d - T0) / (T1 - T0)));
    if (a > 0 && a < 1) {
      // Remove the background tint from edge pixels so no pale halo is left.
      for (let c = 0; c < 3; c++) {
        data[i + c] = Math.max(0, Math.min(255, Math.round((data[i + c] - bg[c] * (1 - a)) / a)));
      }
    }
    data[i + 3] = Math.round(a * 255);
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize(160, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile("public/brand/leaf.webp");
  console.log("saved public/brand/leaf.webp", "bg", bg.join(","));
}

main().catch((e) => { console.error(e); process.exit(1); });
