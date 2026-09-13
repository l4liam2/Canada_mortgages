"use client";

import { useMemo, useState } from "react";
import { CalendarPlus, Mail } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { inputCls, Field } from "@/components/calculators/shared";

const REVIEW_DAYS = 120;

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}
function icsDate(d: Date) {
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}
function pretty(d: Date) {
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

export function RenewalReminder() {
  const [maturity, setMaturity] = useState("");
  const [todayMs, setTodayMs] = useState(0);
  const [lender, setLender] = useState("");

  const dates = useMemo(() => {
    if (!maturity) return null;
    const m = new Date(`${maturity}T12:00:00`);
    if (Number.isNaN(m.getTime())) return null;
    return {
      maturity: m,
      review: addDays(m, -REVIEW_DAYS),
      letter: addDays(m, -30),
      daysAway: Math.round((m.getTime() - todayMs) / 86_400_000),
    };
  }, [maturity, todayMs]);

  function downloadIcs() {
    if (!dates) return;
    const who = lender ? ` with ${lender}` : "";
    const desc = `Your mortgage${who} matures on ${pretty(dates.maturity)}. Most lenders hold a rate for ${REVIEW_DAYS} days, so this is the time to compare your renewal offer against the market.\\n\\nChad Denie, ${site.title}\\n${site.contact.phone}\\n${site.contact.email}\\n${site.url}/renewal-reminder/`;
    const stamp = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
    const event = (uid: string, start: Date, summary: string) =>
      [
        "BEGIN:VEVENT",
        `UID:${uid}@chad-denie-mortgages`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${icsDate(start)}`,
        `DTEND;VALUE=DATE:${icsDate(addDays(start, 1))}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${desc}`,
        "BEGIN:VALARM",
        "TRIGGER:-PT9H",
        "ACTION:DISPLAY",
        `DESCRIPTION:${summary}`,
        "END:VALARM",
        "END:VEVENT",
      ].join("\r\n");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Chad Denie Mortgages//Renewal Reminder//EN",
      "CALSCALE:GREGORIAN",
      event(`review-${icsDate(dates.maturity)}`, dates.review, "Start reviewing my mortgage renewal (call Chad Denie)"),
      event(`maturity-${icsDate(dates.maturity)}`, dates.maturity, "Mortgage maturity date"),
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mortgage-renewal-reminder.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const mailto = dates
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent("Mortgage renewal review")}&body=${encodeURIComponent(
        `Hi Chad,\n\nMy mortgage${lender ? ` with ${lender}` : ""} matures on ${pretty(dates.maturity)}. Please reach out around ${pretty(dates.review)} so we can review my options.\n\nThanks,`,
      )}`
    : "";

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-5 rounded-2xl border border-sand bg-white p-6 shadow-soft lg:col-span-5 sm:p-8">
        <Field label="Mortgage maturity date" hint="It's on your mortgage statement or your lender's online portal">
          <input
            type="date"
            value={maturity}
            onChange={(e) => {
              setMaturity(e.target.value);
              setTodayMs(Date.now());
            }}
            className={inputCls}
          />
        </Field>
        <Field label="Current lender (optional)">
          <input type="text" value={lender} onChange={(e) => setLender(e.target.value)} className={inputCls} placeholder="e.g. TD, Scotiabank, First National" />
        </Field>
        <div className="flex flex-col gap-3 pt-2">
          <Button onClick={downloadIcs} disabled={!dates} size="lg">
            <CalendarPlus className="h-5 w-5" aria-hidden="true" />
            Add reminder to my calendar
          </Button>
          <Button href={mailto || "#"} variant="secondary" disabled={!dates}>
            <Mail className="h-4 w-4" aria-hidden="true" />
            Ask Chad to reach out instead
          </Button>
        </div>
        <p className="text-xs text-muted">
          Downloads a calendar file that works with Apple Calendar, Google Calendar, and Outlook. Nothing is stored on
          this site.
        </p>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-2xl bg-espresso p-6 text-cream shadow-lift sm:p-8">
          {dates ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">Your renewal timeline</p>
              <ol className="mt-6 space-y-6">
                <li className="flex gap-4">
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-terracotta" aria-hidden="true" />
                  <div>
                    <p className="font-display text-2xl text-cream">{pretty(dates.review)}</p>
                    <p className="mt-1 text-sm text-cream/70">
                      Review window opens, {REVIEW_DAYS} days before maturity. Rate holds start here, so this is when to
                      compare offers.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-cream/40" aria-hidden="true" />
                  <div>
                    <p className="font-display text-2xl text-cream">{pretty(dates.letter)}</p>
                    <p className="mt-1 text-sm text-cream/70">
                      Around now your lender sends its renewal offer. Don&apos;t sign it before comparing.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-cream/40" aria-hidden="true" />
                  <div>
                    <p className="font-display text-2xl text-cream">{pretty(dates.maturity)}</p>
                    <p className="mt-1 text-sm text-cream/70">
                      Maturity date. Your new term starts, with your current lender or a better one.
                      {dates.daysAway > 0 ? ` That's ${dates.daysAway} days from today.` : ""}
                    </p>
                  </div>
                </li>
              </ol>
              {dates.daysAway <= REVIEW_DAYS && dates.daysAway >= -30 && (
                <p className="mt-6 rounded-xl bg-terracotta/20 px-4 py-3 text-sm text-cream">
                  You&apos;re inside the review window now. This is the ideal time to get in touch.
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">Why this matters</p>
              <p className="mt-3 font-display text-2xl leading-snug text-cream">
                Most people sign the first renewal offer they receive. Starting {REVIEW_DAYS} days early is the
                difference between accepting a rate and choosing one.
              </p>
              <p className="mt-4 text-sm text-cream/70">Enter your maturity date to see your personal timeline.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
