// Writes resized WebP copies of every JPEG and PNG in public/images to public/images/generated/,
// one per width in src/lib/image-sizes.ts, for the custom next/image loader (src/lib/image-loader.ts).
// Runs before `next dev` and `next build`, and on demand with `npm run images`.
// Files that are already newer than their source are skipped, so repeat runs are quick.
import sharp from "sharp";
import { mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { deviceSizes, imageSizes } from "../src/lib/image-sizes.ts";

const SRC_DIR = path.resolve("public/images");
const OUT_DIR = path.join(SRC_DIR, "generated");
const WIDTHS = [...imageSizes, ...deviceSizes];

function* sources(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full !== OUT_DIR) yield* sources(full);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      yield full;
    }
  }
}

let written = 0;
for (const file of sources(SRC_DIR)) {
  const rel = path.relative(SRC_DIR, file).replace(/\.(jpe?g|png)$/i, "");
  const srcTime = statSync(file).mtimeMs;
  mkdirSync(path.dirname(path.join(OUT_DIR, rel)), { recursive: true });
  for (const width of WIDTHS) {
    const out = path.join(OUT_DIR, `${rel}-${width}.webp`);
    if (existsSync(out) && statSync(out).mtimeMs >= srcTime) continue;
    // Never upscale: a request wider than the original gets the original size.
    await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 75 }).toFile(out);
    written++;
  }
}
console.log(`images: ${written} WebP file${written === 1 ? "" : "s"} written to ${path.relative(process.cwd(), OUT_DIR)}/`);
