import Link from "next/link";
import type { CatalogEntry } from "@/lib/content";

export function ResearchNotes({ notes }: { notes: CatalogEntry[] }) {
  if (!notes.length) return null;

  return (
    <section className="mt-16 max-w-3xl border border-[rgba(201,162,39,0.28)] bg-[rgba(201,162,39,0.06)] p-6">
      <p className="wall-label">2026 research notes</p>
      <h2 className="marquee mt-2 mb-6 text-3xl">From the significance catalog</h2>
      {notes.map((note) => (
        <div key={note.id} className="mb-8 last:mb-0">
          {notes.length > 1 ? (
            <p className="mb-3 text-sm font-medium text-ink">
              {note.name} {note.year ? `(${note.year})` : ""}
            </p>
          ) : null}
          {note.era ? (
            <p className="mb-3 text-sm text-[var(--muted)]">
              <span className="font-semibold text-ink">Era.</span> {note.era}
            </p>
          ) : null}
          {note.culture ? (
            <p className="mb-3 text-[1.02rem] leading-7 text-ink">
              <span className="font-semibold text-ink">Cultural context.</span> {note.culture}
            </p>
          ) : null}
          {note.innovation ? (
            <p className="mb-3 text-[1.02rem] leading-7 text-ink">
              <span className="font-semibold text-ink">Production / tech.</span> {note.innovation}
            </p>
          ) : null}
          {note.significance ? (
            <p className="text-[1.02rem] leading-7 text-ink">
              <span className="font-semibold text-ink">Historical significance.</span> {note.significance}
            </p>
          ) : null}
        </div>
      ))}
      <Link href="/catalog" className="mt-2 inline-block text-sm font-medium text-gold-text">
        Open the full 2026 catalog →
      </Link>
    </section>
  );
}
