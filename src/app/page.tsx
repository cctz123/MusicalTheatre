import Link from "next/link";
import Image from "next/image";
import { GalleryMap } from "@/components/GalleryMap";
import { getPage, getShowsWithPhotos } from "@/lib/content";
import { Markdown } from "@/lib/markdown";

export default function HomePage() {
  const welcome = getPage("welcome");
  const photos = getShowsWithPhotos().slice(0, 8);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-16">
        <p className="wall-label">Welcome Hall</p>
        <h1 className="marquee mt-4 max-w-4xl text-6xl leading-[0.95] md:text-8xl">
          My Broadway: A Living History
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-[var(--muted)]">
          A digital exhibition of Broadway, American history, and cultural change.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          I came to this question through a lifetime of experiencing Broadway. The galleries
          are the historical argument. The photographs are the origin story.
        </p>
        <blockquote className="mt-10 max-w-3xl border-l-2 border-gold pl-5 text-2xl italic text-cream">
          “Every Broadway show is more than a performance—it is a historical artifact.
          Together, they tell the story of America.”
        </blockquote>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/galleries/foundations"
            className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink"
          >
            Enter Gallery I
          </Link>
          <Link
            href="/galleries"
            className="rounded-full border border-[rgba(92,68,40,0.2)] px-6 py-3 text-sm text-cream"
          >
            Museum map
          </Link>
          <Link
            href="/themes"
            className="rounded-full border border-[rgba(92,68,40,0.2)] px-6 py-3 text-sm text-cream"
          >
            Living History
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <Markdown content={welcome.body} />
      </section>

      {photos.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <p className="wall-label">I was there</p>
          <h2 className="marquee mt-3 mb-4 text-4xl">Nights at the theatre</h2>
          <p className="mb-8 max-w-2xl text-sm text-[var(--muted)]">
            A second history beside the galleries: productions I actually sat through.
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {photos.map((show) => (
              <Link key={show.slug} href={`/shows/${show.slug}`} className="group block">
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
              </Link>
            ))}
          </div>
          <Link href="/about" className="mt-6 inline-block text-sm text-gold">
            See the full personal archive →
          </Link>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <p className="wall-label">Exhibition Galleries</p>
        <h2 className="marquee mt-3 mb-8 text-4xl">Walk the rooms in order</h2>
        <GalleryMap />
      </section>
    </div>
  );
}
