import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pdfPath = join(root, "Music Theatre Exhibition Gallery .pdf");
const outDir = join(root, "scripts");
const outPath = join(outDir, "pdf-extract.txt");

const buffer = readFileSync(pdfPath);
const data = await pdfParse(buffer);
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, data.text);
console.log(`Wrote ${data.numpages} pages, ${data.text.length} chars to ${outPath}`);
