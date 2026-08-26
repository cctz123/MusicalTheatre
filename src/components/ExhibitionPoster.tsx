import type { Show } from "@/lib/content";
import { witnessLabel } from "@/lib/witness";
import { getGallery } from "@/lib/galleries";

function creditLine(credits: string) {
  return credits
    .replace(/^\d{4}\s*\|\s*/, "")
    .replace(/\s*\|\s*/g, " · ")
    .split(" · ")
    .slice(0, 2)
    .join(" · ");
}

export function ExhibitionPoster({
  show,
  className = "",
}: {
  show: Show;
  className?: string;
}) {
  const gallery = getGallery(show.gallery);
  const accent = gallery?.accent ?? "#c9a227";

  return (
    <div
      className={`playbill-card relative flex flex-col overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(165deg, ${gallery?.accentSoft ?? "rgba(201,162,39,0.18)"} 0%, #120e0c 42%, #0b0908 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 15%, ${accent}33, transparent 36%), radial-gradient(circle at 90% 85%, ${accent}22, transparent 40%)`,
        }}
      />
      <div className="relative flex h-full min-h-80 flex-col justify-between p-5">
        <div>
          <p className="wall-label" style={{ color: accent }}>
            Gallery {gallery?.roman} · {show.year}
            {show.revival ? " · Revival" : ""}
          </p>
          <p className="mt-6 text-[0.65rem] tracking-[0.28em] uppercase text-[#cbbfaa]">
            My Broadway
          </p>
          <h3 className="marquee mt-2 text-[1.85rem] leading-[0.95] text-[#f6f1e8]">{show.title}</h3>
        </div>
        <div>
          <div className="mb-4 h-px w-12" style={{ background: accent }} />
          <p className="line-clamp-3 text-xs leading-relaxed text-[#cbbfaa]">
            {creditLine(show.credits)}
          </p>
          <p className="mt-4 text-[0.62rem] tracking-[0.22em] uppercase text-[#f6f1e8]">
            {witnessLabel(show)}
          </p>
        </div>
      </div>
    </div>
  );
}
