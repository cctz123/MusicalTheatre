import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const require = createRequire("/tmp/git-tools/package.json");
const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const ignore = require("ignore");

const dir = "/Users/mariana/Documents/Cursor/musical-theatre";
const tmp = "/tmp/musicaltheatre-origin";
const url = "https://github.com/cctz123/MusicalTheatre.git";
const gh = `${process.env.HOME}/.local/bin/gh`;
const token = execSync(`"${gh}" auth token`, { encoding: "utf8" }).trim();
const onAuth = () => ({ username: "cctz123", password: token });

const ig = ignore();
ig.add(fs.readFileSync(path.join(dir, ".gitignore"), "utf8"));
ig.add(".git");

function walk(current, acc = []) {
  for (const ent of fs.readdirSync(current, { withFileTypes: true })) {
    if (ent.name === ".git") continue;
    const abs = path.join(current, ent.name);
    const rel = path.relative(dir, abs);
    if (ig.ignores(rel) || ig.ignores(`${rel}/`)) continue;
    if (ent.isDirectory()) walk(abs, acc);
    else acc.push(rel.split(path.sep).join("/"));
  }
  return acc;
}

if (fs.existsSync(tmp)) fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(tmp, { recursive: true });

console.log("cloning existing GitHub repo...");
await git.clone({ fs, http, dir: tmp, url, onAuth, singleBranch: true });

if (fs.existsSync(path.join(dir, ".git"))) {
  fs.rmSync(path.join(dir, ".git"), { recursive: true, force: true });
}
fs.cpSync(path.join(tmp, ".git"), path.join(dir, ".git"), { recursive: true });

const files = walk(dir);
console.log(`staging ${files.length} files...`);
for (const filepath of files) {
  await git.add({ fs, dir, filepath });
}

const sha = await git.commit({
  fs,
  dir,
  message: "Add My Broadway digital exhibition",
  author: {
    name: "cctz123",
    email: "cctz123@users.noreply.github.com",
  },
});
console.log("committed", sha);

console.log("pushing to origin/main...");
await git.push({
  fs,
  http,
  dir,
  remote: "origin",
  ref: "main",
  onAuth,
});
console.log("push complete");
