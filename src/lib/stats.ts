import { galleries } from "./galleries";
import { getAllShows, getArchive, getCatalog, getShowsWithPhotos } from "./content";
import { witnessLabel } from "./witness";

export type GalleryCount = {
  slug: string;
  roman: string;
  title: string;
  accent: string;
  href: string;
  count: number;
};

export type YearCount = {
  label: string;
  year?: number;
  count: number;
};

export type WitnessCount = {
  label: string;
  count: number;
};

export type WelcomeStats = {
  cards: number;
  catalog: number;
  nights: number;
  exhibitionNights: number;
  archiveExtras: number;
  galleries: number;
  byGallery: GalleryCount[];
  byYear: YearCount[];
  byWitness: WitnessCount[];
  maxGallery: number;
  maxYear: number;
  peakYear: YearCount;
  recentNights: number;
};

function nightYear(show: { attendedYear?: number; attendedRevival?: boolean; year: number }) {
  if (show.attendedYear) return show.attendedYear;
  if (show.attendedRevival) return undefined;
  return show.year;
}

export function getWelcomeStats(): WelcomeStats {
  const shows = getAllShows();
  const catalog = getCatalog();
  const nights = getShowsWithPhotos();
  const archive = getArchive();

  const byGallery = galleries
    .filter((gallery) => gallery.slug !== "living-history")
    .map((gallery) => ({
      slug: gallery.slug,
      roman: gallery.roman,
      title: gallery.title,
      accent: gallery.accent,
      href: `/galleries/${gallery.slug}`,
      count: shows.filter((show) => show.gallery === gallery.slug).length,
    }));

  const yearMap = new Map<number, number>();
  for (const show of nights) {
    const year = nightYear(show);
    if (year) yearMap.set(year, (yearMap.get(year) ?? 0) + 1);
  }
  for (const extra of archive.extraShows) {
    if (!extra.year) continue;
    yearMap.set(extra.year, (yearMap.get(extra.year) ?? 0) + 1);
  }

  const years = [...yearMap.keys()].sort((a, b) => a - b);
  const earlyCutoff = 2011;
  const early = years.filter((year) => year < earlyCutoff).reduce((sum, year) => sum + (yearMap.get(year) ?? 0), 0);
  const later = years.filter((year) => year >= earlyCutoff);
  const byYear: YearCount[] = [];
  if (early) byYear.push({ label: "to ’10", count: early });
  const last = later.at(-1) ?? earlyCutoff;
  for (let year = earlyCutoff; year <= last; year += 1) {
    byYear.push({ label: String(year).slice(2), year, count: yearMap.get(year) ?? 0 });
  }

  const seen = new Set<string>();
  const uniqueCards = [...shows]
    .sort((a, b) => Number(a.revival) - Number(b.revival))
    .filter((show) => {
      const key = show.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const witnessTally = new Map<string, number>();
  for (const show of uniqueCards) {
    const label = witnessLabel(show);
    witnessTally.set(label, (witnessTally.get(label) ?? 0) + 1);
  }
  const byWitness: WitnessCount[] = [
    "Researched Original",
    "Attended Original",
    "Researched Revival",
    "Attended Revival",
  ]
    .map((label) => ({ label, count: witnessTally.get(label) ?? 0 }))
    .filter((item) => item.count > 0);

  const maxYear = Math.max(...byYear.map((item) => item.count), 1);
  const peakYear = byYear.reduce((peak, item) => (item.count > peak.count ? item : peak), byYear[0]);
  const exhibitionNights = nights.length;
  const archiveExtras = archive.extraShows.length;
  const recentNights = (yearMap.get(2025) ?? 0) + (yearMap.get(2026) ?? 0);

  return {
    cards: shows.length,
    catalog: catalog.length,
    nights: exhibitionNights + archiveExtras,
    exhibitionNights,
    archiveExtras,
    galleries: galleries.length,
    byGallery,
    byYear,
    byWitness,
    maxGallery: Math.max(...byGallery.map((item) => item.count), 1),
    maxYear,
    peakYear,
    recentNights,
  };
}
