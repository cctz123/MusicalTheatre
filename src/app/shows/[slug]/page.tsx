import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryPager } from "@/components/GalleryPager";
import { PhotoGallery } from "@/components/PhotoGallery";
import { PlaybillSlot } from "@/components/PlaybillSlot";
import { ResearchNotes } from "@/components/ResearchNotes";
import { ShowCard } from "@/components/ShowCard";
import { Sources } from "@/components/Sources";
import { getAllShows, getCatalogForShow, getGalleryContent, getRelatedShows, getShow } from "@/lib/content";
import { witnessLabel } from "@/lib/witness";
import { Markdown } from "@/lib/markdown";

export function generateStaticParams() {
  return getAllShows().map((show) => ({ slug: show.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const show = getShow(slug);
  return { title: show ? `${show.title} (${show.year})` : "Exhibition card" };
}

export default async function ShowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const show = getShow(slug);
  if (!show) notFound();
  const gallery = getGalleryContent(show.gallery);
  const related = getRelatedShows(show);
  const notes = getCatalogForShow(show.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="wall-label">
        {gallery ? (
          <Link href={`/galleries/${gallery.slug}`} className="hover:text-cream">
            Gallery {gallery.roman} · {gallery.title}
          </Link>
        ) : null}
      </p>
      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <p className="text-gold">
            {show.year}
            {show.revival ? " · Revival" : ""}
            {" · "}
            {witnessLabel(show)}
          </p>
          <h1 className="marquee mt-2 text-5xl md:text-7xl">{show.title}</h1>
          <p className="mt-5 max-w-3xl text-[var(--muted)]">{show.credits}</p>
        </div>
        <PlaybillSlot show={show} />
      </div>

      <article className="mt-16">
        <Markdown content={show.body} />
      </article>

      <ResearchNotes notes={notes} />

      <Sources slug={show.slug} />

      <PhotoGallery title={show.title} photos={show.photos.slice(1)} />

      {related.length > 0 ? (
        <section className="mt-20">
          <p className="wall-label">Related works</p>
          <h2 className="marquee mt-2 mb-8 text-4xl">Continue through the museum</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ShowCard key={item.slug} show={item} />
            ))}
          </div>
        </section>
      ) : null}

      {gallery ? <GalleryPager slug={gallery.slug} /> : null}
    </div>
  );
}
