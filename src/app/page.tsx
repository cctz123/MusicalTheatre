import Link from "next/link";
import Image from "next/image";
import { GalleryMap } from "@/components/GalleryMap";
import { WelcomeFigures } from "@/components/WelcomeFigures";
import { getPage, getShowsWithPhotos } from "@/lib/content";
import { getWelcomeStats } from "@/lib/stats";
import { Markdown } from "@/lib/markdown";

export default function HomePage() {
  const welcome = getPage("welcome");
  const photos = getShowsWithPhotos().slice(0, 8);
  const stats = getWelcomeStats();

  return (
    <div>
      <section
        className="border-b border-[rgba(92,68,40,0.12)]"
        style={{ background: "rgba(154, 117, 20, 0.08)" }}
      >
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 md:pb-24 md:pt-24">
          <p className="wall-label">Welcome Hall</p>
          <h1 className="mt-8">
            <span className="exhibition-title block text-[3.4rem] leading-[0.92] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
              My Broadway
            </span>
            <span className="exhibition-subtitle mt-5 block text-2xl leading-snug md:mt-6 md:text-4xl">
              A Living History
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            A digital exhibition exploring Broadway as a record of American history and cultural
            change.
          </p>
          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.28em] text-gold-text">
            Curated by Ciana
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/galleries/foundations"
              className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink"
            >
              Begin the Exhibition →
            </Link>
            <Link
              href="/galleries"
              className="rounded-full border border-[rgba(92,68,40,0.2)] bg-white px-6 py-3 text-sm text-cream"
            >
              Explore the Galleries
            </Link>
            <Link
              href="/timeline"
              className="rounded-full border border-[rgba(92,68,40,0.2)] bg-white px-6 py-3 text-sm text-cream"
            >
              View the Timeline
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(92,68,40,0.12)] bg-[var(--house-2)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl border-l-2 border-gold pl-5">
            <p className="wall-label">Gallery X · Five themes</p>
            <h2 className="marquee mt-3 text-4xl md:text-5xl">Broadway as Living History</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              How musicals mirror America, change the conversation, and become living documents
              of what a generation feared, celebrated, or imagined could be different.
            </p>
          </div>
          <Link
            href="/themes"
            className="shrink-0 self-start rounded-full border border-[rgba(92,68,40,0.2)] bg-white px-7 py-3.5 text-sm text-cream transition hover:border-gold md:self-auto"
          >
            Explore Gallery X →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="wall-label">Orientation</p>
            <h2 className="marquee mt-3 mb-6 text-4xl">How to explore the exhibition</h2>
            <Markdown content={welcome.body} />
          </div>
          <blockquote className="border-l-2 border-gold pl-5 lg:col-span-2 lg:mt-16">
            <p className="text-2xl italic leading-snug text-cream">
              “Every Broadway show is more than a performance—it is a historical artifact.
              Together, they tell the story of America.”
            </p>
            <p className="mt-4 text-sm text-[var(--muted)]">
              The galleries are the historical argument. The photographs are the origin story.
            </p>
          </blockquote>
        </div>
      </section>

      <WelcomeFigures stats={stats} />

      {photos.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <p className="wall-label">I was there</p>
          <h2 className="marquee mt-3 mb-4 text-4xl">Nights at the theatre</h2>
          <p className="mb-8 max-w-2xl text-sm text-[var(--muted)]">
            A second history runs beside the galleries: the productions I experienced firsthand.
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
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                  {show.attendedRevival
                    ? show.attendedYear
                      ? `${show.attendedYear} · revival`
                      : "revival"
                    : show.year}
                </p>
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
        <h2 className="marquee mt-3 mb-3 text-4xl">The story in ten galleries</h2>
        <p className="mb-8 max-w-2xl text-sm text-[var(--muted)]">
          The galleries are organized around historical movements rather than mutually exclusive
          decades; periods overlap when artistic movements developed simultaneously.
        </p>
        <GalleryMap />
      </section>
    </div>
  );
}
