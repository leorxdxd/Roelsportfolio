// Turns a photo into the 3D hero portrait on the website's Home page:
//   public/assets/portrait/portrait.webp        the person cut out on a transparent background
//   public/assets/portrait/portrait-depth.webp  depth map (white = closer to the camera) for the 3D effect
//   src/data/portrait.json                      image size, read by the site
//
// Usage: npm run portrait -- path/to/photo.jpg
//        npm run portrait -- path/to/photo.jpg --crop-bottom 0.15   (cut 15% off the bottom first)
//
// Everything runs on this computer. The two models (MODNet for the cut-out, Depth Anything V2 small
// for depth) download once from Hugging Face and are cached in node_modules.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { AutoModel, AutoProcessor, pipeline, RawImage } from "@huggingface/transformers";

const args = process.argv.slice(2);
const input = args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? Number(args[i + 1]) : fallback;
};
if (!input || !fs.existsSync(input)) {
  console.error("Usage: npm run portrait -- path/to/photo.jpg [--crop-bottom 0.15] [--max 1500]");
  process.exit(1);
}

const cropBottom = flag("crop-bottom", 0);
const maxHeight = flag("max", 1500);
const site = path.resolve(import.meta.dirname, "../..");
const outDir = path.join(site, "public/assets/portrait");
fs.mkdirSync(outDir, { recursive: true });

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const gray = (buf, width, height) => sharp(buf, { raw: { width, height, channels: 1 } });

// 1. Load the photo (EXIF-rotated, optional bottom crop) as raw RGB
const meta = await sharp(input).rotate().metadata();
const srcW = meta.autoOrient?.width ?? meta.width;
const srcH = meta.autoOrient?.height ?? meta.height;
const { data: rgb, info } = await sharp(input)
  .rotate()
  .extract({ left: 0, top: 0, width: srcW, height: Math.round(srcH * (1 - cropBottom)) })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const N = W * H;
const image = new RawImage(new Uint8ClampedArray(rgb), W, H, 3);
console.log(`Photo ${W}x${H}`);

// 2. Cut-out. MODNet's matte has small steps along the edges, so it is averaged down
//    and scaled back up smoothly, blurred (compressed photos have blocky edges), then sharpened
//    into a clean edge that sits slightly inside the outline, so no background fringe shows.
//    --smooth 2 smooths more, --smooth 0.5 less.
console.log("Cutting out the person (MODNet)…");
const modnet = await AutoModel.from_pretrained("Xenova/modnet", { dtype: "fp32" });
const processor = await AutoProcessor.from_pretrained("Xenova/modnet");
const { output } = await modnet({ input: (await processor(image)).pixel_values });
const [, , mh, mw] = output.dims;
const matte = Buffer.from(Uint8Array.from(output.data, (v) => Math.round(Math.min(1, Math.max(0, v)) * 255)));
const smallMatte = await gray(matte, mw, mh).resize(Math.round(mw / 4), Math.round(mh / 4)).extractChannel(0).raw().toBuffer();
const soft = await gray(smallMatte, Math.round(mw / 4), Math.round(mh / 4))
  .resize(W, H, { kernel: "cubic" })
  .blur(Math.max(0.3, (flag("smooth", 1) * W) / 160))
  .extractChannel(0)
  .raw()
  .toBuffer();
const alpha = new Uint8Array(N);
for (let i = 0; i < N; i++) alpha[i] = Math.round(255 * smoothstep(0.45, 0.8, soft[i] / 255));

// 3. Depth
console.log("Estimating depth (Depth Anything V2 small)…");
const estimator = await pipeline("depth-estimation", "onnx-community/depth-anything-v2-small", { dtype: "fp32" });
const { depth } = await estimator(image);
const raw = depth.width === W && depth.height === H ? depth.data : (await depth.resize(W, H)).data;

