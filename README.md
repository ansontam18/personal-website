# Anson Tam — Academic Personal Website

## Overview
A personal academic website for **Anson Tam**, a Senior Research Specialist (Predoctoral Fellow) in Economics at Princeton University. It is a single-page app with six hash-routed tabs: **Home, CV, Research, Teaching, Writing, Contact**. 

## About the Design Files
The files in this bundle are a **complete, working HTML/CSS/JS reference implementation** — not a throwaway mock. They run as-is in any browser (no build step, no dependencies beyond two Google Fonts). 

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

## Files in this bundle
- `index.html` — shell
- `assets/site.css` — all styles
- `assets/site.js` — content + router
- `assets/anson-tam-cv.pdf` — CV
- `assets/anson-headshot.jpg` — portrait
- `assets/notes/econ101a-section-01.md` … `-04.md` — section notes
