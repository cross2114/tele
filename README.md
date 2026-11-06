# Telemiles website

The current Telemiles marketing website is a static, eight-page site exported from the approved design and refined locally.

## Pages

- `index.html`: home
- `about.html`: our story
- `technology.html`: technology
- `support.html`: FAQ, guides and downloads
- `contact.html`: contact
- `ai-mifi.html`, `max.html`, `petmio.html`: product pages

All images and icons are stored in `assets/`. Shared entrance animations and hover feedback live in `site-motion.css` and `site-motion.js`. The home scroll scene and about particle wave retain their own animation files. Reduced-motion preferences are supported.

## Local preview

Run `python3 -m http.server 8766` in this directory, then visit http://127.0.0.1:8766/.

## Deployment

Pushes to `main` publish these static pages through `.github/workflows/pages.yml` to https://cross2114.github.io/tele/.

The workflow packages only the current HTML, styles, scripts and assets. Earlier Next.js source files remain in the repository for reference and are not part of the published site.

The contact form currently opens an email draft; it does not store submissions in a backend.
