import sharp from "sharp";
import fs from "node:fs";

async function main() {
  fs.mkdirSync("public/brand", { recursive: true });
  await sharp("icon.jpg")
    .extract({ left: 94, top: 837, width: 447, height: 388 })
    .resize(160, 160, { fit: "contain", background: "#ebf2df" })
    .webp({ quality: 90 })
    .toFile("public/brand/leaf.webp");
  console.log("saved public/brand/leaf.webp");
}

main().catch((e) => { console.error(e); process.exit(1); });
