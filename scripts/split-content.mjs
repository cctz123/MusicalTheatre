import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const text = readFileSync(join(root, "scripts", "pdf-extract.txt"), "utf8");

const GALLERY_BY_TITLE = {
  "Show Boat": "foundations",
  "Of Thee I Sing": "foundations",
  "Anything Goes": "foundations",
  "Porgy and Bess": "foundations",
  "Pal Joey": "foundations",
  "Oklahoma!": "golden-age",
  "Carousel": "golden-age",
  "Annie Get Your Gun": "golden-age",
  "Kiss Me, Kate": "golden-age",
  "South Pacific": "golden-age",
  "Guys and Dolls": "golden-age",
  "The King and I": "golden-age",
  "The Pajama Game": "golden-age",
  "My Fair Lady": "golden-age",
  "West Side Story": "golden-age",
  "Gypsy": "golden-age",
  "The Sound of Music": "golden-age",
  "Bye Bye Birdie": "grows-up",
  "How to Succeed in Business Without Really Trying": "grows-up",
  "Hello, Dolly!": "grows-up",
  "Fiddler on the Roof": "grows-up",
  "Man of La Mancha": "grows-up",
  "Cabaret": "grows-up",
  "Hair": "grows-up",
  "1776": "grows-up",
  "Company": "grows-up",
  "Jesus Christ Superstar": "grows-up",
  "Pippin": "grows-up",
  "A Little Night Music": "grows-up",
  "Chicago": "grows-up",
  "A Chorus Line": "grows-up",
  "Follies": "sondheim",
  "Sweeney Todd": "sondheim",
  "Sunday in the Park with George": "sondheim",
  "Into the Woods": "sondheim",
  "Assassins": "sondheim",
  "Evita": "mega-musicals",
  "Cats": "mega-musicals",
  "Les Misérables": "mega-musicals",
  "The Phantom of the Opera": "mega-musicals",
  "Miss Saigon": "mega-musicals",
  "Chess": "mega-musicals",
  "Sunset Boulevard": "mega-musicals",
  "Beauty and the Beast": "disney",
  "The Lion King": "disney",
  "Aida": "disney",
  "Mary Poppins": "disney",
  "Rent": "contemporary",
  "Ragtime": "contemporary",
  "The Producers": "contemporary",
  "Hairspray": "contemporary",
  "Wicked": "contemporary",
  "Avenue Q": "contemporary",
  "Spamalot": "contemporary",
  "Spring Awakening": "contemporary",
  "Billy Elliot": "contemporary",
  "In the Heights": "contemporary",
  "Next to Normal": "contemporary",
  "The Book of Mormon": "new-broadway",
  "Once": "new-broadway",
  "Newsies": "new-broadway",
  "Matilda": "new-broadway",
  "Fun Home": "new-broadway",
  "Hamilton": "new-broadway",
  "Dear Evan Hansen": "new-broadway",
  "Come From Away": "new-broadway",
  "Hadestown": "new-broadway",
  "Beetlejuice": "new-broadway",
  "SIX": "today",
  "SIX: The Musical": "today",
  "MJ": "today",
  "Kimberly Akimbo": "today",
  "Some Like It Hot": "today",
  "Parade": "today",
  "Merrily We Roll Along": "today",
  "Suffs": "today",
  "The Outsiders": "today",
  "Maybe Happy Ending": "today",
  "Buena Vista Social Club": "today",
  "Death Becomes Her": "today",
};

