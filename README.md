# Roel Delos Reyes: Business Portfolio

Personal business site for **IT Technical Support | Web & Systems Developer** services.
Built with **React + TypeScript + Vite + SCSS**. There's no UI framework and no backend.

**Pages:** Home · About · Services · Projects · Project case study (`/projects/<slug>`) · Demo Theater (`/demos`) · Contact

**Interactive features**
- Live, animated helpdesk dashboard in the hero (sample data) that shows the kind of systems you build
- Typing headline, scroll-reveal animations, animated counters, page transitions, tech marquee
- Cards that tilt toward the cursor with a spotlight effect
- **Ctrl/⌘ + K command palette** to jump to any page or project
- Light/dark mode (light by default; remembers the visitor's choice)
- Interactive "How I work" stepper, skills tabs, FAQ accordion, project filter + search
- **Demo Theater:** video player + playlist for every project demo (local MP4 or YouTube)
- **Showreel** on the Home page: a 35-second intro video with clickable chapters, a "Watch my reel"
  button in the hero, and a "Watch my showreel" command (made in code with Remotion, see [`video/`](video/))

**Quality**
- All projects and videos come from **one file**: [`src/data/projects.json`](src/data/projects.json)
- Videos load only when played; images are lazy-loaded with placeholders until real media is added
- Animations respect "reduce motion" settings and pause in background tabs
- SEO: per-page titles and descriptions, Open Graph/Twitter tags, JSON-LD, alt text
- Accessibility: skip link, full keyboard support, visible focus, WCAG AA contrast in both themes (axe: 0 violations on every page)

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
| About, values, services, process steps, skills, FAQ | [`src/data/content.ts`](src/data/content.ts) |
| Navigation pages | `pages` in [`src/data/site.ts`](src/data/site.ts) |
| Projects | [`src/data/projects.json`](src/data/projects.json) |
| Showreel (file paths, duration, chapters) | [`src/data/showreel.ts`](src/data/showreel.ts) |
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
     "highlights": [{ "label": "User roles", "value": "3" }],
     "features": ["Feature one", "Feature two"],
     "tech": ["PHP", "MySQL"],
     "thumbnail": "thumbnail.webp",
     "screenshots": [{ "file": "screenshot-1.webp", "caption": "Dashboard" }],
     "videos": [
       {
         "title": "Full walkthrough",
         "src": "demo.mp4",
         "poster": "poster.webp",
         "description": "What the viewer will see.",
         "duration": "2:45"
       }
     ],
     "links": { "live": "", "repo": "" }
   }
   ```

2. Create the folder `public/assets/projects/<slug>/` and add your media (see below).
3. Optional: run `npm run media:placeholders` to fill any gaps with placeholders.

The project automatically appears on Home, Projects, the footer, the command palette, and
(if it has videos) the Demo Theater.

## Adding demo videos

Each project has a `videos` list, so you can add **as many videos per project as you like**.
They show up on the project's page and on the **Demos** page (`/demos`) in a player with a playlist.

**Option A: upload an MP4 (best for short demos)**
1. Put the file in the project folder, e.g. `public/assets/projects/miromail/demo.mp4`
   (or `demo-2.mp4`, `demo-3.mp4`, …).
2. Add (or update) an entry in that project's `videos` list with `"src": "demo.mp4"`.
3. Add a cover image (`poster.webp`, 1280 × 720) and set `"poster": "poster.webp"`.
   Keep each MP4 **under 20 MB** (720p/1080p, H.264).

**Option B: YouTube (best for long or large videos)**
Upload the video to YouTube (Unlisted is fine) and paste the link as `src`:

```json
{ "title": "Full walkthrough", "src": "https://youtu.be/VIDEO_ID", "duration": "6:10" }
```

The poster is taken from YouTube automatically. The embed uses `youtube-nocookie.com` and only
loads when the visitor presses play.

Until a local MP4 exists, the player shows **"Demo video coming soon"** and the playlist shows a
**Soon** badge, so the site never looks broken.

### Media files per project

Put these in **`public/assets/projects/<slug>/`**:

| File | Size | Used for |
| --- | --- | --- |
| `thumbnail.webp` | 1200 × 750 (16:10) | Project card |
| `screenshot-1.webp`, `screenshot-2.webp`, … | 1600 × 1000 (16:10) | Screenshot gallery |
| `poster.webp`, `poster-2.webp`, … | 1280 × 720 (16:9) | Video cover images |
| `demo.mp4`, `demo-2.mp4`, … | 720p or 1080p, H.264, under 20 MB | Demo videos |

Current folders:

```
public/assets/projects/it-helpdesk-ticketing-system/   thumbnail, poster, poster-2, screenshot-1..3, demo.mp4, demo-2.mp4
public/assets/projects/ai-plagiarism-checker/          thumbnail, poster, screenshot-1..2, demo.mp4
public/assets/projects/miromail/                       thumbnail, poster, screenshot-1..3, demo.mp4
```

**Tip:** you can drop in PNG/JPG files with the same names (e.g. `screenshot-1.png`) and run
`npm run media:optimize`. They're converted to `.webp` (replacing the placeholder) and the originals
are moved to `media-originals/`, which is git-ignored.

If a file is missing, the site shows a neutral placeholder. If `demo.mp4` is missing, it shows
"Demo video coming soon".

---

## Showreel (intro video)

The showreel is a personal intro, **not a project demo**, so it isn't in `projects.json` or on the Demos page.
It lives in `public/assets/showreel/` (`showreel.mp4` + `poster.webp`) and appears on the Home page.

The video is built in code in [`video/`](video/) (Remotion). To change it and update the site:

```bash
cd video
npm install          # first time only
npm run studio       # preview and edit
npm run site         # render → copy showreel.mp4 + poster.webp into public/assets/showreel/
```

Then commit and push. If you change scene timing (`video/src/timeline.json`), update the chapter times in
[`src/data/showreel.ts`](src/data/showreel.ts). Photos, music and text are explained in [`video/README.md`](video/README.md).

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
  assets/showreel/          showreel video + poster
scripts/                image/placeholder/brand generators
video/                  Remotion project for the showreel (separate; not part of the site build)
src/
  data/                 site.ts, content.ts, projects.json (all content)
  components/           Navbar, CommandPalette, LiveDashboard, VideoPlayer, VideoTheater, Tabs, …
  pages/                Home, About, Services, Projects, ProjectDetail, Demos, Contact, NotFound
  lib/                  hooks, theme, video helpers
  styles/               design tokens + SCSS partials
```
