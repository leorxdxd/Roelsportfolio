// Copies the rendered showreel and a poster frame into the website:
//   ../public/assets/showreel/showreel.mp4
//   ../public/assets/showreel/poster.webp
// Run with `npm run site` (renders first) or `node scripts/publish-to-site.mjs` (uses out/showreel.mp4).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp"; // resolved from the website's node_modules
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

// Frame used as the cover image ("Hi, I'm Roel." scene). Pick any frame from `npm run studio`.
const POSTER_FRAME = 346;

const root = path.resolve(import.meta.dirname, "..");
const site = path.resolve(root, "../public/assets/showreel");
const video = path.join(root, "out/showreel.mp4");

if (!fs.existsSync(video)) {
  console.error("out/showreel.mp4 not found. Run `npm run render` first (or `npm run site`).");
  process.exit(1);
}
fs.mkdirSync(site, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "Showreel" });
const png = path.join(root, "out/poster.png");
await renderStill({ serveUrl, composition, frame: POSTER_FRAME, output: png });
await sharp(png).resize(1600, 900).webp({ quality: 80 }).toFile(path.join(site, "poster.webp"));
fs.copyFileSync(video, path.join(site, "showreel.mp4"));

for (const f of ["showreel.mp4", "poster.webp"]) {
  const kb = fs.statSync(path.join(site, f)).size / 1024;
  console.log(`public/assets/showreel/${f}  ${kb > 1024 ? (kb / 1024).toFixed(1) + " MB" : Math.round(kb) + " KB"}`);
}
