import Link from "next/link";
import type { WelcomeStats } from "@/lib/stats";

const witnessColor: Record<string, string> = {
  "Researched Original": "var(--muted)",
  "Attended Original": "var(--burgundy)",
  "Researched Revival": "rgba(92, 68, 40, 0.35)",
  "Attended Revival": "var(--gold)",
};

function yearTick(item: WelcomeStats["byYear"][number], index: number, last: number) {
  if (index === 0 || index === last) return item.label;
  if (item.year && item.year % 3 === 0) return item.label;
  return "";
}

export function WelcomeFigures({ stats }: { stats: WelcomeStats }) {
  const witnessTotal = stats.byWitness.reduce((sum, item) => sum + item.count, 0);
  const peakLabel = stats.peakYear.year ? String(stats.peakYear.year) : "through 2010";

  return (
    <section id="collection" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-20">
      <p className="wall-label">The exhibition at a glance</p>
      <h2 className="marquee mt-3 text-4xl md:text-5xl">The collection in numbers</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        These figures are drawn from the exhibition itself: gallery cards, the 2026 catalog,
        and nights documented in the personal archive.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat href="/galleries" label="Exhibition cards" value={stats.cards} />
        <Stat href="/catalog" label="Catalog titles" value={stats.catalog} />
        <Stat
          href="/about"
          label="Nights documented"
          value={stats.nights}
          detail={`${stats.exhibitionNights} on cards · ${stats.archiveExtras} in archive`}
        />
        <Stat href="/galleries" label="Galleries" value={stats.galleries} />
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <figure className="border border-[rgba(92,68,40,0.14)] bg-white p-6">
          <p className="wall-label">Exhibition cards</p>
          <h3 className="marquee mt-2 text-2xl">By gallery</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Production cards in Galleries I–IX. Gallery X is five themes, not a card wall.
          </p>
          <ul className="mt-6 space-y-3">
            {stats.byGallery.map((gallery) => (
              <li key={gallery.slug}>
                <Link
                  href={gallery.href}
                  title={gallery.title}
                  className="group grid grid-cols-[2.5rem_1fr_2rem] items-center gap-3"
                >
                  <span className="wall-label" style={{ color: gallery.accent }}>
                    {gallery.roman}
                  </span>
                  <span className="relative block h-3 bg-[var(--house)]">
                    <span
                      className="absolute inset-y-0 left-0 transition group-hover:opacity-80"
                      style={{
                        width: `${(gallery.count / stats.maxGallery) * 100}%`,
                        background: gallery.accent,
                      }}
                    />
                  </span>
                  <span className="text-right text-sm tabular-nums text-[var(--muted)]">{gallery.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <figcaption className="sr-only">
            Number of exhibition cards in each production gallery, from Gallery I through IX.
          </figcaption>
        </figure>

        <figure className="border border-[rgba(92,68,40,0.14)] bg-white p-6">
          <p className="wall-label">Personal archive</p>
          <h3 className="marquee mt-2 text-2xl">Nights by year</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            The year I experienced the production, including archive extras beyond the exhibition
            cards.
          </p>
          <div className="mt-8 flex h-44 items-end gap-[3px] border-b border-[rgba(92,68,40,0.16)]">
            {stats.byYear.map((item) => (
              <div
                key={item.label}
                className="flex h-full min-w-0 flex-1 flex-col justify-end"
                title={`${item.year ?? "through 2010"}: ${item.count}`}
              >
                <div
                  className="w-full bg-gold"
                  style={{
                    height: item.count ? `${Math.max((item.count / stats.maxYear) * 100, 6)}%` : "2px",
                    opacity: item.count ? 1 : 0.22,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-[3px] text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">
            {stats.byYear.map((item, index) => (
              <span key={item.label} className="min-w-0 flex-1 text-center">
                {yearTick(item, index, stats.byYear.length - 1)}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Peak {peakLabel} · {stats.peakYear.count} nights. {stats.recentNights} nights since 2025.
          </p>
          <figcaption className="sr-only">
            Documented theatre nights grouped by year of attendance. Peak {peakLabel},{" "}
            {stats.peakYear.count} nights. {stats.recentNights} nights since 2025.
          </figcaption>
        </figure>
      </div>

      <figure className="mt-6 border border-[rgba(92,68,40,0.14)] bg-white p-6">
        <p className="wall-label">How I encountered the productions</p>
        <h3 className="marquee mt-2 text-2xl">Research and experience</h3>
        <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
          Each exhibition card is grounded either in a production I attended or one I researched
          historically. Photographs mark productions I experienced firsthand; posters identify
          researched productions.
        </p>
        <div className="mt-6 flex h-6 overflow-hidden">
          {stats.byWitness.map((item) => (
            <div
              key={item.label}
              title={`${item.label}: ${item.count}`}
              style={{
                width: `${(item.count / witnessTotal) * 100}%`,
                background: witnessColor[item.label] ?? "var(--gold)",
              }}
            />
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
          {stats.byWitness.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5"
                style={{ background: witnessColor[item.label] ?? "var(--gold)" }}
              />
              {item.label}
              <span className="tabular-nums">{item.count}</span>
            </li>
          ))}
        </ul>
      </figure>
    </section>
  );
}

function Stat({
  href,
  label,
  value,
  detail,
}: {
  href: string;
  label: string;
  value: number;
  detail?: string;
}) {
  return (
    <Link href={href} className="border border-[rgba(92,68,40,0.14)] bg-white px-5 py-5 transition hover:border-gold">
      <p className="wall-label">{label}</p>
      <p className="marquee mt-2 text-4xl md:text-5xl">{value}</p>
      {detail ? <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{detail}</p> : null}
    </Link>
  );
}
