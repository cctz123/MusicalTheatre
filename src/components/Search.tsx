"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GalleryMeta } from "@/lib/galleries";

type SearchShow = {
  title: string;
  year: number;
  slug: string;
  gallery: string;
  credits: string;
};

type CatalogHit = {
  title: string;
  year: number;
  href: string;
};

export function Search({
  shows,
  galleries,
  catalog = [],
}: {
  shows: SearchShow[];
  galleries: GalleryMeta[];
  catalog?: CatalogHit[];
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const showHits = shows
      .filter((show) => {
        const gallery = galleries.find((item) => item.slug === show.gallery);
        return (
          show.title.toLowerCase().includes(q) ||
          String(show.year).includes(q) ||
          show.credits.toLowerCase().includes(q) ||
          gallery?.title.toLowerCase().includes(q)
        );
      })
      .slice(0, 6)
      .map((show) => ({
        key: show.slug,
        href: `/shows/${show.slug}`,
        title: show.title,
        year: show.year,
      }));
    const catalogHits = catalog
      .filter(
        (entry) =>
          entry.title.toLowerCase().includes(q) || String(entry.year).includes(q),
      )
      .filter((entry) => !showHits.some((hit) => hit.title.toLowerCase() === entry.title.toLowerCase()))
      .slice(0, 4)
      .map((entry) => ({
        key: entry.href,
        href: entry.href,
        title: entry.title,
        year: entry.year,
      }));
    return [...showHits, ...catalogHits].slice(0, 8);
  }, [catalog, galleries, query, shows]);

  return (
    <div className="relative w-40 md:w-64">
      <label className="sr-only" htmlFor="museum-search">
        Search productions
      </label>
      <input
        id="museum-search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        placeholder="Search shows"
        className="w-full rounded-full border border-[rgba(92,68,40,0.16)] bg-white px-4 py-2 text-sm text-cream outline-none placeholder:text-[var(--muted)] focus:border-gold"
      />
      {open && results.length > 0 ? (
        <ul className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border border-[rgba(92,68,40,0.14)] bg-white shadow-2xl">
          {results.map((show) => (
            <li key={show.key}>
              <Link
                href={show.href}
                className="flex items-baseline justify-between gap-3 px-4 py-3 text-sm hover:bg-gold-soft"
                onClick={() => setQuery("")}
              >
                <span>{show.title}</span>
                <span className="text-[var(--muted)]">{show.year}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
