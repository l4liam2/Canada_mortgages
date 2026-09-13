"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/config/site";

const hiddenOn = ["/book", "/get-started", "/contact"];

export function MobileActionBar() {
  const pathname = usePathname();
  if (hiddenOn.some((p) => pathname.startsWith(p))) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden print:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3 px-4 py-3">
        <a
          href={site.contact.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-sand bg-white py-3 text-sm font-medium text-ink"
        >
          <Phone className="h-4 w-4 text-terracotta" aria-hidden="true" />
          Call Chad
        </a>
        <Link
          href="/book"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta py-3 text-sm font-medium text-white shadow-soft"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Book a call
        </Link>
      </div>
    </div>
  );
}
