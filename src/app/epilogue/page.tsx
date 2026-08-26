import Link from "next/link";
import { getPage } from "@/lib/content";
import { Markdown } from "@/lib/markdown";

export const metadata = { title: "Epilogue" };

export default function EpiloguePage() {
  const page = getPage("epilogue");

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="wall-label">Epilogue</p>
      <h1 className="marquee mt-3 text-5xl">How the questions changed</h1>
      <div className="mt-12">
        <Markdown content={page.body} />
      </div>
      <Link
        href="/galleries/foundations"
        className="mt-12 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink"
      >
        Return to Gallery I
      </Link>
    </div>
  );
}
