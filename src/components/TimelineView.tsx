"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GalleryMeta } from "@/lib/galleries";
import { innovationStages, themeThreads } from "@/lib/threads";
import { witnessLabel } from "@/lib/witness";

type TimelineShow = {
  title: string;
  year: number;
  slug: string;
  gallery: string;
  credits: string;
  revival: boolean;
  attendedRevival?: boolean;
  playbillImage?: string;
};

type Mode = "chronology" | "theme" | "innovation";

function chipClass(active: boolean) {
  return `rounded-full px-4 py-2 text-xs tracking-widest uppercase ${
    active ? "bg-gold text-ink" : "border border-[rgba(92,68,40,0.16)]"
  }`;
}

export function TimelineView({
  shows,
  galleries,
}: {
  shows: TimelineShow[];
  galleries: GalleryMeta[];
}) {
  const [mode, setMode] = useState<Mode>("chronology");
  const [filter, setFilter] = useState("all");
  const bySlug = useMemo(() => new Map(shows.map((show) => [show.slug, show])), [shows]);
  const visible = useMemo(
    () => (filter === "all" ? shows : shows.filter((show) => show.gallery === filter)),
    [filter, shows],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => setMode("chronology")} className={chipClass(mode === "chronology")}>
          Chronology
        </button>
        <button type="button" onClick={() => setMode("theme")} className={chipClass(mode === "theme")}>
          Theme
        </button>
        <button type="button" onClick={() => setMode("innovation")} className={chipClass(mode === "innovation")}>
          Innovation
        </button>
      </div>

      {mode === "chronology" ? (
        <>
          <div className="mb-10 flex flex-wrap gap-2">
            <button type="button" onClick={() => setFilter("all")} className={chipClass(filter === "all")}>
              All
            </button>
            {galleries
              .filter((gallery) => gallery.slug !== "living-history")
              .map((gallery) => (
                <button
                  key={gallery.slug}
                  type="button"
                  onClick={() => setFilter(gallery.slug)}
                  className={chipClass(filter === gallery.slug)}
                >
                  {gallery.roman}
                </button>
              ))}
          </div>
          <ol className="relative border-l border-[rgba(201,162,39,0.35)] pl-8">
            {visible.map((show) => {
              const gallery = galleries.find((item) => item.slug === show.gallery);
              const attended = Boolean(show.playbillImage);
              return (
                <li key={show.slug} className="mb-10">
                  <span
                    className={`absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full ${
                      attended ? "ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-[var(--house)]" : ""
                    }`}
                    style={{ background: gallery?.accent ?? "#c9a227" }}
                  />
                  <p className="wall-label">
                    {show.year} · Gallery {gallery?.roman} · {witnessLabel(show)}
                  </p>
                  <Link href={`/shows/${show.slug}`} className="marquee mt-1 block text-3xl hover:text-gold">
                    {show.title}
                  </Link>
                  <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">{show.credits}</p>
                </li>
              );
            })}
          </ol>
        </>
      ) : (
        <div className="grid gap-8">
          {(mode === "theme" ? themeThreads : innovationStages).map((thread) => {
            const items = thread.slugs.map((slug) => bySlug.get(slug)).filter(Boolean) as TimelineShow[];
            return (
              <section
                key={thread.id}
                className="border border-[rgba(92,68,40,0.14)] bg-white p-6"
              >
                <p className="wall-label">{thread.title}</p>
                <h2 className="marquee mt-2 text-3xl">{thread.question}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{thread.summary}</p>
                <ol className="mt-6">
                  {items.map((show, index) => (
                    <li key={show.slug} className="relative pb-6 pl-4 last:pb-0">
                      {index < items.length - 1 ? (
                        <span className="absolute bottom-0 left-[3px] top-3 w-px bg-[rgba(201,162,39,0.45)]" />
                      ) : null}
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-gold" />
                      <Link href={`/shows/${show.slug}`} className="text-lg hover:text-gold">
                        {show.title}
                      </Link>
                      <span className="ml-2 text-sm text-[var(--muted)]">
                        {show.year}
                        {show.playbillImage ? ` · ${witnessLabel(show)}` : ""}
                      </span>
                    </li>
                  ))}
                </ol>
                <Link href={thread.href} className="mt-2 inline-block text-sm text-gold-text">
                  Open the argument →
                </Link>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
