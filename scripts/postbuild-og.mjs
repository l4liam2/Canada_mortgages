// The static export writes generated social images as extension-less files (e.g. out/about/opengraph-image),
// which GitHub Pages serves with a generic content type. This copies each one to a .png and points the
// HTML meta tags at the .png so link previews work everywhere. Runs automatically after `next build`.
import { copyFileSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const files = walk(OUT);
let copied = 0;
for (const f of files) {
  if (path.basename(f) === "opengraph-image") {
    copyFileSync(f, `${f}.png`);
    copied++;
  }
}
let rewritten = 0;
for (const f of files) {
  if (!f.endsWith(".html")) continue;
  const html = readFileSync(f, "utf8");
  // Matches both the meta tags (…image?hash") and the escaped copies in the embedded page payload (…image?hash\")
  const next = html.replace(/\/opengraph-image(\?[a-f0-9]+)?(?=\\?")/g, "/opengraph-image.png");
  if (next !== html) {
    writeFileSync(f, next);
    rewritten++;
  }
}
console.log(`Social images: ${copied} copied to .png, ${rewritten} HTML files updated`);
