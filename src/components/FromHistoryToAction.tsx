const organizations = [
  {
    name: "Broadway Cares / Equity Fights AIDS",
    role: "Theatre as social action",
    href: "https://broadwaycares.org/",
    body: "Broadway’s philanthropic heart since 1988, supporting health care, meals, counseling, emergency assistance, and HIV/AIDS services nationwide. It continues the exhibition’s argument that the stage does not stop at the curtain—especially in the histories surrounding Rent, Angels in America, LGBTQ+ representation, and the AIDS crisis.",
  },
  {
    name: "Theatre Development Fund",
    role: "Making theatre accessible to everyone",
    href: "https://www.tdf.org/",
    body: "TDF works to remove financial, physical, and other barriers to live performance, including accessibility initiatives for Deaf and hard-of-hearing, blind and low-vision, autistic, and wheelchair-using audiences. Broadway cannot be living history if only certain people can experience it.",
  },
  {
    name: "Broadway Green Alliance",
    role: "Building a more sustainable stage",
    href: "https://www.broadwaygreen.com/",
    body: "An industry collaboration on environmental sustainability in theatre—from energy-efficient marquees to diverting textiles and electronics from landfills. One production-innovation case: Wicked’s shift to rechargeable microphone batteries cut annual battery use from 15,808 to 80, helping keep more than 250,000 batteries out of landfills over time.",
  },
];

export function FromHistoryToAction() {
  return (
    <div className="mt-16 border-t border-[rgba(92,68,40,0.12)] pt-16">
      <p className="wall-label">The story continues</p>
      <h2 className="marquee mt-2 text-4xl md:text-5xl">From History to Action</h2>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
        Broadway’s history is not confined to what happens onstage. Across the theatre community,
        artists, audiences, and organizations continue to expand access, support performers,
        respond to social crises, and rethink how theatre is produced.
      </p>

      <ol className="mt-10 grid gap-6 border-t border-[rgba(92,68,40,0.12)] pt-8 md:grid-cols-3">
        {[
          {
            stage: "Past",
            text: "What Broadway reveals about American history",
          },
          {
            stage: "Present",
            text: "How Broadway continues responding to society",
          },
          {
            stage: "Future",
            text: "How audiences can help keep theatre accessible, sustainable, and socially engaged",
          },
        ].map((item) => (
          <li key={item.stage}>
            <p className="wall-label">{item.stage}</p>
            <p className="mt-2 text-base leading-snug text-ink">{item.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {organizations.map((org) => (
          <article
            key={org.name}
            className="flex flex-col border border-[rgba(92,68,40,0.14)] border-l-[3px] border-l-gold bg-white px-5 py-6"
          >
            <p className="wall-label">{org.role}</p>
            <h3 className="marquee mt-3 text-2xl leading-tight text-ink">{org.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{org.body}</p>
            <a
              href={org.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium text-gold-text underline decoration-gold/35 underline-offset-[0.2em] transition hover:decoration-gold"
            >
              Learn more →
            </a>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
        These organizations are not an appendix of fundraising links. They are where the exhibition’s
        questions leave the archive and re-enter the theatre community: What responsibility does
        Broadway have to the people who make it, the people who see it, and the world around the
        stage?
      </p>
    </div>
  );
}
