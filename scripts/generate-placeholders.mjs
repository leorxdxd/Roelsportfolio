// Creates placeholder images for every project in src/data/projects.json.
// Existing files are NEVER overwritten, so your real media is safe.
//
//   npm run media:placeholders
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { placeholderSvg } from "./lib/placeholder-svg.mjs";

const root = path.resolve(import.meta.dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "src/data/projects.json"), "utf8"));

const SIZES = {
  thumbnail: [1200, 750],
  poster: [1280, 720],
  screenshot: [1600, 1000],
};

async function write(file, opts) {
  if (fs.existsSync(file)) return console.log(`  skip   ${path.relative(root, file)} (exists)`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(placeholderSvg(opts))).webp({ quality: 82 }).toFile(file);
  console.log(`  create ${path.relative(root, file)}`);
}

// Generic fallback used by the site whenever an image is missing
await write(path.join(root, "public/assets/placeholder.webp"), {
  width: 1600,
  height: 1000,
  label: "Image coming soon",
});

for (const p of projects) {
  const dir = path.join(root, "public/assets/projects", p.slug);
  console.log(`\n${p.title}`);
  await write(path.join(dir, p.thumbnail), {
    width: SIZES.thumbnail[0],
    height: SIZES.thumbnail[1],
    title: p.title,
    label: p.category,
  });
  for (const [i, v] of (p.videos ?? []).entries()) {
    if (!v.poster || /^https?:/i.test(v.poster)) continue;
    await write(path.join(dir, v.poster), {
      width: SIZES.poster[0],
      height: SIZES.poster[1],
      title: v.title,
      label: `Demo video ${i + 1}`,
    });
  }
  for (const [i, s] of (p.screenshots ?? []).entries()) {
    await write(path.join(dir, s.file), {
      width: SIZES.screenshot[0],
      height: SIZES.screenshot[1],
      title: s.caption,
      label: `Screenshot ${i + 1}`,
    });
  }
}
console.log("\nDone.");
