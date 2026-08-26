import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { galleries, getGallery, type GalleryMeta } from "./galleries";

const root = process.cwd();

export type Show = {
  title: string;
  year: number;
  gallery: string;
  slug: string;
  credits: string;
  revival: boolean;
  playbillImage?: string;
  photos: string[];
  related: string[];
  body: string;
};

export type GalleryContent = GalleryMeta & {
  body: string;
  shows: Show[];
};

export type Theme = {
  slug: string;
  title: string;
  question: string;
  body: string;
};

export type PageDoc = {
  title: string;
  body: string;
};

function readMarkdown(filePath: string) {
  const parsed = matter(readFileSync(filePath, "utf8"));
  return { data: parsed.data as Record<string, unknown>, body: parsed.content.trim() };
}

function photosFor(slug: string) {
  const dir = join(root, "public/photos", slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file) => `/photos/${slug}/${file}`);
}

function playbillFor(slug: string, explicit?: string) {
  if (explicit) return explicit;
  const candidates = [".jpg", ".jpeg", ".png", ".webp"].map(
    (ext) => `/playbills/${slug}${ext}`,
  );
  return candidates.find((path) => existsSync(join(root, "public", path))) ?? "";
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function getAllShows(): Show[] {
  const dir = join(root, "content/shows");
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data, body } = readMarkdown(join(dir, file));
      const slug = String(data.slug ?? file.replace(/\.md$/, ""));
      return {
        title: String(data.title ?? slug),
        year: Number(data.year ?? 0),
        gallery: String(data.gallery ?? ""),
        slug,
        credits: String(data.credits ?? ""),
        revival: Boolean(data.revival),
        playbillImage: playbillFor(slug, String(data.playbillImage ?? "")),
        photos: photosFor(slug),
        related: asStringArray(data.related),
        body,
      };
    })
    .sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
}

export function getShow(slug: string) {
  return getAllShows().find((show) => show.slug === slug);
}

export function getShowsByGallery(gallerySlug: string) {
  return getAllShows().filter((show) => show.gallery === gallerySlug);
}

export function getGalleryContent(slug: string): GalleryContent | undefined {
  const meta = getGallery(slug);
  if (!meta) return undefined;
  const file = join(root, "content/galleries", `${slug}.md`);
  const body = existsSync(file) ? readMarkdown(file).body : "";
  return { ...meta, body, shows: getShowsByGallery(slug) };
}

export function getAllGalleries() {
  return galleries.map((gallery) => getGalleryContent(gallery.slug)!);
}

export function getAllThemes(): Theme[] {
  const dir = join(root, "content/themes");
  const order = [
    "mirror",
    "immigration",
    "race",
    "war",
    "politics",
    "family",
    "gender",
    "technology",
    "inequality",
    "changes-america",
  ];
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data, body } = readMarkdown(join(dir, file));
      return {
        slug: String(data.slug ?? file.replace(/\.md$/, "")),
        title: String(data.title ?? ""),
        question: String(data.question ?? ""),
        body,
      };
    })
    .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}

export function getTheme(slug: string) {
  return getAllThemes().find((theme) => theme.slug === slug);
}

export function getPage(name: string): PageDoc {
  const { data, body } = readMarkdown(join(root, "content/pages", `${name}.md`));
  return { title: String(data.title ?? name), body };
}

export function getRelatedShows(show: Show) {
  const all = getAllShows();
  const found = show.related
    .map((slug) => all.find((item) => item.slug === slug))
    .filter((item): item is Show => Boolean(item));
  if (found.length) return found;
  return all.filter((item) => item.gallery === show.gallery && item.slug !== show.slug).slice(0, 3);
}

export type ArchiveShow = {
  title: string;
  slug: string;
  images: string[];
};

export function getArchive() {
  const file = join(root, "content/archive.json");
  if (!existsSync(file)) return { collage: "", extraShows: [] as ArchiveShow[] };
  return JSON.parse(readFileSync(file, "utf8")) as {
    collage: string;
    extraShows: ArchiveShow[];
  };
}

export function getShowsWithPhotos() {
  return getAllShows().filter((show) => Boolean(show.playbillImage));
}

export type CatalogEntry = {
  id: string;
  name: string;
  year: number;
  era: string;
  culture: string;
  innovation: string;
  significance: string;
  showSlug: string;
};

export function getCatalog(): CatalogEntry[] {
  const file = join(root, "content/significance.json");
  if (!existsSync(file)) return [];
  const data = JSON.parse(readFileSync(file, "utf8")) as { entries: CatalogEntry[] };
  return data.entries;
}

export function getCatalogForShow(slug: string) {
  return getCatalog().filter((entry) => entry.showSlug === slug);
}