const RELATED = {
  "show-boat": ["oklahoma", "ragtime", "porgy-and-bess"],
  "oklahoma": ["show-boat", "carousel", "the-sound-of-music"],
  "carousel": ["oklahoma", "south-pacific"],
  "west-side-story": ["gypsy", "the-king-and-i", "hamilton"],
  "company": ["follies", "a-little-night-music", "company-2021"],
  "company-2021": ["company", "merrily-we-roll-along-2023"],
  "sweeney-todd": ["into-the-woods", "sweeney-todd-2023", "assassins"],
  "sweeney-todd-2023": ["sweeney-todd", "company-2021"],
  "spamalot": ["the-producers", "avenue-q"],
  "ragtime": ["show-boat", "in-the-heights", "hamilton"],
  "avenue-q": ["the-producers", "book-of-mormon"],
  "the-king-and-i": ["south-pacific", "the-sound-of-music"],
  "gypsy-1974": ["gypsy", "company-2021"],
  "cats": ["the-phantom-of-the-opera", "les-miserables"],
  "the-phantom-of-the-opera": ["cats", "les-miserables", "sunset-boulevard"],
  "rent": ["next-to-normal", "in-the-heights", "fun-home"],
  "hamilton": ["1776", "in-the-heights", "suffs"],
  "in-the-heights": ["hamilton", "rent", "west-side-story"],
  "beauty-and-the-beast": ["the-lion-king", "mary-poppins"],
  "the-lion-king": ["beauty-and-the-beast", "aida"],
  "wicked": ["into-the-woods", "hamilton"],
  "into-the-woods": ["wicked", "sunday-in-the-park-with-george", "assassins"],
  "parade-2023": ["1776", "suffs", "south-pacific"],
  "merrily-we-roll-along-2023": ["company", "sunday-in-the-park-with-george"],
};

const KNOWN_HEADINGS = new Set([
  "Overview",
  "Historical Era",
  "Historical & Cultural Context",
  "Historical and Cultural Context",
  "Production Innovation",
  "Historical Significance",
  "Why It Resonates With Me",
]);

const TITLE_ALIASES = {
  "Sweeney Todd: The Demon Barber of Fleet Street": "Sweeney Todd",
  "SIX: The Musical": "SIX",
  "Monty Python's Spamalot": "Spamalot",
  "Billy Elliot the Musical": "Billy Elliot",
  "Matilda the Musical": "Matilda",
  "MJ the Musical": "MJ",
  "Les Misérables": "Les Misérables",
  "The Outsiders": "The Outsiders",
};

