import Link from "next/link";
import { galleries } from "@/lib/galleries";
import { Search } from "./Search";
import type { Show } from "@/lib/content";

export function Header({
  shows,
  catalog = [],
}: {
  shows: Pick<Show, "title" | "year" | "slug" | "gallery" | "credits">[];
  catalog?: { title: string; year: number; href: string }[];
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(92,68,40,0.12)] bg-[rgba(246,241,232,0.92)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="group">
          <p className="wall-label">A Living History</p>
          <p className="marquee text-xl text-cream group-hover:text-gold">My Broadway</p>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          <Link href="/galleries" className="hover:text-cream">
            Galleries
          </Link>
          <Link href="/timeline" className="hover:text-cream">
            Timeline
          </Link>
          <Link href="/catalog" className="hover:text-cream">
            Catalog
          </Link>
          <Link href="/themes" className="hover:text-cream">
            Living History
          </Link>
          <Link href="/about" className="hover:text-cream">
            Curator’s Note
          </Link>
          <Link href="/epilogue" className="hover:text-cream">
            Epilogue
          </Link>
        </nav>
        <Search shows={shows} galleries={galleries} catalog={catalog} />
      </div>
      <nav className="flex gap-4 overflow-x-auto px-5 pb-3 text-xs text-[var(--muted)] md:hidden">
        <Link href="/galleries">Galleries</Link>
        <Link href="/timeline">Timeline</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="/themes">Themes</Link>
        <Link href="/about">Curator’s Note</Link>
        <Link href="/epilogue">Epilogue</Link>
      </nav>
    </header>
  );
}
