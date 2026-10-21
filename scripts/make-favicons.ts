import fs from "node:fs";
import sharp from "sharp";

const LEAF = "public/brand/leaf.webp";

/** Leaf centred on a transparent square, with padding so it does not touch the edges. */
async function transparent(size: number) {
  const inner = Math.round(size * 0.86);
  const leaf = await sharp(LEAF).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: leaf, gravity: "center" }])
    .png()
    .toBuffer();
}

/** Minimal ICO container holding PNG images. */
function ico(images: { size: number; png: Buffer }[]) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size;
    e[1] = size >= 256 ? 0 : size;
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });
  return Buffer.concat([head, ...entries, ...images.map((i) => i.png)]);
}

async function main() {
  fs.writeFileSync("src/app/icon.png", await transparent(512));

  fs.writeFileSync(
    "src/app/favicon.ico",
    ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, png: await transparent(size) })))),
  );

  // Apple touch icons cannot be transparent: use the dark theme background.
  const leaf = await sharp(LEAF).resize(140, 140, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: "#0e130f" } })
    .composite([{ input: leaf, gravity: "center" }])
    .png()
    .toFile("src/app/apple-icon.png");

  console.log("saved src/app/icon.png, favicon.ico, apple-icon.png");
}

main().catch((e) => { console.error(e); process.exit(1); });
