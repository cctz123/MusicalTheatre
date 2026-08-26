import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getAllShows, getCatalog } from "@/lib/content";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "My Broadway: A Living History",
    template: "%s · My Broadway",
  },
  description:
    "A digital exhibition of Broadway, American history, and cultural change, built from a research catalog and a lifetime in the theatre.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const shows = getAllShows().map(({ title, year, slug, gallery, credits }) => ({
    title,
    year,
    slug,
    gallery,
    credits,
  }));
  const catalog = getCatalog().map((entry) => ({
    title: entry.name,
    year: entry.year,
    href: entry.showSlug ? `/shows/${entry.showSlug}` : `/catalog#${entry.id}`,
  }));

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} min-h-screen antialiased`}>
        <Header shows={shows} catalog={catalog} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
