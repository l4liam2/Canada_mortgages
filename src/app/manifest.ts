import type { MetadataRoute } from "next";

// Required for static export (output: "export")
export const dynamic = "force-static";
import { site } from "@/config/site";
import { assetPath } from "@/lib/paths";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, ${site.title}`,
    short_name: site.name,
    description: site.description,
    start_url: assetPath("/"),
    display: "standalone",
    background_color: "#faf6f0",
    theme_color: "#c2553a",
    icons: [
      { src: assetPath("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: assetPath("/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: assetPath("/icon-512-maskable.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
