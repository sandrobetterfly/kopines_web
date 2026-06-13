# Kopines — Cake Shop Website

A fast, mobile-first single-page website for **Kopines**, a cake shop in Tbilisi, Georgia.
Handmade cakes, desserts and KOPI'S cookies — with online ordering via Wolt and Glovo.

## Tech

Plain, dependency-free **HTML + CSS + vanilla JavaScript**. No build step, no framework —
it deploys as-is to any static host.

```
.
├── index.html          # the whole page (semantic markup + JSON-LD SEO data)
├── css/styles.css      # all styles (mobile-first, responsive)
├── js/main.js          # header scroll state, mobile menu, scroll reveals, video autoplay
├── assets/
│   ├── products/       # menu item photos
│   ├── lifestyle/      # lifestyle photos + cake-making video
│   ├── covers/         # hero background
│   ├── logo.png        # header / wordmark logo
│   ├── favicon.png     # browser tab icon
│   └── apple-touch-icon.png
├── robots.txt
└── sitemap.xml
```

## Local preview

No tooling required. From this folder, run any static server, e.g.:

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

## Deploy

Because `index.html` is at the repository root, this works with **zero configuration** on:

- **Netlify** — drag-and-drop this folder, or connect the repo (publish directory: root, no build command).
- **Vercel** — import the repo (Framework preset: *Other*, no build command, output: root).
- **Cloudflare Pages** — connect the repo (no build command, output directory: `/`).
- **GitHub Pages** — Settings → Pages → deploy from `main` branch, `/root`.

### Custom domain
The SEO tags (`canonical`, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD) currently
reference `https://kopines.ge/`. If the final domain differs, update those URLs.

## Content notes

- **Menu** — product names, Georgian descriptions and prices are inline in `index.html`.
- **Images** — all photos are resized and compressed for web (longest edge ≤ 1000–1900px).
  When replacing a photo, keep a roughly portrait 4:4.6 crop for menu cards.
- **Video** — `cake-making.mp4` is muted, looping, `playsinline`, and `preload="none"`
  (it only loads when scrolled into the "Moments" section).
- **Ordering / social links** — Wolt, Glovo, Instagram, Facebook are wired in the
  "Order" section and footer.

## Accessibility & SEO

- Every image has descriptive `alt` text.
- Semantic landmarks, a single `<h1>`, and a working mobile menu (Esc to close).
- `<title>`, meta description, Open Graph + Twitter cards, and `Bakery` JSON-LD
  structured data (address, hours, geo, social profiles) for local search.

---

© Kopines · Cake Shop · Tbilisi
