import Link from "next/link";
import Image from "next/image";
import type { Show } from "@/lib/content";
import { witnessLabel } from "@/lib/witness";
import { ExhibitionPoster } from "./ExhibitionPoster";

export function ShowCard({ show }: { show: Show }) {
  return (
    <Link href={`/shows/${show.slug}`} className="group block">
      <article className="transition duration-300 group-hover:-translate-y-1">
        {show.playbillImage ? (
          <div className="playbill-card overflow-hidden">
            <Image
              src={show.playbillImage}
              alt={`Personal playbill from ${show.title}`}
              width={500}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <ExhibitionPoster show={show} />
        )}
        <p className="mt-3 text-sm text-cream">{show.title}</p>
        <p className="mt-1 text-xs tracking-[0.14em] uppercase text-[var(--muted)]">
          {show.year} · {witnessLabel(show)}
        </p>
      </article>
    </Link>
  );
}
