// Renders the project screenshots, thumbnails and video posters into the website:
//   public/assets/projects/<project-slug>/<file>.webp
// Usage: npm run images              (all)
//        npm run images -- miromail  (only ids containing "miromail")
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp"; // resolved from the website's node_modules
import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";

const root = path.resolve(import.meta.dirname, "..");
const site = path.resolve(root, "../public/assets/projects");
const tmp = path.join(root, "out/images");
const filters = process.argv.slice(2);
fs.mkdirSync(tmp, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const comps = (await getCompositions(serveUrl)).filter((c) => c.id.includes("--") && (!filters.length || filters.some((f) => c.id.includes(f))));

for (const composition of comps) {
  const [slug, file] = composition.id.split("--");
  const png = path.join(tmp, `${composition.id}.png`);
  await renderStill({ serveUrl, composition, output: png });
  const dest = path.join(site, slug, `${file}.webp`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(png).webp({ quality: 86 }).toFile(dest);
  console.log(`${slug}/${file}.webp  ${Math.round(fs.statSync(dest).size / 1024)} KB`);
}
