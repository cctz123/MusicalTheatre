import Link from "next/link";
import { notFound } from "next/navigation";
import { ShowCard } from "@/components/ShowCard";
import type { Show } from "@/lib/content";
import { getAllShows, getAllThemes, getTheme } from "@/lib/content";
import { themeThreads } from "@/lib/threads";
import { Markdown } from "@/lib/markdown";

export function generateStaticParams() {
  return getAllThemes().map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getTheme(slug);
  return { title: theme?.title ?? "Theme" };
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) notFound();
  const others = getAllThemes().filter(
    (item) => item.slug !== theme.slug && !["mirror", "changes-america"].includes(item.slug),
  );
  const thread = themeThreads.find((item) => item.id === theme.slug);
  const all = getAllShows();
  const related = (thread?.slugs ?? [])
    .map((showSlug) => all.find((show) => show.slug === showSlug))
    .filter((show): show is Show => Boolean(show));

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <Link href="/themes" className="wall-label hover:text-cream">
        ← Gallery X
      </Link>
      <p className="mt-6 text-sm text-[var(--muted)]">An argument, not a summary</p>
      <h1 className="marquee mt-2 text-5xl">{theme.title}</h1>
      <p className="mt-4 text-xl text-[var(--muted)]">{theme.question}</p>
      <div className="mt-12">
        <Markdown content={theme.body} />
      </div>
      {related.length > 0 ? (
        <section className="mt-16">
          <p className="wall-label">Productions in this argument</p>
          <h2 className="marquee mt-2 mb-8 text-4xl">The evidence</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((show) => (
              <ShowCard key={show.slug} show={show} />
            ))}
          </div>
        </section>
      ) : null}
      <div className="mt-16 grid gap-3 sm:grid-cols-2">
        {others.map((item) => (
          <Link
            key={item.slug}
            href={`/themes/${item.slug}`}
            className="border border-[rgba(92,68,40,0.14)] border-l-[3px] border-l-gold bg-white px-5 py-4 hover:border-gold"
          >
            <p className="marquee text-xl font-semibold leading-tight">{item.title}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{item.question}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
