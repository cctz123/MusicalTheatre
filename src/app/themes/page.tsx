import Link from "next/link";
import { GalleryPager } from "@/components/GalleryPager";
import { getAllThemes, getGalleryContent } from "@/lib/content";
import { Markdown } from "@/lib/markdown";

export const metadata = { title: "Broadway as Living History" };

export default function ThemesPage() {
  const gallery = getGalleryContent("living-history");
  const themes = getAllThemes().filter((theme) => !["mirror", "changes-america"].includes(theme.slug));
  const intro = getAllThemes().find((theme) => theme.slug === "mirror");
  const closing = getAllThemes().find((theme) => theme.slug === "changes-america");

  return (
    <div>
      <section className="border-b border-[rgba(92,68,40,0.12)]" style={{ background: gallery?.accentSoft }}>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="wall-label">Gallery X · Themes</p>
          <h1 className="marquee mt-3 max-w-4xl text-5xl md:text-7xl">Broadway as Living History</h1>
          <p className="mt-4 max-w-3xl text-xl text-[var(--muted)]">
            {gallery?.quote}
          </p>
          <p className="mt-6 max-w-3xl text-[var(--muted)]">
            These rooms are not another encyclopedia. They are interpretations: what Broadway
            reveals about immigration, race, war, politics, family, gender, technology, and
            who gets the American Dream.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        {intro ? <Markdown content={intro.body} /> : null}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {themes.map((theme) => (
            <Link
              key={theme.slug}
              href={`/themes/${theme.slug}`}
              className="border border-[rgba(92,68,40,0.14)] bg-white p-6 hover:border-gold"
            >
              <p className="wall-label">{theme.title}</p>
              <h2 className="marquee mt-3 text-3xl">{theme.question}</h2>
            </Link>
          ))}
        </div>
        {closing ? (
          <div className="mt-16">
            <Markdown content={closing.body} />
          </div>
        ) : null}
        <GalleryPager slug="living-history" />
      </section>
    </div>
  );
}
