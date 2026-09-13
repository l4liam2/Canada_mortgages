# Favicon for the Chad Denie mortgage site

A house with a front door on a rounded tile, delivered in two palettes:

| Folder | Palette | When to use |
|---|---|---|
| `favicon/` (this folder) | navy tile `#1D3557`, white house, red door `#D62828` | the original, approved design |
| `favicon/warm/` | terracotta tile `#c2553a`, cream house `#faf6f0`, espresso door `#2b221d` | matches the site palette in `src/app/globals.css` |

Both folders contain the same set of files, built from the same artwork by `source/build.sh`. Open `preview.html` to compare them in mock browser tabs, home screens and a size ladder.

Artwork (in `source/`, and colour-swapped copies in `warm/source/`):

- `favicon-small.svg` — 16-unit grid so every edge lands on a pixel at 16 and 32 px. Shipped as `favicon.svg` and used for the 16/32/48 px bitmaps.
- `favicon-master.svg` — 64-unit grid with a chimney, rounded door top and a soft gradient. Used for 180 px and up.
- `icon-maskable.svg` — the master glyph scaled into the 80 % safe zone that Android adaptive icons keep visible.

## Files in each set

| File | Purpose |
|---|---|
| `favicon.ico` | 16, 32 and 48 px. Safari, Windows, legacy browsers, anything that requests `/favicon.ico` blindly |
| `favicon.svg` | Chrome, Firefox and Edge use this and scale it |
| `favicon-16x16.png`, `favicon-32x32.png` | optional explicit PNGs |
| `apple-touch-icon.png` | 180 px iOS home-screen icon. Square-cornered on purpose: iOS applies its own mask |
| `icon-192.png`, `icon-512.png` | PWA and Android icons referenced from the manifest |
| `icon-512-maskable.png` | Android adaptive icon (`"purpose": "maskable"`) |
| `site.webmanifest` | web app manifest listing the icons above |
| `head-snippet.html` | `<link>` tags for plain-HTML hosting only. Not needed in the Next.js app |

## Install in this Next.js app (App Router file conventions)

Pick a palette folder, then copy and rename. Next.js discovers these files and emits the `<link>` tags itself, so `src/app/layout.tsx` needs no changes.

| Copy | To |
|---|---|
| `favicon.ico` | `src/app/favicon.ico` (replaces the create-next-app placeholder) |
| `favicon.svg` | `src/app/icon.svg` |
| `apple-touch-icon.png` | `src/app/apple-icon.png` |
| `site.webmanifest` | `src/app/manifest.webmanifest` |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | `public/` (the manifest points at `/icon-*.png`) |

Notes:

- The manifest paths are root-relative. If `basePath` comes back in `next.config.ts` (it was `/Canada_morgages` for GitHub Pages), prefix the three `src` values in the manifest with it, or switch to a `src/app/manifest.ts` that reads the base path.
- `viewport.themeColor` in `layout.tsx` already controls the browser theme colour (`#faf6f0`). The manifest's `theme_color` only affects installed-app chrome; change it if you want them identical.

## Alternates

`alternates/alt-red-tile.svg` (Canada-red tile, navy door) and `alternates/alt-monogram-m.svg` (an "M" whose peaks are gabled roofs). Concept sketches only, SVG at one size.

## Rebuild

```bash
zsh favicon/source/build.sh
```

macOS only, no installs: Quick Look's `qlmanage` rasterises the SVGs and `source/pngtool.py` (pure Python) downsamples, cuts the rounded corners as real alpha and packs the ICO; `source/make-preview.py` rewrites `preview.html`. Edit an SVG in `source/` or `warm/source/`, run the script, and every PNG in both sets is regenerated.
