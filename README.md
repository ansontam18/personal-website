# Handoff: Anson Tam — Academic Personal Website

## Overview
A personal academic website for **Anson Tam**, a Senior Research Specialist (Predoctoral Fellow) in Economics at Princeton University. It is a single-page app with six hash-routed tabs: **Home, CV, Research, Teaching, Writing, Contact**. The aesthetic is clean, modern, minimal, all-sans-serif, with generous whitespace and Princeton orange used sparingly as the only accent color.

## About the Design Files
The files in this bundle are a **complete, working HTML/CSS/JS reference implementation** — not a throwaway mock. They run as-is in any browser (no build step, no dependencies beyond two Google Fonts). 

You can either:
- **Ship them directly** (it's a static site — host the folder on GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.), or
- **Recreate them** in a framework of your choice (Next.js, Astro, plain React, etc.) using the documentation below as the spec.

If recreating in an existing codebase, match its established patterns/libraries. If starting fresh, **Astro** or a static **Next.js** export is a natural fit given the content-driven, mostly-static nature of the site.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are all specified and implemented. Recreate pixel-for-pixel. All text content is **placeholder** (clearly marked with `[bracketed notes]` or labeled examples) and is meant to be replaced — but the *structure* and *styling* are final.

---

## Architecture

```
index.html              Shell: <header> nav + <main id="view"> + <footer>. Loads fonts, site.css, site.js.
assets/site.css         All styling. CSS custom properties at :root. No preprocessor.
assets/site.js          Content (as template-literal renderers) + hash router. Plain JS, no deps.
assets/anson-tam-cv.pdf Real CV (linked from CV tab as a download).
assets/anson-headshot.jpg  Home page portrait (1000×1250, 4:5).
assets/notes/*.md       Four downloadable ECON 101A section-notes markdown files.
```

**Routing model:** `site.js` defines `ROUTES = ["home","cv","research","teaching","writing","contact"]`. Each route maps to a render function returning an HTML string. On `hashchange` (and initial load), `render()` reads `location.hash`, injects `VIEWS[route]()` into `#view`, restarts a fade-in animation, sets the active tab, updates `document.title`, scrolls to top, and closes the mobile menu. Default route is `home`.

**To recreate in a framework:** each render function becomes a component/page; the hash router becomes the framework's router (file-based or otherwise). Content currently lives in JS arrays/objects at the top of each render function — lift these into data files / a CMS / MDX as appropriate.

---

## Design Tokens

All defined as CSS custom properties in `assets/site.css` `:root`:

| Token | Value | Use |
|---|---|---|
| `--bg` | `#fbfbfa` | Page background (warm off-white) |
| `--ink` | `#14140f` | Primary text (near-black) |
| `--ink-soft` | `#3c3c36` | Body / secondary text |
| `--muted` | `#797972` | Labels, meta, captions |
| `--line` | `#e7e7e1` | Borders, dividers |
| `--line-soft` | `#efefe9` | Lighter row dividers |
| `--orange` | `#e77500` | **Princeton orange** — the only accent |
| `--orange-deep` | `#c66400` | Hover/active orange |
| `--orange-tint` | `#fdf3e8` | Mobile active-tab background |
| `--maxw` | `1180px` | Content max width |
| `--pad` | `64px` (28px ≤900px) | Horizontal page padding |

**Typography**
- Headings & body: **Hanken Grotesk** (Google Fonts, weights 300–800; italic 400).
- Mono accents (eyebrows, labels, dates, section indices): **IBM Plex Mono** (weights 400, 500), uppercase, letter-spacing `.12em`, ~12px. Class `.mono`.
- Type scale (clamped, responsive):
  - Home h1: `clamp(48px, 6.4vw, 80px)`, weight 600, letter-spacing `-.035em`, line-height `.98`.
  - Page h1 (CV/Research/Teaching/Contact): `clamp(40px, 5vw, 60–62px)`, weight 600, letter-spacing `-.03em`.
  - Body/bio: 18–19px, line-height ~1.65, color `--ink-soft`, `text-wrap: pretty`.
  - Section heading (`.section-head h2`): 15px, weight 600.

**Radii:** cards/buttons 8–14px; chips/pills 999px; play button 50%.

**Shadows:** none — depth comes from 1px borders (`--line`) and subtle `translateY(-2px/-3px)` hover lifts.

**Selection:** `::selection { background: var(--orange); color: #fff; }`

---

## Screens / Views

### 1. Header (persistent)
- Sticky top, `backdrop-filter: blur(10px) saturate(1.4)`, 88%-opacity bg, 1px bottom border.
- Left: **wordmark** "Anson Tam" with an 8px orange dot, weight 600.
- Right: **nav.tabs** — six text links, 14.5px weight 500, `--muted` default. Active tab is orange with a 2px orange underline bar (`::after`). Hover → `--ink`.
- Mobile (≤900px): a "Menu" toggle button reveals the nav as a vertical accordion (`max-height` transition); active tab gets `--orange-tint` background instead of underline.

### 2. Home (`#home`)
- Two-column grid `1.32fr .68fr`, gap 72px, `align-items: start`.
- **Left:** mono eyebrow ("● Princeton University · 2025—"), oversized `<h1>` "Anson Tam", role line (21px, weight 500), bio paragraph, then a `<dl class="meta">` (130px label column) listing **Interests** and **Elsewhere** (link row: Email, CV, Google Scholar, GitHub, LinkedIn — underlined links that turn orange on hover).
- **Right:** `.portrait` — sticky (top 110px), `aspect-ratio: 4/5`, 8px radius, 1px border, holding `assets/anson-headshot.jpg` (`object-fit: cover`).
- Mobile: collapses to one column; portrait moves above text (`order: -1`), max-width 320px, non-sticky.

### 3. CV (`#cv`)
- Intentionally minimal: mono eyebrow, h1 "The full CV, as a PDF.", a lede line, and a **dark download button** (`.btn.cv-dl`) linking `assets/anson-tam-cv.pdf` with the `download` attribute. Button: `--ink` bg, `--bg` text → hover flips to orange bg/white. A small mono note below ("Last updated … · ~120 KB"). Max-width 620px.

### 4. Research (`#research`)
- `.page-head` (h1 "Research" + intro paragraph referencing the four interests).
- **Papers & projects** block: each `.paper` has a mono **status** row with a colored pip (orange = active, grey = draft/`.draft`), a 22px title, an authors line, an abstract, and a row of `.tag` links (PDF / SSRN / Slides etc.). Divided by 1px top borders.
- **Research interests** block: pill `.chip`s for Macroeconomics, International Economics, Behavioral Economics, Finance.

### 5. Teaching (`#teaching`)
- `.page-head` (h1 "Teaching" + intro).
- **Course** block: one feature card `.course.feature` — "ECON 101A — Microeconomic Theory", term line, description, and an orange role line (placeholder for Reader/Tutor/GSI).
- **Section notes** block: `.notes-list` of `.note` rows (130px mono section label | title | "Markdown ↓" tag). Each links a real `.md` file in `assets/notes/` with `download`. Hover shifts the row right 8px and turns the title orange.
- **Teaching videos** block: 2-col `.videos` grid of `.video` cards. Each has a 16:9 placeholder (`.video-ph`) with a circular orange ▶ play button and a "video — 16:9" mono label, then a mono kind label + title. **These are placeholders** — wire to real video embeds/links.

### 6. Writing (`#writing`)
- `.page-head` (h1 "Writing" + intro). 
- `.posts` list (max-width 760px): each `.post` is a 150px-date-column + content link with a 21px title and excerpt, plus an orange "→" arrow that fades in on hover (title also turns orange). **Placeholder posts** — currently link back to `#writing`; wire to real article pages/MDX.

### 7. Contact (`#contact`)
- Two-column grid `1.1fr .9fr`, gap 72px.
- **Left:** h1 "Get in touch", lede, and a large email link (`.big-mail`, clamp 22–30px, underlined, orange on hover).
- **Right:** `<dl>` (110px label column) — Office, Scholar, GitHub, LinkedIn, CV. Links underlined, orange on hover.

### Footer (persistent)
- 1px top border, muted 13.5px text: "© 2026 Anson Tam" (left) and "Princeton University · Department of Economics" (right).

---

## Interactions & Behavior
- **Routing:** hash-based. No full page reloads. Back/forward and deep links work (e.g. `/#research`).
- **Route transition:** on each render, `#view` plays `viewIn` — `opacity 0→1` + `translateY(8px→0)` over `.34s cubic-bezier(.22,.61,.36,1)`. The `.enter` class is removed ~420ms later so the idle state is stable (important: do **not** leave a `both`/`forwards` fill that keeps it at the start frame).
- **Hover states:** nav links, tag links, list links, buttons, chips, cards all have `.16s` color/background/transform transitions. Cards lift `translateY(-2px/-3px)`. Note rows slide right 8px. CV button arrow nudges down 2px.
- **Active tab** reflects the current route.
- **Downloads:** CV (PDF) and the four section notes (MD) use the `download` attribute.
- **Responsive:** single breakpoint at **900px** — grids collapse to one column, padding shrinks to 28px, nav becomes a toggle accordion, multi-column grids (videos, teaching) stack.
- **Reduced motion:** *(not yet implemented — recommend adding `@media (prefers-reduced-motion: reduce)` to disable `viewIn` and hover transforms.)*

## State Management
Minimal. The only "state" is the current route, derived entirely from `location.hash` — no client state store needed. In a framework, use the router; no global state library required.

## Assets
- `assets/anson-headshot.jpg` — Home portrait. **User-provided photo** of Anson at Sather Gate, UC Berkeley (Class of 2026). Original was 4000×6000 / 12 MB; cropped to 4:5 and compressed to 1000×1250 / ~150 KB for web. Original retained at `uploads/_DSC0289_2.jpg` in the project if a re-crop is needed.
- `assets/anson-tam-cv.pdf` — **User-provided CV.**
- `assets/notes/econ101a-section-0[1-4].md` — Four ECON 101A section-note markdown files with placeholder structure (topics, worked-example slots, practice problems).
- **Fonts:** Hanken Grotesk + IBM Plex Mono via Google Fonts `<link>` in `index.html`. (For production, consider self-hosting for performance/privacy.)
- **No icon library** — the few glyphs (●, ↓, →, ▶) are Unicode characters.

## Content TODO (placeholders to replace)
- Home: bio paragraph, real Email / Scholar / GitHub / LinkedIn URLs.
- Research: real paper titles, coauthors, abstracts, and link targets (currently `#`).
- Teaching: ECON 101A role + term; replace video placeholders with real embeds; fill in the `.md` note bodies.
- Writing: replace placeholder posts; decide whether posts open as real pages.
- Contact: office building/room, real social URLs, email (currently `anson@example.com`).

## Files in this bundle
- `index.html` — shell
- `assets/site.css` — all styles
- `assets/site.js` — content + router
- `assets/anson-tam-cv.pdf` — CV
- `assets/anson-headshot.jpg` — portrait
- `assets/notes/econ101a-section-01.md` … `-04.md` — section notes
