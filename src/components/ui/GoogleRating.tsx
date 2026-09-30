import { Star } from "lucide-react";
import { site } from "@/config/site";

/** "5.0 on Google, 24 reviews" with stars, linking to Chad's Google reviews. */
export function GoogleRating({ className = "" }: { className?: string }) {
  const { rating, count } = site.googleRating;
  return (
    <a
      href={site.links.googleReviews}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 text-sm text-ink-soft ${className}`}
    >
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-terracotta text-terracotta" />
        ))}
      </span>
      <span>
        <span className="font-semibold text-ink">{rating.toFixed(1)}</span> on Google,{" "}
        <span className="underline decoration-sand underline-offset-4 transition group-hover:decoration-terracotta">
          {count} reviews
        </span>
      </span>
    </a>
  );
}
