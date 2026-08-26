"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogEntry } from "@/lib/content";
import { catalogScopeLabel, isPrecursor } from "@/lib/catalog";

function bucketFor(entry: CatalogEntry) {
  if (!entry.year) return "Undated";
  if (isPrecursor(entry)) return "Precursors";
  if (entry.year < 1900) return "Before 1900";
  return `${Math.floor(entry.year / 10) * 10}s`;
}

export function CatalogView({ entries }: { entries: CatalogEntry[] }) {
  const [query, setQuery] = useState("");
  const [bucket, setBucket] = useState("All");

  const buckets = useMemo(() => {
    const set = new Set(entries.map((entry) => bucketFor(entry)));
    return ["All", ...[...set].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))];
  }, [entries]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const inBucket = bucket === "All" || bucketFor(entry) === bucket;
      if (!inBucket) return false;
      if (!q) return true;
      return [entry.name, entry.era, entry.culture, entry.innovation, entry.significance, String(entry.year)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [bucket, entries, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the catalog"
          className="w-full max-w-md rounded-full border border-[rgba(92,68,40,0.16)] bg-white px-4 py-2 text-sm text-cream outline-none placeholder:text-[var(--muted)] focus:border-gold"
        />
        <p className="text-sm text-[var(--muted)]">{visible.length} productions</p>
      </div>
      <div className="mb-10 flex flex-wrap gap-2">
        {buckets.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setBucket(item)}
            className={`rounded-full px-4 py-2 text-xs tracking-widest uppercase ${
              bucket === item ? "bg-gold text-ink" : "border border-[rgba(92,68,40,0.16)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4">
        {visible.map((entry) => (
          <article
            key={entry.id}
            id={entry.id}
            className="border border-[rgba(92,68,40,0.14)] bg-white p-5"
          >
            <p className="wall-label">
              {catalogScopeLabel(entry)}
              {" · "}
              {entry.year || "Date unknown"}
              {entry.era ? ` · ${entry.era}` : ""}
            </p>
            <h2 className="marquee mt-2 text-3xl">
              {entry.showSlug ? (
                <Link href={`/shows/${entry.showSlug}`} className="hover:text-gold">
                  {entry.name}
                </Link>
              ) : (
                entry.name
              )}
            </h2>
            <div className="mt-4 grid gap-3 text-[0.98rem] leading-7 text-ink md:grid-cols-3">
              <p>
                <span className="font-semibold text-ink">Culture.</span> {entry.culture || "—"}
              </p>
              <p>
                <span className="font-semibold text-ink">Tech.</span> {entry.innovation || "—"}
              </p>
              <p>
                <span className="font-semibold text-ink">Significance.</span> {entry.significance || "—"}
              </p>
            </div>
            {entry.showSlug ? (
              <Link href={`/shows/${entry.showSlug}`} className="mt-4 inline-block text-sm text-gold">
                Open exhibition card →
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
