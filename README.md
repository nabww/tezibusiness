# Tezi homepage — React + Vite + Framer Motion

Marketing homepage for Tezi. It is a single static page: no backend, no router.

## Requirements

- Node 18 or newer (tested with Node 26 / npm 11).

## Commands

```bash
npm install                # install dependencies (first time, or after package.json changes)
npm run dev                # dev server with live reload at http://localhost:5173
npm run build              # production build into dist/
npm run preview            # serve dist/ locally at http://localhost:4173 to check the build
npm run lint               # oxlint
```

## What `npm run build` does

`vite build` turns the source into a ready-to-upload static site in `dist/`. It replaces the previous `dist/` on every run.

1. Starts at `index.html` → `src/main.jsx`, follows every import (sections, React, Framer Motion, Lenis) and compiles JSX to plain JavaScript.
2. Minifies the result into one JS file (~420 kB, ~133 kB gzipped) and one CSS file (`index.css` + `fluid.css`, ~38 kB).
3. Adds a content hash to the file names (e.g. `assets/index-4yItgqPK.js`) so browsers never keep showing an old version after a deploy.
4. Copies everything in `public/` unchanged (logo, favicons, `work/` images).
5. Writes `dist/index.html` pointing at the built files.

```
dist/
  index.html
  assets/index-<hash>.js
  assets/index-<hash>.css
  tezi-logo.png  favicon.ico  favicon.png  apple-touch-icon.png
  work/*.webp
```

It does not start a server or deploy anything.

## Deploying to tezibusiness.com

The site is hosted at **https://tezibusiness.com** on shared hosting (Apache behind nginx, Let's Encrypt SSL already active for `tezibusiness.com` and `www`).

1. Run `npm run build`.
2. Open the hosting control panel's File Manager (or connect over FTP) and go to `public_html/`.
3. Delete the host's default "Website coming soon" files (e.g. the existing `index.html`/`default.html`).
4. Upload **everything inside** `dist/` (not the `dist` folder itself) into `public_html/`. Turn on "Show hidden files" so `.htaccess` is uploaded too.
5. Visit https://tezibusiness.com and hard-refresh (Ctrl+F5).

To update the site later, rebuild and upload `dist/` again; delete old files in `public_html/assets/` first so stale bundles don't pile up.

Files added for this domain (all in `public/`, copied into `dist/` by the build):

| File | Purpose |
| --- | --- |
| `.htaccess` | Redirects `http://` and `www.` to `https://tezibusiness.com`, gzip, long caching for hashed `assets/`, no-cache for `index.html`, basic security headers, 404s fall back to the homepage. |
| `robots.txt` | Allows search engines and points them at the sitemap. |
| `sitemap.xml` | Lists `https://tezibusiness.com/`. Update `<lastmod>` when content changes. |
| `og-image.png` | 1200×630 preview image shown when the link is shared on WhatsApp, LinkedIn, X, Facebook, etc. |

`index.html` also has the canonical URL and Open Graph / Twitter tags pointing at `https://tezibusiness.com/`.

If the domain ever changes, update those URLs in `index.html`, `.htaccess`, `robots.txt` and `sitemap.xml`. If the site loops between redirects after upload, the host's proxy isn't reporting HTTPS to Apache; remove the first `RewriteCond`/`RewriteRule` pair in `.htaccess` and enable "Force HTTPS" in the control panel instead.

## Project structure

```
index.html            page shell, title, meta description, favicon links
public/               copied as-is into dist/
  .htaccess           Apache redirects, caching, headers
  robots.txt, sitemap.xml  search-engine files
  og-image.png        link-preview image
  tezi-logo.png       nav logo (black wordmark, orange dot)
  favicon.ico/.png    browser-tab icons
  apple-touch-icon.png  iOS home-screen icon
  work/               portfolio screenshots
src/
  main.jsx            React entry point
  App.jsx             page layout, Lenis smooth scrolling, scroll progress bar
  index.css           base styles and design tokens (colours, fonts)
  fluid.css           motion, nav/mobile-menu and responsive styles
  lib/motion.jsx      shared springs, Reveal, CountUp, Magnetic
  lib/icons.jsx       inline SVG icons
  sections/           one component per section, in page order:
                      Nav, Hero, Who, Process, Case, Insights, Story, Work,
                      Products, How, System, Final (+ Footer)
```

## Brand

- Logo: black wordmark (`#111114`) with an orange dot.
- Colour tokens in `src/index.css`: `--ink: #111114`, `--blue: #31587c` (accent), `--orange: #ff6d00` (buttons/highlights).

## Notes

- All motion respects `prefers-reduced-motion`.
- Dashboard figures in `Insights.jsx` are illustrative, and the case study shows `XX%` placeholders until real figures are approved.
- Booking buttons point to `#book`; replace with your Calendly/Cal.com link.

## Troubleshooting

- **Blank page / "Cannot read properties of null (reading 'useState')"** — on Windows, opening the project as `c:\...` instead of `C:\...` made Vite bundle React twice. `vite.config.js` now sets `resolve.dedupe: ['react', 'react-dom']` to prevent this. If you still see it, clear Vite's cache once with `npm run dev -- --force`.
- **Old tab icon still showing** — browsers cache favicons; hard-refresh with Ctrl+F5.
