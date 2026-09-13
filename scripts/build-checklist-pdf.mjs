// Builds public/downloads/mortgage-document-checklist.pdf from src/content/checklists.ts.
// Runs automatically before `next build` (see the "prebuild" script) and on demand with `npm run pdf`.
import PDFDocument from "pdfkit";
import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { checklists } from "../src/content/checklists.ts";
import { site } from "../src/config/site.ts";

const OUT_DIR = path.resolve("public/downloads");
const OUT_FILE = path.join(OUT_DIR, "mortgage-document-checklist.pdf");
const FONT_DIR = path.resolve("src/assets/fonts");

const colors = { ink: "#2a211c", soft: "#55483f", muted: "#8a7b70", terracotta: "#c2553a", sand: "#e7dccb", cream: "#f3ece1" };
const M = 56; // page margin

mkdirSync(OUT_DIR, { recursive: true });
const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: M, bottom: M, left: M, right: M },
  info: {
    Title: "Mortgage document checklist",
    Author: `${site.name}, ${site.title}`,
    Subject: "Documents to gather for a mortgage application",
    CreationDate: new Date("2026-01-01T00:00:00Z"),
  },
});

// Brand fonts when available, standard fonts otherwise
let display = "Helvetica-Bold";
let body = "Helvetica";
let bodyMedium = "Helvetica-Bold";
try {
  if (existsSync(path.join(FONT_DIR, "fraunces-600.woff"))) {
    doc.registerFont("Fraunces", path.join(FONT_DIR, "fraunces-600.woff"));
    doc.registerFont("DMSans", path.join(FONT_DIR, "dm-sans-400.woff"));
    doc.registerFont("DMSansMedium", path.join(FONT_DIR, "dm-sans-500.woff"));
    display = "Fraunces";
    body = "DMSans";
    bodyMedium = "DMSansMedium";
  }
} catch (err) {
  console.warn("Brand fonts unavailable, using Helvetica:", err.message);
}

const W = doc.page.width;
const H = doc.page.height;
const contentW = W - M * 2;

let drawingFooter = false;
function footer() {
  if (drawingFooter) return;
  drawingFooter = true;
  // Writing below the bottom margin would make pdfkit add a page (and recurse), so lift the margin briefly.
  const savedBottom = doc.page.margins.bottom;
  const savedY = doc.y;
  doc.page.margins.bottom = 0;
  const y = H - M + 14;
  doc.save();
  doc.moveTo(M, y - 10).lineTo(W - M, y - 10).lineWidth(0.5).strokeColor(colors.sand).stroke();
  doc.font(body).fontSize(8.5).fillColor(colors.muted);
  doc.text(`${site.name}, ${site.title}  ·  ${site.contact.phone}  ·  ${site.contact.email}  ·  ${site.url}`, M, y - 4, {
    width: contentW,
    align: "center",
    lineBreak: false,
  });
  doc.restore();
  doc.page.margins.bottom = savedBottom;
  doc.y = savedY;
  drawingFooter = false;
}

function ensureSpace(needed) {
  if (doc.y + needed > H - M - 10) {
    doc.addPage();
  }
}

doc.on("pageAdded", () => {
  footer();
  doc.y = M;
});

// ---- Cover header ----
doc.rect(0, 0, W, 150).fill(colors.terracotta);
doc.font(display).fontSize(30).fillColor("#ffffff").text("Mortgage document checklist", M, 44, { width: contentW });
doc.font(body).fontSize(12).fillColor("#f7e4dc").text(
  `Everything a lender typically asks for, organized by situation. Prepared by ${site.name}, ${site.title}, with ${site.brokerage.name}`,
  M,
  96,
  { width: contentW },
);
footer();
doc.y = 180;

doc.font(body).fontSize(10.5).fillColor(colors.soft).text(
  "Having documents ready is the single biggest thing that speeds up an approval. Tick items off as you gather them. Lenders may ask for more depending on your file, and Chad will tell you exactly what applies to you.",
  M,
  doc.y,
  { width: contentW, lineGap: 3 },
);
doc.moveDown(1.2);

for (const list of checklists) {
  ensureSpace(120);
  // Section title
  doc.font(display).fontSize(20).fillColor(colors.ink).text(list.title, M, doc.y, { width: contentW });
  doc.moveDown(0.25);
  doc.font(body).fontSize(10).fillColor(colors.muted).text(list.intro, M, doc.y, { width: contentW, lineGap: 2 });
  doc.moveDown(0.8);

  for (const group of list.groups) {
    ensureSpace(60);
    doc.font(bodyMedium).fontSize(9).fillColor(colors.terracotta).text(group.heading.toUpperCase(), M, doc.y, { width: contentW, characterSpacing: 1.2 });
    doc.moveDown(0.4);
    for (const item of group.items) {
      ensureSpace(28);
      const y = doc.y;
      doc.save();
      doc.roundedRect(M, y + 1, 11, 11, 2).lineWidth(1).strokeColor(colors.terracotta).stroke();
      doc.restore();
      doc.font(body).fontSize(10.5).fillColor(colors.soft).text(item, M + 20, y, { width: contentW - 20, lineGap: 2 });
      doc.moveDown(0.45);
    }
    doc.moveDown(0.5);
  }
  doc.moveDown(0.6);
}

ensureSpace(90);
doc.moveDown(0.5);
doc.rect(M, doc.y, contentW, 64).fill(colors.cream);
doc.font(display).fontSize(13).fillColor(colors.ink).text("Ready to talk it through?", M + 18, doc.y + 12, { width: contentW - 36 });
doc.font(body).fontSize(10).fillColor(colors.soft).text(
  `Call or text ${site.contact.phone}, email ${site.contact.email}, or book a free 20-minute call at ${site.url}/book/`,
  M + 18,
  doc.y + 4,
  { width: contentW - 36 },
);

doc.pipe(createWriteStream(OUT_FILE)).on("finish", () => {
  console.log(`Wrote ${path.relative(process.cwd(), OUT_FILE)}`);
});
doc.end();
