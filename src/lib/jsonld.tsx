import { site } from "@/config/site";
import type { Service } from "@/content/services";

/** Ids of the Person and FinancialService nodes declared site-wide in app/layout.tsx. */
export const personId = `${site.url}/#person`;
export const businessId = `${site.url}/#business`;

/** BreadcrumbList for a page. Paths are root-relative ("/services"); Home is added first. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}/`,
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${site.url}/services/${service.slug}/`,
    serviceType: service.title,
    areaServed: site.contact.serviceArea,
    provider: { "@id": businessId },
  };
}

/** Renders one or more JSON-LD objects as a script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
