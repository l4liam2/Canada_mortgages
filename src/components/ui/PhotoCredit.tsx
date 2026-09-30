import type { Photo } from "@/content/photos";

/** The attribution line CC BY photos require: author, linked source, and licence. */
export function PhotoCredit({ photo, className = "" }: { photo: Photo; className?: string }) {
  return (
    <span className={`text-xs text-muted ${className}`}>
      Photo:{" "}
      <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline decoration-sand underline-offset-2 hover:text-ink-soft">
        {photo.author}
      </a>
      ,{" "}
      <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-sand underline-offset-2 hover:text-ink-soft">
        {photo.license}
      </a>
    </span>
  );
}
