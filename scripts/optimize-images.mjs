// Converts .png / .jpg / .jpeg images in public/assets/projects/** to
// compressed .webp (max 1600px wide), then moves the originals to
// media-originals/ (git-ignored) so they are not deployed.
//
//   npm run media:optimize
//
// Example: drop "screenshot-1.png" into public/assets/projects/miromail/,
// run this script, and you get "screenshot-1.webp" (replacing the placeholder).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const mediaDir = path.join(root, "public/assets/projects");
const originalsDir = path.join(root, "media-originals");
const MAX_WIDTH = 1600;

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let count = 0;
for (const file of walk(mediaDir)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const before = fs.statSync(file).size;

  await sharp(file)
    .rotate() // respect camera orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out + ".tmp");
  fs.renameSync(out + ".tmp", out);

  const dest = path.join(originalsDir, path.relative(mediaDir, file));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(file, dest);

  const after = fs.statSync(out).size;
  console.log(
    `${path.relative(root, out)}  ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`,
  );
  count++;
}
console.log(count ? `\nOptimized ${count} image(s). Originals moved to media-originals/.` : "No PNG/JPG files found.");
