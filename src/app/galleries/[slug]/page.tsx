import { notFound } from "next/navigation";
import { GalleryPager } from "@/components/GalleryPager";
import { ShowCard } from "@/components/ShowCard";
import { getAllGalleries, getGalleryContent } from "@/lib/content";
import { Markdown } from "@/lib/markdown";

export function generateStaticParams() {
  return getAllGalleries()
    .filter((gallery) => gallery.slug !== "living-history")
    .map((gallery) => ({ slug: gallery.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = getGalleryContent(slug);
  return { title: gallery ? `Gallery ${gallery.roman}: ${gallery.title}` : "Gallery" };
}

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = getGalleryContent(slug);
  if (!gallery || gallery.slug === "living-history") notFound();

  return (
    <div>
      <section
        className="border-b border-[rgba(92,68,40,0.12)]"
        style={{ background: gallery.accentSoft }}
      >
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="wall-label" style={{ color: gallery.accent }}>
            Gallery {gallery.roman} · {gallery.years}
          </p>
          <h1 className="marquee mt-3 max-w-4xl text-5xl md:text-7xl">{gallery.title}</h1>
          <p className="mt-4 text-xl text-[var(--muted)]">{gallery.subtitle}</p>
          <blockquote className="mt-8 max-w-3xl border-l-2 pl-5 text-xl italic" style={{ borderColor: gallery.accent }}>
            {gallery.quote}
          </blockquote>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <Markdown content={gallery.body} />
        <div className="mt-16">
          <p className="wall-label">Featured exhibition cards</p>
          <h2 className="marquee mt-2 mb-3 text-4xl">{gallery.shows.length} productions</h2>
          <p className="mb-8 max-w-2xl text-sm text-[var(--muted)]">
            Personal Playbills mark nights I attended. “Attended Revival” means the photograph is
            from a later staging, not the original production on the card. Exhibition posters mark
            works I did not see. Official Playbill covers are not used.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.shows.map((show) => (
              <ShowCard key={show.slug} show={show} />
            ))}
          </div>
        </div>
        <GalleryPager slug={gallery.slug} />
      </section>
    </div>
  );
}
