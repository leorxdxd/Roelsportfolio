// Generates favicons, app icons, the social-share (Open Graph) image, and the
// optimized profile photo.
//
//   npm run media:brand                       -> icons + OG image
//   npm run media:brand -- path/to/photo.png  -> also (re)creates public/assets/profile.webp
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pub = (p) => path.join(root, "public", p);
// Brand colors (same as src/styles/_tokens.scss)
const LIME = "#d4f54a";
const INK = "#111111";
const PAPER = "#f4f4f0";
const NAME = "Roel Delos Reyes";
const INITIALS = "RD";
const TITLE = "Software Developer";
const SUBTITLE = "Web apps · Business systems · IT support";
// Screenshot shown on the right of the social-share image (skipped if missing).
const OG_SHOT = "assets/projects/apartment-management-system/screenshot-1.webp";
const font = "Schibsted Grotesk, Segoe UI, Helvetica, Arial, sans-serif";
const mono = "JetBrains Mono, Cascadia Mono, Consolas, monospace";

const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${LIME}"/>
  <rect x="1.5" y="1.5" width="61" height="61" rx="10.5" fill="none" stroke="${INK}" stroke-width="3"/>
  <text x="32" y="40.5" text-anchor="middle" font-family="${mono}" font-size="23" font-weight="700" fill="${INK}">${INITIALS}</text>
</svg>`;

fs.writeFileSync(pub("favicon.svg"), iconSvg(64));
await sharp(Buffer.from(iconSvg(32))).png().toFile(pub("favicon-32.png"));
await sharp(Buffer.from(iconSvg(180))).png().toFile(pub("apple-touch-icon.png"));
await sharp(Buffer.from(iconSvg(192))).png().toFile(pub("icon-192.png"));
await sharp(Buffer.from(iconSvg(512))).png().toFile(pub("icon-512.png"));

fs.writeFileSync(
  pub("manifest.webmanifest"),
  JSON.stringify(
    {
      name: NAME,
      short_name: "Roel D.R.",
      start_url: ".",
      display: "standalone",
      background_color: PAPER,
      theme_color: PAPER,
      icons: [
        { src: "icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ) + "\n",
);

// Open Graph image (1200x630)
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${INK}" stroke-opacity="0.06"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="80" y="80" width="64" height="64" rx="10" fill="${LIME}" stroke="${INK}" stroke-width="2.5"/>
  <text x="112" y="121" text-anchor="middle" font-family="${mono}" font-size="23" font-weight="700" fill="${INK}">${INITIALS}</text>
  <text x="80" y="292" font-family="${font}" font-size="60" font-weight="700" fill="${INK}" letter-spacing="-2">${NAME}</text>
  <rect x="74" y="318" width="330" height="50" fill="${LIME}"/>
  <text x="80" y="356" font-family="${font}" font-size="36" font-weight="700" fill="${INK}" letter-spacing="-0.8">${TITLE}</text>
  <text x="80" y="418" font-family="${mono}" font-size="18" fill="#4a4a45">${SUBTITLE}</text>
</svg>`;
const layers = [];
if (fs.existsSync(pub(OG_SHOT))) {
  const w = 600;
  const h = 375;
  const left = 560;
  const top = 128;
  const shot = await sharp(pub(OG_SHOT)).resize(w, h).toBuffer();
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="16"/></svg>`);
  const rounded = await sharp(shot).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  const shadow = await sharp(
    Buffer.from(`<svg width="${w + 80}" height="${h + 80}"><rect x="40" y="40" width="${w}" height="${h}" rx="16" fill="${INK}" fill-opacity="0.3"/></svg>`),
  )
    .blur(18)
    .png()
    .toBuffer();
  layers.push({ input: shadow, left: left - 40, top: top - 26 }, { input: rounded, left, top });
}
await sharp(Buffer.from(og)).composite(layers).png({ compressionLevel: 9 }).toFile(pub("og-image.png"));

// Optional: profile photo
const photo = process.argv[2];
if (photo) {
  fs.mkdirSync(pub("assets"), { recursive: true });
  await sharp(photo)
    .rotate()
    .resize({ width: 640, height: 800, fit: "cover", position: "top", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(pub("assets/profile.webp"));
  console.log("Created public/assets/profile.webp");
}

console.log("Brand assets generated in public/.");
