import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
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
  chicago: "chicago",
  "come from away": "come-from-away",
  company: "company",
  hadestown: "hadestown",
  "hades town": "hadestown",
  "hello dolly": "hello-dolly",
  "into the woods": "into-the-woods",
  "kimberly akimbo": "kimberly-akimbo",
  matilda: "matilda",
  parade: "parade-2023",
  "some like it hot": "some-like-it-hot",
  "sunset blvd": "sunset-boulevard",
  "sunset boulevard": "sunset-boulevard",
  "sweeny todd": "sweeney-todd",
  "sweeney todd": "sweeney-todd",
  "the book of mormon": "the-book-of-mormon",
  "the book of morman": "the-book-of-mormon",
  "the outsiders": "the-outsiders-2024",
  "the outsiderrs": "the-outsiders-2024",
  "maybe happy ending": "maybe-happy-ending",
  gypsy: "gypsy",
  ragtime: "ragtime",
};

const ALSO_SLUGS = {
  gypsy: ["gypsy-1974"],
  chicago: ["chicago-1996"],
  cabaret: ["cabaret-1998"],
  company: ["company-2021"],
  "into-the-woods": ["into-the-woods-2022"],
  "sunset-boulevard": ["sunset-boulevard-2023"],
  "sweeney-todd": ["sweeney-todd-2023"],
};

const KEY_ALIASES = {
  "beautiful the carol king musical": "beautiful the carole king musical",
  "k pop musical": "k pop",
  "once upon a one more time": "one more time",
  "arthur millers death of a saleman": "death of a salesman",
  "operation micemeat": "operation mincemeat",
  cabret: "cabaret",
  "cabaret 2024": "cabaret",
  "harry porter": "harry potter and the cursed child",
  "lion king": "the lion king",
};

const PRIMARY_BY_KEY = {
  "harry potter and the cursed child": "Harry Porter.JPG",
  "into the woods": "Into the Woods 2.HEIC",
  "the lion king": "Lion king.JPG",
  mj: "MJ 2.HEIC",
  "school of rock": "School of Rock 2.HEIC",
  smash: "Smash 2.HEIC",
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic"]);

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
  name = name.replace(/['’]/g, "");
  name = name.replace(/&/g, " and ");
  name = name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  name = name.replace(/\s+\d+$/g, "").trim();
  name = name.replace(/(\D)\d+$/g, "$1").trim();
  return KEY_ALIASES[name] ?? name;
}

function prettyTitle(key) {
  return key.replace(/\b\w/g, (c) => c.toUpperCase());
}

function webExt(src) {
  return extname(src).toLowerCase() === ".heic" ? ".jpg" : extname(src).toLowerCase();
}

function copyImage(src, dest) {
  if (extname(src).toLowerCase() === ".heic") {
    execFileSync(
      "sips",
      ["-s", "format", "jpeg", "-s", "formatOptions", "80", src, "--out", dest],
      { stdio: "pipe" },
    );
    return;
  }
  copyFileSync(src, dest);
}

function sortFilesWithPrimary(files, key) {
  const preferred = PRIMARY_BY_KEY[key];
  if (!preferred) {
    return [...files].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }
  return [...files].sort((a, b) => {
    const aPreferred = basename(a).toLowerCase() === preferred.toLowerCase();
    const bPreferred = basename(b).toLowerCase() === preferred.toLowerCase();
    if (aPreferred !== bPreferred) return aPreferred ? -1 : 1;
    return a.localeCompare(b, undefined, { numeric: true });
  });
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
  if (/^playbill collection\./i.test(base)) {
    playbillsCollage = file;
    continue;
  }
  if (/^playbills\./i.test(base) && !playbillsCollage) {
    playbillsCollage = file;
    continue;
  }
  if (/^playbills\./i.test(base)) {
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
  const key = [...SLUGS.entries()].find(([, value]) => value === slug)?.[0] ?? slug;
  const ordered = sortFilesWithPrimary(files, key);
  const destDir = join(photosDir, slug);
  mkdirSync(destDir, { recursive: true });
  ordered.forEach((file, index) => {
    const ext = webExt(file);
    const photoDest = join(destDir, `${String(index + 1).padStart(2, "0")}${ext}`);
    copyImage(file, photoDest);
    if (index === 0) copyImage(file, join(playbillDir, `${slug}${ext}`));
  });
  matched.push({ slug, count: ordered.length });
  for (const extraSlug of ALSO_SLUGS[slug] ?? []) {
    const extraDir = join(photosDir, extraSlug);
    mkdirSync(extraDir, { recursive: true });
    ordered.forEach((file, index) => {
      const ext = webExt(file);
      copyImage(file, join(extraDir, `${String(index + 1).padStart(2, "0")}${ext}`));
      if (index === 0) copyImage(file, join(playbillDir, `${extraSlug}${ext}`));
    });
    matched.push({ slug: extraSlug, count: ordered.length });
  }
}

const archiveJson = join(root, "content/archive.json");
const previousArchive = existsSync(archiveJson)
  ? JSON.parse(readFileSync(archiveJson, "utf8"))
  : { extraShows: [] };
const previousMeta = new Map(
  (previousArchive.extraShows ?? []).map((item) => [
    item.slug,
    { year: item.year, revival: item.revival },
  ]),
);

const archive = [];
for (const [key, files] of [...archiveGroups.entries()].sort()) {
  const ordered = sortFilesWithPrimary(files, key);
  const folder = key.replace(/\s+/g, "-");
  const destDir = join(archiveDir, folder);
  mkdirSync(destDir, { recursive: true });
  const images = ordered.map((file, index) => {
    const ext = webExt(file);
    const name = `${String(index + 1).padStart(2, "0")}${ext}`;
    copyImage(file, join(destDir, name));
    return `/archive/${folder}/${name}`;
  });
  const meta = previousMeta.get(folder) ?? {};
  archive.push({ title: prettyTitle(key), slug: folder, images, ...meta });
}

if (playbillsCollage) {
  copyImage(playbillsCollage, join(archiveDir, "playbills-collage.jpeg"));
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
