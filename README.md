# ashutoshkmr.github.io

Personal site and résumé for [Ashutosh Kumar](https://ashutoshkmr.github.io) —
an Astro static site deployed to GitHub Pages.

Every push to `master` builds and deploys automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Pages is set to
**GitHub Actions** as its source; there is nothing to click after a push.

## Editing the content

**All content lives in [`src/data/profile.ts`](src/data/profile.ts).** Nothing
else needs touching to change what the site says — name, role, about, work
history, projects, stack, education and links all come from that one file, and
the résumé is built from it too.

A few conventions worth knowing:

| Field | Notes |
| --- | --- |
| `tagline` | The hero line. A fragment, not a sentence. |
| `seoDescription` | Separate from `tagline` because a fragment makes a poor search snippet. Aim for 120–155 characters. |
| `summary` | Résumé only. Kept deliberately distinct from `about` so reading both never shows the same sentence twice. |
| `phone` | Résumé only, never on the site. `/resume` and `/resume.pdf` are both public, so set it to `null` if you would rather it not be. |
| `availability` | A string shows the pill in the hero; `null` hides it. |
| `highlights` | Three to five bullets per role, strongest first. Renders on both the site and the résumé. |

Anything containing `TODO` is a placeholder. The build prints a warning listing
every one, and placeholder text is kept out of the `<title>` and meta
description so an early deploy cannot leak it into search results.

### A note on what goes in

Client work is described by outcome and general technique, not by product
internals. Client and partner names, product constraints, internal feature
names and specific algorithm choices are deliberately absent. Keep it that way
when editing — a portfolio is a public document.

## The résumé

The résumé is **generated from the same `profile.ts`**, so it cannot drift from
the site. [`src/pages/resume.astro`](src/pages/resume.astro) renders it as a
print-optimised A4 page at `/resume`, and `public/resume.pdf` is that page
printed to PDF.

Regenerating is one command (needs Node ≥ 22.18 and a local Chrome — set
`CHROME_PATH` if it lives somewhere unusual):

```bash
npm run build && npm run resume
```

[`scripts/build-resume.mjs`](scripts/build-resume.mjs) serves the built site,
prints `/resume` (A4) and `/resume-letter` (US Letter) with headless Chrome,
stamps author/subject/keyword metadata from `profile.ts`, and builds the Word
version with [`scripts/resume-docx.mjs`](scripts/resume-docx.mjs). Three
artifacts, one source:

| File | For |
| --- | --- |
| `/resume.pdf` | Default — A4 |
| `/resume-letter.pdf` | US-based applications — Letter, tightened spacing to hold two pages |
| `/resume.docx` | Systems that parse Word best — no tables, real bullet numbering, hyperlinked contacts |

**The deploy workflow runs the same script on every push**, so the served files
are always generated from the same `profile.ts` as the deployed site — the
committed copies only matter for local dev. The `/resume` page links all three.

Manual fallback: `npm run dev`, open <http://localhost:4321/resume>, hit
**Print / Save as PDF**, save over `public/resume.pdf`.

The output is what applicant tracking systems parse best: a tagged PDF of real
selectable text in a single column with standard section headings, en-dash date
ranges, text-layer bullet glyphs, clickable contact links, and a classic
(uncompressed) xref that pre-1.5 parsers can read.

**Type size** is a set of custom properties (`--pt-body`, `--pt-meta`, …) at the
top of the stylesheet in `resume.astro`. Change those to rescale the whole
document in proportion rather than editing sizes individually. If a change
pushes it to three pages, tighten the spacing values below them before reaching
for smaller type.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
```

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Type-check `.astro` and `.ts` files |

## Structure

```
src/
├── data/profile.ts       ← all content, for both the site and the résumé
├── layouts/Base.astro    ← <head>, SEO, theme script, scroll behaviour
├── components/           ← Hero, Work, Projects, Stack, Contact, …
├── styles/global.css     ← design tokens, typography, layout primitives
└── pages/
    ├── index.astro       ← the site
    ├── resume.astro          ← /resume, A4 (renders ResumeSheet)
    ├── resume-letter.astro   ← /resume-letter, US Letter
    └── 404.astro
scripts/
├── build-resume.mjs      ← prints both PDFs via Chrome, then builds the DOCX
└── resume-docx.mjs       ← resume.docx from profile.ts (docx-js)
public/                   ← favicon, OG image, résumé PDF/DOCX, robots.txt
```

## Design notes

- **Typography-led, single column.** Section labels sit in a sticky left rail;
  content sits in a reading column capped at `68ch`.
- **Three-state theming.** Light and dark follow the OS by default, and an
  explicit toggle overrides it in both directions (stored in `localStorage`).
  Applied by an inline script before first paint, so there is no flash of the
  wrong theme.
- **Fonts are self-hosted** (Inter and JetBrains Mono, variable) — no external
  requests, so the site keeps working regardless of third-party availability.
- **Motion is optional.** Everything is wrapped in
  `prefers-reduced-motion: no-preference`, and content at or above the fold is
  revealed synchronously so a deep link like `/#contact` never lands on a blank
  screen.
- **No client framework.** The only JavaScript shipped is the theme toggle and
  two IntersectionObservers, both inlined.

### Why the data file uses explicit type annotations

`work`, `projects`, `stack` and `education` are annotated (`const work: Job[]`)
rather than checked with `satisfies`. `satisfies` narrows to the literal shape,
so the moment no entry happens to use an optional field — `highlights`, say —
that field disappears from the inferred type and every component reading it
stops compiling. Keep the annotations.

## Regenerating the social image

`public/og.png` and `public/apple-touch-icon.png` are static images rendered
from the site's own fonts at 1200×630 and 180×180. They only need regenerating
if the name or domain changes.
