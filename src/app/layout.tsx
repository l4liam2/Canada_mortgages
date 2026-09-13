import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Fraunces } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { site } from "@/config/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Toronto Mortgage Agent`,
    template: `%s | ${site.name}, Mortgage Agent`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    // Title, description, and images are omitted on purpose: each page's own values flow through,
    // and the per-route opengraph-image.tsx files supply generated preview images.
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6f0",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.title,
      url: site.url,
      image: `${site.url}/images/chad-denie-square.jpg`,
      telephone: site.contact.phone,
      email: site.contact.email,
      sameAs: [site.links.linkedin],
      worksFor: {
        "@type": "Organization",
        name: site.brokerage.name,
        url: site.brokerage.url,
      },
    },
    {
      "@type": "FinancialService",
      "@id": `${site.url}/#business`,
      name: `${site.name}, ${site.title}`,
      url: site.url,
      telephone: site.contact.phone,
      email: site.contact.email,
      image: `${site.url}/images/chad-denie-square.jpg`,
      priceRange: "Free consultation",
      areaServed: site.contact.serviceArea,
      address: site.offices.map((o) => ({
        "@type": "PostalAddress",
        streetAddress: o.street,
        addressLocality: o.city,
        addressRegion: o.province,
        postalCode: o.postal,
        addressCountry: "CA",
      })),
      openingHours: "Mo-Fr 09:00-18:00",
      founder: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" data-scroll-behavior="smooth" className={`${fraunces.variable} ${dmSans.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-terracotta focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        {site.analytics.plausibleDomain && (
          <Script
            defer
            data-domain={site.analytics.plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
