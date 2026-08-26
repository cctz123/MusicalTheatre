import Link from "next/link";
import { getNextGallery, getPrevGallery } from "@/lib/galleries";

export function GalleryPager({ slug }: { slug: string }) {
  const prev = getPrevGallery(slug);
  const next = getNextGallery(slug);
  const href = (value?: { slug: string }) => {
    if (!value) return "";
    return value.slug === "living-history" ? "/themes" : `/galleries/${value.slug}`;
  };

  return (
    <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[rgba(92,68,40,0.14)] pt-8 sm:flex-row">
      {prev ? (
        <Link href={href(prev)} className="text-sm text-[var(--muted)] hover:text-gold">
          ← Gallery {prev.roman}: {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={href(next)} className="text-sm text-[var(--muted)] hover:text-gold sm:text-right">
          Gallery {next.roman}: {next.title} →
        </Link>
      ) : null}
    </div>
  );
}
