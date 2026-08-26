import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
const root = process.cwd();

const wb = XLSX.readFile(join(root, "Musical Theatre History Significance 2026.xlsx"));
const rows = XLSX.utils.sheet_to_json(wb.Sheets.Sheet1, { defval: "" });

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/\((film|revival)\)/gi, " $1 ")
    .replace(/the musical/gi, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|a|an)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compact(value) {
  return normalize(value).replace(/\s+/g, "");
}

function parseYear(value) {
  const match = String(value).match(/\b(17\d{2}|18\d{2}|19\d{2}|20\d{2})\b/);
  return match ? Number(match[1]) : 0;
}

const showFiles = require("node:fs")
  .readdirSync(join(root, "content/shows"))
  .filter((file) => file.endsWith(".md"));

const shows = showFiles.map((file) => {
  const text = require("node:fs").readFileSync(join(root, "content/shows", file), "utf8");
  const title = (text.match(/^title:\s*"(.*)"/m) || [])[1] || file;
  const slug = (text.match(/^slug:\s*(.*)$/m) || [])[1]?.trim() || file.replace(/\.md$/, "");
  const revival = /revival:\s*true/.test(text);
  const year = Number((text.match(/^year:\s*(\d+)/m) || [])[1] || 0);
  return { title, slug, revival, year, key: normalize(title), compact: compact(title) };
});

function matchShow(name, year) {
  const revival = /\brevival\b/i.test(name);
  const key = normalize(name);
  const tight = compact(name);
  const tightBase = compact(name.replace(/\b(revival|film)\b/gi, ""));
  const aliases = {
    beetlejuice: "beetlejuice",
    mj: "mj",
    sunsetblvd: revival ? "sunset-boulevard-2023" : "sunset-boulevard",
    sunsetboulevard: revival ? "sunset-boulevard-2023" : "sunset-boulevard",
    lesmiserables: "les-miserables",
    phantomopera: "the-phantom-of-the-opera",
    hellodolly: "hello-dolly",
    somelikeithot: "some-like-it-hot",
    parade: revival ? "parade-2023" : "",
    hadestown: "hadestown",
  };
  if (aliases[tightBase]) return aliases[tightBase];
  const candidates = shows.filter((show) => {
    if (show.key === key || show.compact === tight || show.compact === tightBase) return true;
    if (tightBase.length > 8 && (tightBase.includes(show.compact) || show.compact.includes(tightBase))) {
      return show.compact.length > 6;
    }
    return false;
  });
  if (!candidates.length) return "";
  if (revival) {
    return (
      candidates.find((show) => show.revival) ||
      candidates.find((show) => Math.abs(show.year - year) <= 5) ||
      candidates[0]
    ).slug;
  }
  return (candidates.find((show) => !show.revival) || candidates[0]).slug;
}

const seen = new Set();
const entries = [];
for (const row of rows) {
  const name = String(row.Name || "").trim();
  if (!name) continue;
  const year = parseYear(row.Date);
  const id = `${normalize(name)}-${year || "na"}`;
  if (seen.has(id)) continue;
  seen.add(id);
  entries.push({
    id: id.replace(/\s+/g, "-"),
    name,
    year,
    era: String(row.Era || "").trim(),
    culture: String(row["Culture Context"] || "").trim(),
    innovation: String(row["Tech Innovation"] || "").trim(),
    significance: String(row["Historical Significance"] || "").trim(),
    showSlug: matchShow(name, year),
  });
}

entries.sort((a, b) => (a.year || 9999) - (b.year || 9999) || a.name.localeCompare(b.name));

writeFileSync(join(root, "content/significance.json"), JSON.stringify({ entries }, null, 2));
const matched = entries.filter((entry) => entry.showSlug).length;
console.log(`Wrote ${entries.length} catalog entries (${matched} matched to exhibition cards)`);
console.log(
  entries
    .filter((entry) => !entry.showSlug)
    .map((entry) => `${entry.year} ${entry.name}`)
    .join("\n"),
);
