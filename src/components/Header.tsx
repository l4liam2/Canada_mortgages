"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Sliding indicator behind the active (or hovered) desktop nav item
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const moveTo = useCallback((el: HTMLElement | null, animate = true) => {
    const ind = indicatorRef.current;
    if (!ind) return;
    if (!animate) ind.style.transition = "none";
    if (!el) {
      ind.style.opacity = "0";
    } else {
      ind.style.opacity = "1";
      ind.style.width = `${el.offsetWidth}px`;
      ind.style.transform = `translateX(${el.offsetLeft}px)`;
    }
    if (!animate) {
      void ind.offsetWidth; // flush so the next move animates
      ind.style.transition = "";
    }
  }, []);
  const moveToActive = useCallback(
    (animate = true) => moveTo(navRef.current?.querySelector<HTMLElement>('[data-active="true"]') ?? null, animate),
    [moveTo],
  );
  useEffect(() => {
    moveToActive(false);
    const onResize = () => moveToActive(false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => moveToActive(false));
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, moveToActive]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-sand/80 shadow-[0_1px_0_rgba(42,33,28,0.03)]"
          : "bg-cream/0 border-b border-transparent"
      }`}
    >
      <Container size="wide">
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label="Chad Denie, home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-terracotta font-display text-lg font-semibold text-white shadow-soft transition-transform group-hover:-rotate-3">
              CD
            </span>
            <span className="leading-tight">
              <span className="block whitespace-nowrap font-display text-[1.15rem] font-semibold text-ink">
                {site.name}
              </span>
              <span className="block whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
                {site.title}
              </span>
            </span>
          </Link>

          <nav
            ref={navRef}
            className="relative hidden items-center gap-1 xl:flex"
            aria-label="Primary"
            onMouseLeave={() => moveToActive()}
          >
            <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive(item.href)}
                onMouseEnter={(e) => moveTo(e.currentTarget)}
                className={`relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors xl:px-3.5 xl:text-[0.95rem] ${
                  isActive(item.href) ? "text-terracotta-dark" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <a
              href={site.contact.phoneHref}
              className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-terracotta 2xl:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.contact.phone}
            </a>
            <Button href="/book" className="whitespace-nowrap">
              Book a call
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-cream-deep xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile sheet */}
      <div className="xl:hidden">
        <div id="mobile-menu" className="collapsible" data-open={open} inert={!open || undefined}>
          <div>
            <div className="collapsible-fade border-t border-sand bg-cream">
        <Container size="wide" className="py-4">
          <nav className="flex flex-col" aria-label="Mobile">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-lg font-medium ${
                  isActive(item.href) ? "bg-terracotta-tint text-terracotta-dark" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3 border-t border-sand pt-4">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-terracotta px-7 py-3.5 text-base font-medium text-white shadow-soft"
            >
              Book a free call
            </Link>
            <a
              href={site.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 py-2 text-base font-medium text-ink-soft"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.contact.phone}
            </a>
          </div>
        </Container>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
