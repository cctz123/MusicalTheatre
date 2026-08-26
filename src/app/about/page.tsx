import Image from "next/image";
import { GalleryMap } from "@/components/GalleryMap";
import { getArchive, getPage, getShowsWithPhotos } from "@/lib/content";
import { Markdown } from "@/lib/markdown";

export const metadata = { title: "Curator’s Note" };

export default function AboutPage() {
  const page = getPage("about");
  const archive = getArchive();
  const attended = getShowsWithPhotos();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="wall-label">Methodology</p>
      <h1 className="marquee mt-3 text-5xl">Curator’s Note</h1>
      <p className="mt-5 max-w-3xl text-xl text-[var(--muted)]">
        Why these productions, what counts as evidence, and why the work is a museum rather
        than a book.
      </p>
      <div className="mt-12 max-w-3xl">
        <Markdown content={page.body} />
      </div>

      {archive.collage ? (
        <section className="mt-16">
          <p className="wall-label">The collection</p>
          <h2 className="marquee mt-2 mb-8 text-4xl">Playbills on the floor</h2>
          <Image
            src={archive.collage}
            alt="A grid of personal Playbills laid out on the floor"
            width={1600}
            height={1200}
            className="w-full border border-[rgba(92,68,40,0.14)] object-cover"
          />
        </section>
      ) : null}

      <section className="mt-16">
        <p className="wall-label">{attended.length} nights documented</p>
        <h2 className="marquee mt-2 mb-4 text-4xl">I was there</h2>
        <p className="mb-8 max-w-3xl text-[var(--muted)]">
          These photographs are not production stills. They are the second history running
          through the museum: my history with Broadway, beside Broadway’s history with America.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {attended.map((show) => (
            <a key={show.slug} href={`/shows/${show.slug}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden border border-[rgba(92,68,40,0.14)]">
                <Image
                  src={show.playbillImage!}
                  alt={show.title}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
                  <p className="mt-2 text-sm text-cream">{show.title}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{show.year}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{show.year}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="wall-label">Beyond the eighty</p>
        <h2 className="marquee mt-2 mb-4 text-4xl">Also in the archive</h2>
        <p className="mb-8 max-w-3xl text-[var(--muted)]">
          These productions were attended too. They are not full exhibition cards, but they
          belong to the same nights in the theatre.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {archive.extraShows.map((item) => (
            <figure key={item.slug}>
              <div className="aspect-[4/5] overflow-hidden border border-[rgba(92,68,40,0.14)]">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 text-sm text-[var(--muted)]">{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <GalleryMap />
      </div>
    </div>
  );
}
