import type { MetadataRoute } from "next";

// Required for static export (output: "export")
export const dynamic = "force-static";
import { site } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/calculator",
    "/calculator/affordability",
    "/calculator/closing-costs",
    "/calculator/prepayment",
    "/get-started",
    "/case-studies",
    "/renewal-reminder",
    "/resources",
    "/glossary",
    "/testimonials",
    "/blog",
    "/faq",
    "/contact",
    "/book",
  ];
  const now = new Date();
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route}/`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}/`,
    lastModified: new Date(`${p.date}T12:00:00`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...pages, ...servicePages, ...posts];
}
