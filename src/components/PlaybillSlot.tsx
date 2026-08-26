import Image from "next/image";
import type { Show } from "@/lib/content";
import { witnessCaption } from "@/lib/witness";
import { ExhibitionPoster } from "./ExhibitionPoster";

export function PlaybillSlot({ show }: { show: Show }) {
  if (show.playbillImage) {
    return (
      <aside>
        <div className="playbill-card overflow-hidden">
          <Image
            src={show.playbillImage}
            alt={`Personal photo from ${show.title}`}
            width={500}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">{witnessCaption(show)}</p>
      </aside>
    );
  }

  return (
    <aside>
      <ExhibitionPoster show={show} />
      <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">{witnessCaption(show)}</p>
    </aside>
  );
}
