import { site } from "@/config/site";
import { getAllPosts } from "@/lib/blog";

// Required for static export (output: "export")
export const dynamic = "force-static";

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${site.url}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${site.url}/blog/${p.slug}/</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <category>${escape(p.category)}</category>
      <description>${escape(p.excerpt)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)}, ${escape(site.title)}</title>
    <link>${site.url}/blog/</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escape(site.description)}</description>
    <language>en-ca</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
