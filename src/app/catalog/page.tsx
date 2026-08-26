import { CatalogView } from "@/components/CatalogView";
import { getCatalog } from "@/lib/content";

export const metadata = { title: "Significance catalog" };

export default function CatalogPage() {
  const entries = getCatalog();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="wall-label">Research ledger · 2026</p>
      <h1 className="marquee mt-3 text-5xl">History and significance</h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        A working catalog of productions, eras, cultural context, and theatrical innovation.
        Titles before the American musical—ballad opera, British operetta—are marked as
        precursors, not as Broadway musicals. Where a title already has an exhibition card,
        the name links into the museum.
      </p>
      <div className="mt-12">
        <CatalogView entries={entries} />
      </div>
    </div>
  );
}
