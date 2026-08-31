import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[rgba(92,68,40,0.12)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-[var(--muted)] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="wall-label">My Broadway</p>
          <p className="mt-1 text-cream">A digital exhibition of Broadway, American history, and cultural change.</p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em]">Curated by Ciana</p>
        </div>
        <div className="flex gap-5">
          <Link href="/about" className="hover:text-cream">
            Curator’s Note
          </Link>
          <Link href="/catalog" className="hover:text-cream">
            Catalog
          </Link>
          <Link href="/epilogue" className="hover:text-cream">
            Epilogue
          </Link>
        </div>
      </div>
    </footer>
  );
}
