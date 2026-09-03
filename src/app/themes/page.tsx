import Link from "next/link";
import type { ReactNode } from "react";
import { FromHistoryToAction } from "@/components/FromHistoryToAction";
import { GalleryPager } from "@/components/GalleryPager";
import { getAllThemes, getGalleryContent } from "@/lib/content";
import { Markdown } from "@/lib/markdown";

export const metadata = { title: "Broadway as Living History" };

function GallerySection({
  number,
  title,
  subtitle,
  children,
}: {
  number: number;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <div className="mt-16 border-t border-[rgba(92,68,40,0.12)] pt-16">
      <p className="wall-label">Theme {number}</p>
      <h2 className="marquee mt-2 text-4xl md:text-5xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-xl text-[var(--muted)]">{subtitle}</p>
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}

function splitLaterSections(body: string) {
  const parts = body.split(/^## Theme (\d+) · (.+)$/m);
  const sectionTwo = (parts[0] ?? "").trim();
  const later: { number: number; title: string; subtitle: string; body: string }[] = [];
  for (let i = 1; i < parts.length; i += 3) {
    const content = (parts[i + 2] ?? "").trim();
    const breakAt = content.search(/\n\n/);
    later.push({
      number: Number(parts[i]),
      title: parts[i + 1] ?? "",
      subtitle: breakAt === -1 ? content : content.slice(0, breakAt).trim(),
      body: breakAt === -1 ? "" : content.slice(breakAt).trim(),
    });
  }
  return { sectionTwo, later };
}

export default function ThemesPage() {
  const gallery = getGalleryContent("living-history");
  const themes = getAllThemes().filter((theme) => !["mirror", "changes-america"].includes(theme.slug));
  const intro = getAllThemes().find((theme) => theme.slug === "mirror");
  const closing = getAllThemes().find((theme) => theme.slug === "changes-america");
  const { sectionTwo, later } = splitLaterSections(closing?.body ?? "");

  return (
    <div>
      <section className="border-b border-[rgba(92,68,40,0.12)]" style={{ background: gallery?.accentSoft }}>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="wall-label">Gallery X · Five themes</p>
          <h1 className="marquee mt-3 max-w-4xl text-5xl md:text-7xl">Broadway as Living History</h1>
          <p className="mt-4 max-w-3xl text-xl text-[var(--muted)]">
            {gallery?.quote}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        {gallery?.body ? <Markdown content={gallery.body} /> : null}

        <GallerySection
          number={1}
          title="Broadway Mirrors America"
          subtitle="The Stage as a Record of a Changing Nation"
        >
          {intro ? <Markdown content={intro.body} /> : null}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {themes.map((theme) => (
              <Link
                key={theme.slug}
                href={`/themes/${theme.slug}`}
                className="group border border-[rgba(92,68,40,0.14)] border-l-[3px] border-l-gold bg-white px-6 py-6 transition hover:border-gold hover:bg-[var(--house-2)]"
              >
                <h3 className="marquee text-2xl font-semibold leading-tight text-ink md:text-3xl">
                  {theme.title}
                </h3>
                <p className="mt-2 text-base leading-snug text-[var(--muted)]">
                  {theme.question}
                </p>
              </Link>
            ))}
          </div>
        </GallerySection>

        <GallerySection
          number={2}
          title="Broadway Changes America"
          subtitle="When the Stage Becomes Part of the Conversation"
        >
          <Markdown content={sectionTwo} />
        </GallerySection>

        {later.map((section) => (
          <GallerySection
            key={section.number}
            number={section.number}
            title={section.title}
            subtitle={section.subtitle}
          >
            <Markdown content={section.body} />
          </GallerySection>
        ))}

        <FromHistoryToAction />

        <GalleryPager slug="living-history" />
      </section>
    </div>
  );
}
