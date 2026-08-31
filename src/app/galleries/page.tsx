import { GalleryMap } from "@/components/GalleryMap";

export const metadata = { title: "Galleries" };

export default function GalleriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="wall-label">Museum Map</p>
      <h1 className="marquee mt-3 text-5xl">Ten galleries</h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        The exhibition is designed to be explored chronologically. Each gallery is an era or
        movement; each exhibition card is a production seen as both a work of art and a historical
        document. Periods overlap when artistic movements developed simultaneously.
      </p>
      <div className="mt-10">
        <GalleryMap />
      </div>
    </div>
  );
}
