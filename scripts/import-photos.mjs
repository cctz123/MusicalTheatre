import { copyFileSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

const root = process.cwd();
const sourceRoot = join(root, "49. Musical theatre shows");
const playbillDir = join(root, "public/playbills");
const photosDir = join(root, "public/photos");
const archiveDir = join(root, "public/archive");

const SLUGS = {
  carousel: "carousel",
  "my fair lady": "my-fair-lady",
  "the king and i": "the-king-and-i",
  "the sound of music": "the-sound-of-music",
  "west side story": "west-side-story",
  cabaret: "cabaret",
  "cabaret original": "cabaret",
  cats: "cats",
  evita: "evita",
  "les miserables": "les-miserables",
  "phantom of the opera": "the-phantom-of-the-opera",
  "the phantom of the opera": "the-phantom-of-the-opera",
  "beauty and the beast": "beauty-and-the-beast",
  "the lion king": "the-lion-king",
  wicked: "wicked",
  "beetle juice": "beetlejuice",
  beetlejuice: "beetlejuice",
  "dear evan hansen": "dear-evan-hansen",
  hamilton: "hamilton",
  six: "six",
  mj: "mj",
  "mj the musical": "mj",
  chicago: "chicago-1996",
  "come from away": "come-from-away",
  company: "company-2021",
  hadestown: "hadestown",
  "hello dolly": "hello-dolly",
  "into the woods": "into-the-woods-2022",
  "kimberly akimbo": "kimberly-akimbo",
  matilda: "matilda",
  parade: "parade-2023",
  "some like it hot": "some-like-it-hot",
  "sunset blvd": "sunset-boulevard-2023",
  "sunset boulevard": "sunset-boulevard-2023",
  "sweeny todd": "sweeney-todd-2023",
  "sweeney todd": "sweeney-todd-2023",
  "the book of mormon": "the-book-of-mormon",
  "the outsiders": "the-outsiders-2024",
  "the outsiderrs": "the-outsiders-2024",
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function keyFromName(filename) {
  let name = filename.replace(/\.[^.]+$/, "");
  name = name.replace(/\.jpe?g$/i, "");
  name = name.replace(/\s*\([^)]*\)/g, " ");
  name = name.replace(/golden age.*$/i, " ");
  name = name.replace(/\s+\d+\s*$/g, " ");
  name = name.replace(/['’]/g, "");
  name = name.toLowerCase().replace(/[^a-z0-9&]+/g, " ").trim();
  return name;
}

function prettyTitle(key) {
  return key.replace(/\b\w/g, (c) => c.toUpperCase()).replace("&", "&");
}

rmSync(playbillDir, { recursive: true, force: true });
rmSync(photosDir, { recursive: true, force: true });
rmSync(archiveDir, { recursive: true, force: true });
mkdirSync(playbillDir, { recursive: true });
mkdirSync(photosDir, { recursive: true });
mkdirSync(archiveDir, { recursive: true });

function archiveKey(key) {
  if (key.startsWith("anastasia")) return "anastasia";
  if (key.includes("chocolate factory")) return "charlie and the chocolate factory";
  if (key.includes("romeo")) return "romeo and juliet";
  if (key === "back to future") return "back to the future";
  if (key === "jersey boy") return "jersey boys";
  if (key === "murder ballard") return "murder ballad";
  return key;
}

const bySlug = new Map();
const archiveGroups = new Map();
let playbillsCollage = null;

for (const file of walk(sourceRoot)) {
  const ext = extname(file).toLowerCase();
  if (!IMAGE_EXT.has(ext)) continue;
  const base = basename(file);
  if (/^img_/i.test(base)) continue;
  if (/^playbills\./i.test(base)) {
    playbillsCollage = file;
    continue;
  }
  const key = keyFromName(base);
  const slug = SLUGS[key];
  if (slug) {
    if (!bySlug.has(slug)) bySlug.set(slug, []);
    bySlug.get(slug).push(file);
  } else {
    const folder = archiveKey(key);
    if (!archiveGroups.has(folder)) archiveGroups.set(folder, []);
    archiveGroups.get(folder).push(file);
  }
}

const matched = [];
for (const [slug, files] of [...bySlug.entries()].sort()) {
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const destDir = join(photosDir, slug);
  mkdirSync(destDir, { recursive: true });
  files.forEach((file, index) => {
    const ext = extname(file).toLowerCase();
    copyFileSync(file, join(destDir, `${String(index + 1).padStart(2, "0")}${ext}`));
    if (index === 0) copyFileSync(file, join(playbillDir, `${slug}${ext}`));
  });
  matched.push({ slug, count: files.length });
}

const archive = [];
for (const [key, files] of [...archiveGroups.entries()].sort()) {
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const folder = key.replace(/\s+/g, "-");
  const destDir = join(archiveDir, folder);
  mkdirSync(destDir, { recursive: true });
  const images = files.map((file, index) => {
    const ext = extname(file).toLowerCase();
    const name = `${String(index + 1).padStart(2, "0")}${ext}`;
    copyFileSync(file, join(destDir, name));
    return `/archive/${folder}/${name}`;
  });
  archive.push({ title: prettyTitle(key), slug: folder, images });
}

if (playbillsCollage) {
  copyFileSync(playbillsCollage, join(archiveDir, "playbills-collage.jpeg"));
}

writeFileSync(
  join(root, "content/archive.json"),
  JSON.stringify(
    {
      collage: playbillsCollage ? "/archive/playbills-collage.jpeg" : "",
      extraShows: archive,
    },
    null,
    2,
  ),
);

console.log(`Matched ${matched.length} exhibition shows:`);
for (const item of matched) console.log(`  ${item.slug} (${item.count})`);
console.log(`\nArchive extras: ${archive.length}`);
for (const item of archive) console.log(`  ${item.title} (${item.images.length})`);
