import { TimelineView } from "@/components/TimelineView";
import { getAllShows } from "@/lib/content";
import { galleries } from "@/lib/galleries";

export const metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="wall-label">Chronological spine</p>
      <h1 className="marquee mt-3 text-5xl">A century of productions</h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        Chronology is an index. Theme and Innovation show conversations that skip decades:
        race and American identity, or the path from book musical to digital scenery.
        Gold rings mark nights I attended, including later revivals of earlier works.
      </p>
      <div className="mt-12">
        <TimelineView
          shows={getAllShows().map(
            ({ title, year, slug, gallery, credits, revival, attendedRevival, playbillImage }) => ({
              title,
              year,
              slug,
              gallery,
              credits,
              revival,
              attendedRevival,
              playbillImage,
            }),
          )}
          galleries={galleries}
        />
      </div>
    </div>
  );
}
