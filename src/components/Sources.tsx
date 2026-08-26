import { getSources } from "@/lib/sources";

export function Sources({ slug }: { slug: string }) {
  const sources = getSources(slug);

  return (
    <details className="mt-16 max-w-3xl border border-[rgba(92,68,40,0.14)] bg-white p-5">
      <summary className="cursor-pointer font-medium text-ink">
        Sources & further reading
      </summary>
      <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
        A historical exhibition should show its working. These are the references behind this
        card; the catalog and Curator’s Note describe the wider method.
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink">
        {sources.map((source) => (
          <li key={source.title}>
            {source.href ? (
              <a href={source.href} className="text-gold-text underline-offset-2 hover:underline">
                {source.title}
              </a>
            ) : (
              source.title
            )}
            {source.note ? (
              <span className="block text-[var(--muted)]">{source.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </details>
  );
}