// The model tends to put the bottom of a portrait (the chest) closest. Remove that top-to-bottom
// slope so the face keeps its own shape, then add a rounded "volume" from the outline so the
// edges sit further back than the middle.
let n = 0, sy = 0, sd = 0, syy = 0, syd = 0;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (alpha[i] < 128) continue;
    n++; sy += y; sd += raw[i]; syy += y * y; syd += y * raw[i];
  }
const slope = (n * syd - sy * sd) / Math.max(1, n * syy - sy * sy);
const flat = new Float32Array(N);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) flat[y * W + x] = raw[y * W + x] - slope * y;

const inside = [];
for (let i = 0; i < N; i++) if (alpha[i] >= 128) inside.push(flat[i]);
inside.sort((a, b) => a - b);
const lo = inside[Math.floor(inside.length * 0.03)];
const hi = inside[Math.floor(inside.length * 0.97)];

// Chamfer distance to the background (outside the image counts as "inside" the person, so the
// cut through the chest at the bottom doesn't become an edge)
const BIG = 1e9;
const dist = new Float32Array(N);
for (let i = 0; i < N; i++) dist[i] = alpha[i] >= 128 ? BIG : 0;
const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? BIG : dist[y * W + x]);
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (!dist[i]) continue;
    dist[i] = Math.min(dist[i], at(x - 1, y) + 1, at(x, y - 1) + 1, at(x - 1, y - 1) + 1.414, at(x + 1, y - 1) + 1.414);
  }
for (let y = H - 1; y >= 0; y--)
  for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x;
    if (!dist[i]) continue;
    dist[i] = Math.min(dist[i], at(x + 1, y) + 1, at(x, y + 1) + 1, at(x + 1, y + 1) + 1.414, at(x - 1, y + 1) + 1.414);
  }

const radius = W * 0.1;
const depthOut = new Uint8Array(N);
for (let i = 0; i < N; i++) {
  const model = Math.min(1, Math.max(0, (flat[i] - lo) / Math.max(1e-6, hi - lo)));
  const volume = Math.sqrt(smoothstep(0, radius, Math.min(dist[i], radius)));
  depthOut[i] = Math.round(255 * (0.55 * model + 0.45 * volume) * (alpha[i] / 255));
}

// 4. Crop to the person, keeping the bottom edge
let minX = W, maxX = 0, minY = H;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++)
    if (alpha[y * W + x] > 40) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
    }
const pad = Math.round(H * 0.03);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const crop = { left, top, width: Math.min(W, maxX + pad + 1) - left, height: H - top };

// 5. Size: large photos are scaled down, small ones up (keeps the 3D effect smooth)
const scale = Math.min(maxHeight / crop.height, Math.max(1, 1000 / crop.height), 2.5);
const outW = Math.round(crop.width * scale);
const outH = Math.round(crop.height * scale);

const rgba = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  rgba[i * 4] = rgb[i * 3];
  rgba[i * 4 + 1] = rgb[i * 3 + 1];
  rgba[i * 4 + 2] = rgb[i * 3 + 2];
  rgba[i * 4 + 3] = alpha[i];
}
const colour = sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).extract(crop).resize(outW, outH, { kernel: "lanczos3" });
if (scale > 1.2) colour.sharpen({ sigma: 0.8 });
await colour.webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(path.join(outDir, "portrait.webp"));

await gray(Buffer.from(depthOut), W, H)
  .extract(crop)
  .resize(outW, outH)
  .blur(Math.max(1.5, outW / 180))
  .webp({ quality: 92 })
  .toFile(path.join(outDir, "portrait-depth.webp"));

fs.writeFileSync(path.join(site, "src/data/portrait.json"), JSON.stringify({ width: outW, height: outH }, null, 2) + "\n");

for (const f of ["portrait.webp", "portrait-depth.webp"])
  console.log(`public/assets/portrait/${f}  ${outW}x${outH}  ${Math.round(fs.statSync(path.join(outDir, f)).size / 1024)} KB`);
