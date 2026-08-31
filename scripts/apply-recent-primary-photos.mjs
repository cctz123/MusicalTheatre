import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, extname, join } from "node:path";

const root = process.cwd();
const sourceRoot = join(root, "49. Musical theatre shows/recent shows");

const TARGETS = [
  {
    source: "Harry Porter.JPG",
    destinations: ["public/archive/harry-potter-and-the-cursed-child/01.jpg"],
  },
  {
    source: "Into the Woods 2.HEIC",
    destinations: [
      "public/photos/into-the-woods/01.jpeg",
      "public/playbills/into-the-woods.jpeg",
      "public/photos/into-the-woods-2022/01.jpeg",
      "public/playbills/into-the-woods-2022.jpeg",
    ],
  },
  {
    source: "Lion king.JPG",
    destinations: [
      "public/photos/the-lion-king/01.jpg",
      "public/playbills/the-lion-king.jpg",
    ],
  },
  {
    source: "MJ 2.HEIC",
    destinations: ["public/photos/mj/01.jpeg", "public/playbills/mj.jpeg"],
  },
  {
    source: "School of Rock 2.HEIC",
    destinations: ["public/archive/school-of-rock/01.jpg"],
  },
  {
    source: "Smash 2.HEIC",
    destinations: ["public/archive/smash/01.jpg"],
  },
];

function copyImage(src, dest) {
  mkdirSync(dirname(join(root, dest)), { recursive: true });
  if (extname(src).toLowerCase() === ".heic") {
    execFileSync(
      "sips",
      ["-s", "format", "jpeg", "-s", "formatOptions", "90", src, "--out", join(root, dest)],
      { stdio: "pipe" },
    );
    return;
  }
  copyFileSync(src, join(root, dest));
}

for (const { source, destinations } of TARGETS) {
  const src = join(sourceRoot, source);
  if (!existsSync(src)) {
    console.error(`Missing source: ${src}`);
    process.exitCode = 1;
    continue;
  }
  for (const dest of destinations) {
    copyImage(src, dest);
    console.log(`  ${source} -> ${dest}`);
  }
}

console.log("\nApplied recent-show primary photos.");
