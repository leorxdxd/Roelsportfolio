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
const ACCENT = "#2563eb";
const NAME = "Roel Delos Reyes";
const INITIALS = "RD";
const TITLE = "IT Technical Support | Web &amp; Systems Developer";
const font = "Segoe UI, Inter, Helvetica, Arial, sans-serif";

const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${ACCENT}"/>
  <text x="32" y="41.5" text-anchor="middle" font-family="${font}" font-size="26" font-weight="700" fill="#fff" letter-spacing="0.5">${INITIALS}</text>
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
      background_color: "#ffffff",
      theme_color: ACCENT,
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
    <radialGradient id="g" cx="0.9" cy="0" r="0.9"><stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#ffffff"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="80" y="80" width="72" height="72" rx="16" fill="${ACCENT}"/>
  <text x="116" y="128" text-anchor="middle" font-family="${font}" font-size="30" font-weight="700" fill="#fff">${INITIALS}</text>
  <text x="80" y="300" font-family="${font}" font-size="76" font-weight="700" fill="#0f172a" letter-spacing="-2">${NAME}</text>
  <text x="80" y="370" font-family="${font}" font-size="34" font-weight="600" fill="${ACCENT}">${TITLE}</text>
  <text x="80" y="440" font-family="${font}" font-size="28" fill="#475569">IT support · Custom systems · Websites</text>
  <rect x="80" y="520" width="120" height="6" rx="3" fill="${ACCENT}"/>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(pub("og-image.png"));

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
