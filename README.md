# ashutoshkmr.github.io

Personal site and portfolio, built with [Astro](https://astro.build) and deployed
to GitHub Pages.

---

## ⚠️ One-time setup required before this goes live

The old site was plain HTML served straight from the repository root. This one is
built by GitHub Actions, so the Pages source has to change or **the site will 404
after merging**:

1. Go to **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, select **GitHub Actions**
   (it is currently set to *Deploy from a branch*).

That's it — every push to `master` then builds and deploys automatically via
`.github/workflows/deploy.yml`.

---

## Editing the content

**All content lives in [`src/data/profile.ts`](src/data/profile.ts).** Nothing
else needs touching to change what the site says — name, role, about, work
history, projects, stack, education, and links all come from that one file.

Any field still containing `TODO` is a placeholder. The build prints a warning
listing every one of them, so they can't ship unnoticed:

```
⚠  23 placeholders still in src/data/profile.ts:
   · role
   · tagline
   · work[0].company
   ...
```

Placeholder text is also kept out of the `<title>` and meta description, so an
early deploy won't put "TODO" into search results or link previews.

To replace the résumé, drop a new PDF at `public/resume.pdf`.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
```

| Command           | Does                                        |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                  |
| `npm run build`   | Production build to `dist/`                 |
| `npm run preview` | Serve the built site locally                |
| `npm run check`   | Type-check `.astro` and `.ts` files         |

## Structure

```
src/
├── data/profile.ts       ← all site content
├── layouts/Base.astro    ← <head>, SEO, theme script, scroll behaviour
├── components/           ← Hero, Work, Projects, Stack, Contact, …
├── styles/global.css     ← design tokens, typography, layout primitives
└── pages/
    ├── index.astro       ← the single page
    └── 404.astro
public/                   ← favicon, OG image, résumé, robots.txt
```

## Design notes

- **Typography-led, single column.** Section labels sit in a sticky left rail;
  content sits in a reading column capped at `68ch`.
- **Three-state theming.** Light and dark palettes follow the OS by default, and
  an explicit toggle overrides it (stored in `localStorage`). The theme is applied
  by an inline script before first paint, so there's no flash of the wrong theme.
- **Fonts are self-hosted** (Inter and JetBrains Mono, variable) — no external
  requests, so the site keeps working regardless of third-party availability.
- **Motion is optional.** Scroll reveals and the availability pulse are wrapped in
  `prefers-reduced-motion: no-preference`, and anything at or above the fold is
  revealed synchronously so a deep link never lands on a blank screen.
- **No client framework.** The only JavaScript shipped is the theme toggle and two
  IntersectionObservers.

## Regenerating the social image

`public/og.png` and `public/apple-touch-icon.png` are static images rendered from
the site's own fonts. They only need regenerating if the name or domain changes —
edit the images directly, or re-render them from an HTML template at 1200×630.
