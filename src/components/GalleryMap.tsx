import Link from "next/link";
import { galleries } from "@/lib/galleries";

export function GalleryMap({ current }: { current?: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {galleries.map((gallery) => {
        const active = gallery.slug === current;
        return (
          <Link
            key={gallery.slug}
            href={gallery.slug === "living-history" ? "/themes" : `/galleries/${gallery.slug}`}
            className="border border-[rgba(92,68,40,0.14)] bg-white p-5 transition hover:border-[rgba(201,162,39,0.5)]"
            style={{ background: active ? gallery.accentSoft : "transparent" }}
          >
            <p className="wall-label" style={{ color: gallery.accent }}>
              Gallery {gallery.roman} · {gallery.years}
            </p>
            <h3 className="marquee mt-2 text-2xl">{gallery.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{gallery.summary}</p>
          </Link>
        );
      })}
    </div>
  );
}
