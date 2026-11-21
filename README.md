# Roel Delos Reyes: Business Portfolio

Personal business site for **IT Technical Support | Web & Systems Developer** services.
Built with **React + TypeScript + Vite + SCSS**. There's no UI framework and no backend.

- Sticky navigation, smooth scrolling, fully responsive (mobile, tablet, desktop)
- Sections: Hero, About, Services, Projects, Skills, Contact
- Each project has its own page (`/projects/<slug>`) with an overview, features, tech stack, a screenshot gallery (lightbox), and a demo video
- All projects come from **one file**: [`src/data/projects.json`](src/data/projects.json)
- Lazy-loaded images and videos, with clean placeholders until real media is added
- SEO: title, meta description, Open Graph/Twitter tags, JSON-LD, alt text on every image
- Accessibility: skip link, keyboard-friendly menu and lightbox, visible focus states, WCAG AA contrast (checked with axe: 0 violations)

---

## Run locally

Requires **Node.js 20.19+** (22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run media:placeholders` | Create placeholder images for any project media that's missing (never overwrites) |
| `npm run media:optimize` | Convert PNG/JPG in `public/assets/projects/` to compressed WebP |
| `npm run media:brand` | Regenerate favicons, app icons and the social share image (`-- path/to/photo.png` also updates the profile photo) |

---

## Where to edit things

| What | File |
| --- | --- |
| Name, title, email, phone, social links | [`src/data/site.ts`](src/data/site.ts) |
| About, Services, Skills text | [`src/data/content.ts`](src/data/content.ts) |
| Projects | [`src/data/projects.json`](src/data/projects.json) |
| Colors, spacing, fonts | [`src/styles/_tokens.scss`](src/styles/_tokens.scss) |
| SEO / social tags | [`index.html`](index.html) and [`.env`](.env) (`VITE_SITE_URL`) |

> **Phone number:** `phone` in `site.ts` is empty, so the site hides it. Fill it in to show it.

---

## Adding a project (no layout changes needed)

1. Add an entry to `src/data/projects.json`:

   ```json
   {
     "slug": "inventory-system",
     "title": "Inventory Management System",
     "category": "Custom System",
     "summary": "One or two sentences shown on the card.",
     "builtFor": "A small retail business",
     "role": "Design & full-stack development",
     "overview": ["Paragraph 1", "Paragraph 2"],
     "features": ["Feature one", "Feature two"],
     "tech": ["PHP", "MySQL"],
     "thumbnail": "thumbnail.webp",
     "screenshots": [{ "file": "screenshot-1.webp", "caption": "Dashboard" }],
     "video": { "file": "demo.mp4", "poster": "poster.webp" },
     "links": { "live": "", "repo": "" }
   }
   ```

2. Create the folder `public/assets/projects/<slug>/` and add your media (see below).
3. Optional: run `npm run media:placeholders` to fill any gaps with placeholders.

### Media files per project

Put these in **`public/assets/projects/<slug>/`**:

| File | Size | Used for |
| --- | --- | --- |
| `thumbnail.webp` | 1200 × 750 (16:10) | Project card |
| `screenshot-1.webp`, `screenshot-2.webp`, … | 1600 × 1000 (16:10) | Screenshot gallery |
| `poster.webp` | 1280 × 720 (16:9) | Video cover image |
| `demo.mp4` | 720p or 1080p, H.264, under 20 MB | Demo video |

Current folders:

```
public/assets/projects/it-helpdesk-ticketing-system/   thumbnail, poster, screenshot-1..3, demo.mp4
public/assets/projects/ai-plagiarism-checker/          thumbnail, poster, screenshot-1..2, demo.mp4
public/assets/projects/miromail/                       thumbnail, poster, screenshot-1..3, demo.mp4
```

**Tip:** you can drop in PNG/JPG files with the same names (e.g. `screenshot-1.png`) and run
`npm run media:optimize`. They're converted to `.webp` (replacing the placeholder) and the originals
are moved to `media-originals/`, which is git-ignored.

If a file is missing, the site shows a neutral placeholder. If `demo.mp4` is missing, it shows
"Demo video coming soon".

---

## Privacy rules (important)

Everything in this repo is public once deployed.

- **No real client, school, or company names, logos, emails, or ID numbers.** Use generic labels
  like "a local school" or "a small business".
- **Screenshots and videos must use dummy data** ("Sample School", "Juan Dela Cruz",
  `juan@example.com`). Check browser tabs, URL bars, sidebars and profile pictures for real names
  before you capture anything.
- **Never commit passwords, API keys, or credentials.** `.env` is committed and must only
  contain public values. Put secrets (if ever needed) in `.env.local`, which is git-ignored.
- Before adding a GitHub repo link to a project, check that the repo itself has no real data or secrets.

---

## Deploy

### Netlify (recommended)

The repo already includes [`netlify.toml`](netlify.toml) (build settings, caching, security headers)
and `public/_redirects` (so `/projects/...` URLs work on refresh).

1. Push to GitHub.
2. In Netlify: **Add new site → Import an existing project →** pick this repo.
   Build command `npm run build`, publish directory `dist` (filled in automatically).
3. After the first deploy, set your real URL in [`.env`](.env) → `VITE_SITE_URL=https://your-site.netlify.app`
   and push again, so canonical and social-share tags point to the right address.
4. **Contact form:** it uses **Netlify Forms** (no backend, no API key). Submissions appear in
   Netlify under **Forms → contact**. Turn on email notifications there
   (**Site configuration → Forms → Form notifications**).

### GitHub Pages (alternative)

GitHub Pages serves the site from `/Roelsportfolio/`, so use the GitHub Pages build:

```bash
npm run build:gh   # builds with the right base path and adds a 404.html fallback for routing
```

Then publish `dist/` with a GitHub Actions workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: { name: github-pages }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build:gh
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - uses: actions/deploy-pages@v4
```

In the repo settings, set **Pages → Source → GitHub Actions**. Set
`VITE_SITE_URL=https://leorxdxd.github.io/Roelsportfolio` in `.env`.

> Note: the contact form needs Netlify. On GitHub Pages the form shows an error with your email
> address as a fallback. To fix that, swap the form `fetch` in `src/sections/Contact.tsx` for a
> service such as Formspree.

---

## Project structure

```
index.html              SEO tags, fonts, hidden Netlify form
public/                 favicon, icons, og-image, robots, _redirects
  assets/profile.webp
  assets/placeholder.webp
  assets/projects/<slug>/   project media
scripts/                image/placeholder/brand generators
src/
  data/                 site.ts, content.ts, projects.json (all content)
  components/           Navbar, Footer, Icon, ProjectCard, DemoVideo, ScreenshotGallery, …
  sections/             Hero, About, Services, Projects, Skills, Contact
  pages/                Home, ProjectDetail, NotFound
  styles/               design tokens + SCSS partials
```
