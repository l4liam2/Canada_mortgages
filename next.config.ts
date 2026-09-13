import type { NextConfig } from "next";

// The site is served from https://l4liam2.github.io/Canada_morgages/.
// Set this to "" when moving to a custom domain served from the root
// (see README "Custom domain"). Image paths use assetPath() from src/lib/paths.ts
// so they follow this value automatically.
const basePath = "/Canada_morgages";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to ./out, which the
  // GitHub Actions workflow publishes to GitHub Pages.
  output: "export",
  basePath,
  // Emit /about/index.html instead of /about.html so GitHub Pages serves
  // clean URLs without extra rewrite rules.
  trailingSlash: true,
  // GitHub Pages has no image optimization server.
  images: { unoptimized: true },
  // Exposes the base path to components (next/image does not prefix it when unoptimized).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Keep Turbopack scoped to this project (a stray lockfile exists in the home folder).
  turbopack: { root: process.cwd() },
};

export default nextConfig;
