// Copies a rendered video and a cover frame into the website (public/assets/showreel/):
//   node scripts/publish-to-site.mjs        → showreel.mp4 + poster.webp      (from out/showreel.mp4)
//   node scripts/publish-to-site.mjs tour   → site-tour.mp4 + site-tour.webp  (from out/site-tour.mp4)
// `npm run site` and `npm run tour:site` render first, then run this.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp"; // resolved from the website's node_modules
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const VIDEOS = {
  // Cover frames: pick any frame from `npm run studio`
  showreel: { id: "Showreel", from: "out/showreel.mp4", file: "showreel.mp4", poster: "poster.webp", frame: 346, compress: false },
  tour: { id: "SiteTour", from: "out/site-tour.mp4", file: "site-tour.mp4", poster: "site-tour.webp", frame: 371, compress: true },
};
const which = VIDEOS[process.argv[2] ?? "showreel"];
if (!which) throw new Error(`Unknown video "${process.argv[2]}". Use: ${Object.keys(VIDEOS).join(", ")}`);

const root = path.resolve(import.meta.dirname, "..");
const site = path.resolve(root, "../public/assets/showreel");
const video = path.join(root, which.from);

if (!fs.existsSync(video)) {
  console.error(`${which.from} not found. Render it first.`);
  process.exit(1);
}
fs.mkdirSync(site, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const composition = await selectComposition({ serveUrl, id: which.id });
const png = path.join(root, `out/${which.id}-poster.png`);
await renderStill({ serveUrl, composition, frame: which.frame, output: png });
await sharp(png).resize(1600, 900).webp({ quality: 80 }).toFile(path.join(site, which.poster));

const dest = path.join(site, which.file);
if (which.compress) {
  // Smaller file for the web (H.264 + AAC, starts playing before it has fully downloaded).
  // ffmpeg ships with Remotion; paths are quoted and no argument contains "," or "=" (Windows shell).
  const q = (s) => `"${s.split(path.sep).join("/")}"`;
  const r = spawnSync(
    "npx",
    ["remotion", "ffmpeg", "-y", "-loglevel", "error", "-i", q(video), "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", q(dest)],
    { cwd: root, shell: true, stdio: "inherit" },
  );
  if (r.status !== 0) throw new Error("ffmpeg failed");
} else {
  fs.copyFileSync(video, dest);
}

for (const f of [which.file, which.poster]) {
  const kb = fs.statSync(path.join(site, f)).size / 1024;
  console.log(`public/assets/showreel/${f}  ${kb > 1024 ? (kb / 1024).toFixed(1) + " MB" : Math.round(kb) + " KB"}`);
}
