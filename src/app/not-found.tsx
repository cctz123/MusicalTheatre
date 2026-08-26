import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <p className="wall-label">Wrong door</p>
      <h1 className="marquee mt-3 text-5xl">This room is empty</h1>
      <p className="mt-4 text-[var(--muted)]">That page is not part of the exhibition.</p>
      <Link href="/" className="mt-8 inline-block text-gold">
        Back to the Welcome Hall
      </Link>
    </div>
  );
}
