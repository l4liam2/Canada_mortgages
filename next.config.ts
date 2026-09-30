import type { NextConfig } from "next";
import { site } from "./src/config/site";
import { deviceSizes, imageSizes } from "./src/lib/image-sizes";

// The base path follows site.url: "/Canada_mortgages" while the site lives at
// https://l4liam2.github.io/Canada_mortgages, and "" once site.url is a custom domain
// (see README "Custom domain"). Image paths use assetPath() from src/lib/paths.ts
// so they follow this value automatically.
const basePath = new URL(site.url).pathname.replace(/\/$/, "");
const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to ./out, which the
  // GitHub Actions workflow publishes to GitHub Pages.
  output: "export",
  basePath,
  // Emit /about/index.html instead of /about.html so GitHub Pages serves
  // clean URLs without extra rewrite rules.
  trailingSlash: true,
  // GitHub Pages has no image optimization server, so resized WebP files are written ahead of
  // time by scripts/build-images.mjs and the custom loader points each srcset entry at them.
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts", deviceSizes, imageSizes },
  // Exposes the base path to components (next/image does not prefix it when unoptimized).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Keep Turbopack scoped to this project (a stray lockfile exists in the home folder).
  turbopack: { root: process.cwd() },
};

export default nextConfig;
