import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to ./out, which the
  // GitHub Actions workflow publishes to GitHub Pages.
  output: "export",

  // The site is served from https://l4liam2.github.io/Canada_morgages/.
  // Remove basePath when moving to a custom domain served from the root.
  basePath: "/Canada_morgages",

  // Emit /about/index.html instead of /about.html so GitHub Pages serves
  // clean URLs without extra rewrite rules.
  trailingSlash: true,

  // GitHub Pages has no image optimization server.
  images: { unoptimized: true },
};

export default nextConfig;
