import Image from "next/image";

export function PhotoGallery({
  title,
  photos,
}: {
  title: string;
  photos: string[];
}) {
  if (photos.length === 0) return null;

  return (
    <section className="mt-16">
      <p className="wall-label">I was there</p>
      <h2 className="marquee mt-2 mb-8 text-4xl">From the archive</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <figure key={photo} className="overflow-hidden border border-[rgba(92,68,40,0.14)]">
            <Image
              src={photo}
              alt={`Personal photo from ${title}`}
              width={900}
              height={1200}
              className="h-80 w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
