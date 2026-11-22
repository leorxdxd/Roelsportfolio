// Renders preview stills: node scripts/stills.mjs 0 40 90 ...  (frames) → out/stills/
// Another composition: node scripts/stills.mjs --id=SiteTour 0 120 300
import path from "node:path";
import fs from "node:fs";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const root = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const id = args.find((a) => a.startsWith("--id="))?.slice(5) ?? "Showreel";
const frames = args.filter((a) => !a.startsWith("--")).map(Number);
const outDir = path.join(root, "out/stills");
fs.mkdirSync(outDir, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const composition = await selectComposition({ serveUrl, id });
for (const frame of frames) {
  const output = path.join(outDir, `${id === "Showreel" ? "" : `${id}-`}f${String(frame).padStart(4, "0")}.png`);
  await renderStill({ serveUrl, composition, frame, output, scale: 0.5 });
  console.log("still", frame);
}
