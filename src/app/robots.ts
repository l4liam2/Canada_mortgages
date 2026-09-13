import type { MetadataRoute } from "next";

// Required for static export (output: "export")
export const dynamic = "force-static";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
