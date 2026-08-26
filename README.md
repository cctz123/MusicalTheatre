# The Broadway 80

A digital museum of American musical theatre, adapted from the exhibition manuscript in this folder.

## Run locally

This project needs Node.js. If `npm` is not found, add it to your PATH first (Node is installed at `~/.local/node` on this machine):

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm run dev
```

Or run:

```bash
./scripts/dev.sh
```

Open [http://localhost:3000](http://localhost:3000).

## Add playbills

Drop a photo or scan into `public/playbills/` using the show slug as the filename:

```
public/playbills/hamilton.jpg
public/playbills/show-boat.png
```

Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`.

## Content

Exhibition essays live in `content/shows`, gallery introductions in `content/galleries`, and Gallery X in `content/themes`. To regenerate from the source PDF:

```bash
npm run extract
node scripts/split-content.mjs
```