function canonicalTitle(title) {
  const trimmed = title.replace(/\s+\(\d{4}.*\)$/, "").replace(/\s+Revival$/i, "").trim();
  if (/spamalot/i.test(trimmed)) return "Spamalot";
  if (/billy elliot/i.test(trimmed)) return "Billy Elliot";
  if (/^mj\b/i.test(trimmed)) return "MJ";
  return TITLE_ALIASES[trimmed] || trimmed;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[éèê]/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function yamlEscape(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

function collapse(text) {
  return text
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isHeading(line, prevEmpty) {
  if (KNOWN_HEADINGS.has(line)) return true;
  if (!prevEmpty) return false;
  return (
    /^[A-Z][A-Za-z0-9’''&,:;/\- ]{2,70}$/.test(line) &&
    !/[.!?]$/.test(line) &&
    !line.includes("|") &&
    !/^\d/.test(line) &&
    line !== "Looking Ahead" &&
    !line.startsWith("This gallery") &&
    line.length < 72
  );
}

function toMarkdown(body) {
  const lines = body.replace(/\r/g, "").split("\n");
  const out = [];
  let para = [];
  const flush = () => {
    if (!para.length) return;
    out.push(para.join(" "));
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const prevEmpty = i === 0 || !lines[i - 1].trim();
    if (!line) {
      flush();
      if (out.at(-1) !== "") out.push("");
      continue;
    }
    if (isHeading(line, prevEmpty)) {
      flush();
      if (out.at(-1) !== "") out.push("");
      out.push(`## ${line}`);
      out.push("");
    } else {
      para.push(line);
    }
  }
  flush();
  return collapse(out.join("\n")).replace(/\n## /g, "\n\n## ");
}

function extractYear(credits, title) {
  const fromCredits = credits.match(/\b(18\d{2}|19\d{2}|20\d{2})\b/);
  const fromTitle = title.match(/\b(18\d{2}|19\d{2}|20\d{2})\b/);
  return Number((fromCredits || fromTitle || ["0"])[0]);
}

function isRevival(title, credits) {
  return /revival/i.test(title) || /revival/i.test(credits);
}

const appendixStart = text.indexOf("\nGallery I \nOrigins of the American Musical");
const working = appendixStart > 0 ? text.slice(0, appendixStart) : text;

function nextNonEmpty(lines, from) {
  for (let i = from; i < lines.length; i++) {
    if (lines[i].trim()) return { index: i, text: lines[i].trim() };
  }
  return { index: -1, text: "" };
}

const cardStarts = [];
const rawLines = working.split("\n");
for (let i = 0; i < rawLines.length - 1; i++) {
  const line = rawLines[i].trim();
  const next = nextNonEmpty(rawLines, i + 1).text;
  const match = line.match(/^(\d+)\.\s+(.+)$/);
  if (!match) continue;
  if (/\(\d{4}/.test(match[2])) continue;
  if (!/^\d{4}/.test(next) && !/Revival/.test(next)) continue;
  cardStarts.push({ index: i, n: match[1], title: match[2].trim() });
}

const shows = [];
for (let i = 0; i < cardStarts.length; i++) {
  const start = cardStarts[i];
  const end = i + 1 < cardStarts.length ? cardStarts[i + 1].index : rawLines.length;
  const block = rawLines.slice(start.index + 1, end);
  let creditLines = [];
  let bodyStart = 0;
  for (let j = 0; j < block.length; j++) {
    const t = block[j].trim();
    if (t === "Overview") {
      bodyStart = j;
      break;
    }
    if (t) creditLines.push(t);
    bodyStart = j + 1;
  }
  const credits = creditLines.join(" ").replace(/\s+/g, " ").trim();
  const body = toMarkdown(block.slice(bodyStart).join("\n").replace(/\nLooking Ahead[\s\S]*$/, ""));
  const revival = isRevival(start.title, credits);
  const year = extractYear(credits, start.title);
  const title = canonicalTitle(start.title);
  let gallery = revival ? "today" : GALLERY_BY_TITLE[title];
  if (!gallery) gallery = "today";
  let slug = slugify(title);
  if (revival) slug = `${slug}-${year}`;
  shows.push({ title, year, credits, gallery, slug, revival, body });
}

const uniqueShows = [];
const seen = new Set();
for (const show of shows) {
  if (seen.has(show.slug)) continue;
  seen.add(show.slug);
  uniqueShows.push(show);
}

function sectionBetween(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  if (start < 0) return "";
  const from = start + startMarker.length;
  const end = endMarker ? source.indexOf(endMarker, from) : source.length;
  return source.slice(from, end < 0 ? undefined : end);
}

const galleryIntroMarkers = [
  {
    slug: "foundations",
    start: "Gallery Introduction \nThe history of Broadway did not begin",
    end: "\nFeatured Exhibition Cards \nThis gallery includes the following full exhibition cards:",
    prefix: "The history of Broadway did not begin",
  },
  {
    slug: "golden-age",
    start: "Gallery II \nThe Golden Age of the American Musical",
    end: "\nFeatured Exhibition Cards \nThis gallery includes full exhibition cards for: \n1. Oklahoma!",
  },
  {
    slug: "grows-up",
    start: "Gallery III \nBroadway Comes of Age",
    end: "\nFeatured Exhibition Cards \nThis gallery includes full exhibition cards for: \n1. Bye Bye Birdie",
  },
  {
    slug: "sondheim",
    start: "Gallery IV \nThe Era of the Mega-Musical",
    end: "\nFeatured Exhibition Cards \nThis gallery includes full exhibition cards for: \n1. Evita",
    note: "sondheim-from-mixed",
  },
  {
    slug: "mega-musicals",
    start: "Gallery IV \nThe Era of the Mega-Musical",
    end: "\nFeatured Exhibition Cards \nThis gallery includes full exhibition cards for: \n1. Evita",
  },
  {
    slug: "disney",
    start: "Gallery V \nBroadway Reimagined \nDisney",
    end: "\nFeatured Exhibition Cards \nThis gallery includes full exhibition cards for: \n1. Beauty and the Beast",
  },
  {
    slug: "contemporary",
    start: "Looking Ahead \nAs Broadway entered the new millennium",
    end: "\nFeatured Exhibition Cards \nThis gallery includes full exhibition cards for: \n1. Rent",
  },
  {
    slug: "new-broadway",
    start: "Gallery VII \nThe Modern Broadway Renaissance",
    end: "\nFeatured Exhibition Cards \nThis gallery includes full exhibition cards for: \n1. The Book of Mormon",
  },
  {
    slug: "today",
    start: "Gallery IX \nBroadway Reimagined",
    end: "\n1. Company \n2021 Broadway Revival",
  },
];

// Better gallery intro extraction using known "Gallery Introduction" occurrences
function grabIntro(header) {
  const start = working.indexOf(header);
  if (start < 0) return "";
  const introAt = working.indexOf("Gallery Introduction", start);
  if (introAt < 0) return "";
  const featured = working.indexOf("Featured Exhibition Cards", introAt);
  const looking = working.indexOf("\nLooking Ahead", introAt);
  let end = working.length;
  if (featured > introAt) end = Math.min(end, featured);
  if (looking > introAt) end = Math.min(end, looking);
  const usable = working.slice(introAt, end).replace(/^Gallery Introduction\s*/, "");
  return toMarkdown(usable.replace(/Timeline of Gallery[\s\S]*$/, ""));
}

const galleryBodies = {
  foundations: grabIntro("Gallery I \nFoundations of the American Musical"),
  "golden-age": grabIntro("Gallery II \nThe Golden Age of Broadway"),
  "grows-up": grabIntro("Gallery III \nBroadway Comes of Age"),
  sondheim: `Stephen Sondheim expanded what a Broadway musical could think, feel, and structurally dare to do. The cards in this gallery isolate works in which complexity, moral ambiguity, and formal experiment became the point—not a decoration around a conventional plot.

These productions ask audiences to follow ideas as closely as melody: obsession and injustice in *Sweeney Todd*, the cost of making art in *Sunday in the Park with George*, the ethics inside fairy tales in *Into the Woods*, and the darker side of American myth in *Assassins*. Together they show how Sondheim and his collaborators made musical theatre a form that could hold contradiction without resolving it too quickly.`,
  "mega-musicals": grabIntro("Gallery IV \nThe Era of the Mega-Musical"),
  disney: grabIntro("Gallery V \nBroadway Reimagined"),
  contemporary: grabIntro("Gallery VI \nA New Generation of Voices"),
  "new-broadway": grabIntro("Gallery VII \nThe Modern Broadway Renaissance"),
  today:
    grabIntro("Gallery VIII \nBroadway Reimagined") +
    "\n\n" +
    toMarkdown(
      sectionBetween(working, "The Revivals That Changed Broadway", "\n1. Company"),
    ),
  "living-history": toMarkdown(
    sectionBetween(working, "Gallery X \nBroadway as Living History", "\nEpilogue \nWhy Broadway Continues to Matter to Me"),
  ),
};

const THEMES = [
  { slug: "immigration", title: "Immigration", question: "Who Gets to Call America Home?" },
  { slug: "race", title: "Race", question: "Whose story is being told—and who is allowed to tell it?" },
  { slug: "war", title: "War", question: "What Happens When National History Becomes Personal?" },
  { slug: "politics", title: "Politics", question: "Who Gets to Write the National Story?" },
  { slug: "family", title: "Family", question: "What Does an American Family Look Like?" },
  { slug: "gender", title: "Gender", question: "Who Is Allowed to Want More?" },
  { slug: "technology", title: "Technology", question: "What Happens When the World Changes Faster Than We Do?" },
  { slug: "inequality", title: "Inequality", question: "Who Gets the American Dream?" },
];


function writeDir(rel) {
  const dir = join(root, rel);
  mkdirSync(dir, { recursive: true });
  for (const file of readdirSync(dir)) unlinkSync(join(dir, file));
  return dir;
}

const showsDir = writeDir("content/shows");
for (const show of uniqueShows) {
  const related = RELATED[show.slug] || [];
  const relatedYaml = related.length
    ? `\n${related.map((item) => `  - ${item}`).join("\n")}`
    : " []";
  const md = `---
title: ${yamlEscape(show.title)}
year: ${show.year}
gallery: ${show.gallery}
slug: ${show.slug}
credits: ${yamlEscape(show.credits)}
revival: ${show.revival}
playbillImage: ""
related:${relatedYaml}
---

${show.body}
`;
  writeFileSync(join(showsDir, `${show.slug}.md`), md);
}

const galleriesDir = writeDir("content/galleries");
for (const [slug, body] of Object.entries(galleryBodies)) {
  writeFileSync(
    join(galleriesDir, `${slug}.md`),
    `---
slug: ${slug}
---

${body.trim()}
`,
  );
}

const pagesDir = writeDir("content/pages");
const welcome = collapse(
  sectionBetween(working, "Welcome to The Broadway 80, an exhibition", "About This Exhibition"),
);
writeFileSync(
  join(pagesDir, "welcome.md"),
  `---
title: Welcome
---

Welcome to The Broadway 80, an exhibition ${welcome.trim()}
`,
);
writeFileSync(
  join(pagesDir, "about.md"),
  `---
title: About This Exhibition
---

${toMarkdown(sectionBetween(working, "About This Exhibition", "Exhibition Galleries"))}

## How to Experience This Exhibition

${toMarkdown(sectionBetween(working, "How to Experience This Exhibition", "A Personal Note"))}

## A Personal Note

${toMarkdown(sectionBetween(working, "A Personal Note", "Gallery I"))}
`,
);
writeFileSync(
  join(pagesDir, "epilogue.md"),
  `---
title: Epilogue
---

${toMarkdown(sectionBetween(working, "Epilogue \nWhy Broadway Continues to Matter to Me", "\nGallery I \nOrigins of the American Musical") || sectionBetween(working, "Why Broadway Continues to Matter to Me", "\nGallery I \nOrigins"))}
`,
);

const themesDir = writeDir("content/themes");
const themeSource = sectionBetween(working, "Gallery X \nBroadway as Living History", "\nEpilogue \nWhy Broadway Continues to Matter to Me");
for (const theme of THEMES) {
  const start = themeSource.search(new RegExp(`\\n${theme.title} \\n`));
  if (start < 0) continue;
  let end = themeSource.length;
  for (const other of THEMES) {
    if (other.slug === theme.slug) continue;
    const idx = themeSource.search(new RegExp(`\\n${other.title} \\n`));
    if (idx > start && idx < end) end = idx;
  }
  const mirror = themeSource.indexOf("\nThe Stage as an American Mirror", start);
  if (mirror > start && mirror < end) end = mirror;
  writeFileSync(
    join(themesDir, `${theme.slug}.md`),
    `---
title: ${yamlEscape(theme.title)}
question: ${yamlEscape(theme.question)}
slug: ${theme.slug}
---

${toMarkdown(themeSource.slice(start, end))}
`,
  );
}

writeFileSync(
  join(themesDir, "mirror.md"),
  `---
title: "Broadway Mirrors America"
question: "The Stage as a Record of a Changing Nation"
slug: "mirror"
---

${toMarkdown(sectionBetween(themeSource, "Section 1 \nBroadway Mirrors America", "\nImmigration \n"))}
`,
);
writeFileSync(
  join(themesDir, "changes-america.md"),
  `---
title: "Broadway Changes America"
question: "When the Stage Becomes Part of the Conversation"
slug: "changes-america"
---

${toMarkdown(sectionBetween(themeSource, "Section 2 \nBroadway Changes America", "\nEpilogue") || sectionBetween(working, "Section 2 \nBroadway Changes America", "\nEpilogue \nWhy Broadway"))}
`,
);

console.log(`Wrote ${uniqueShows.length} shows`);
console.log(uniqueShows.map((s) => `${s.gallery.padEnd(16)} ${s.year} ${s.slug}`).join("\n"));
