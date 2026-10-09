# UX-Bharath

Portfolio site of Bharath, Lead UX & Product Designer.

A plain static site: no build step, no dependencies. Open `index.html` in a browser, or serve the folder.

## Folder structure

```
UX-Bharath/
├── index.html                  Markup only: content, structure, and the CSS/JS links
├── README.md
├── .gitignore
├── .nojekyll
├── assets/
│   ├── css/                    11 files, loaded in numbered order
│   │   ├── 01-tokens.css           colour tokens and the dark theme
│   │   ├── 02-base.css             reset, typography, navigation, page layout
│   │   ├── 03-components.css       hero, photo, ticker, boxes, skills, projects, pills
│   │   ├── 04-responsive.css       footer, scroll reveal, 820px breakpoint, reduced motion
│   │   ├── 05-effects.css          motion: letters, floats, ripples, hover and entrance
│   │   ├── 06-mobile-menu.css      Apple-style mobile menu
│   │   ├── 07-accessibility.css    WCAG 2.2 AA layer
│   │   ├── 08-hero-title.css       hero name on one line
│   │   ├── 09-case-study.css       case-study header, facts, decisions, tiles, timeline
│   │   ├── 10-heading-scale.css    heading scale on web
│   │   └── 11-pills.css            pill hover fill
│   ├── js/                     5 scripts, loaded in order
│   │   ├── core.js                 helpers and scroll reveal
│   │   ├── interactions.js         accordion, parallax, tilt, photo upload, theme toggle
│   │   ├── effects.js              hero letters, count-up, progress bar, glow, buttons
│   │   ├── navigation.js           in-page links and the mobile menu
│   │   └── accessibility.js        theme state for assistive tech, pause/play control
│   └── img/
│       ├── bharath-portrait.jpg
│       ├── mbcs-case-study-cover.jpg
│       ├── goibibo-case-study-cover.jpg
│       └── favicon.svg
├── tools/
│   └── build-single-file.py    bundles the folder into one HTML file
└── docs/
    └── Bharath-Portfolio-Design-System.md
```

The CSS files load in the order shown and later files intentionally override earlier ones, so keep that order.

## Run it locally

Double-click `index.html`, or serve the folder:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Edit it

- **Content** (text, links, projects, experience): `index.html`.
- **Colours, type, spacing, components:** follow `docs/Bharath-Portfolio-Design-System.md`. Every element should come from the design system; add anything missing to the design system first.
- **Behaviour:** `assets/js/`.

## Build a single HTML file

If you need the whole site as one self-contained file (for example to host it as a single page):

```
python3 tools/build-single-file.py
```

This writes `dist/portfolio-single-file.html` (Python 3, nothing to install). Change the folder first, then rebuild; `dist/` is git-ignored.

## Publish with GitHub Pages

1. Push this folder's contents to the repository (the files must be at the repository root, with `index.html` at the top level).
2. Open **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
4. After a minute or two the site is live at `https://poojaribharath.github.io/UX-Bharath/`.

All paths are relative, so the site also works on a custom domain or any other static host.
