# Architecture

Deep reference for the portfolio. Pair with [`../AGENTS.md`](../AGENTS.md) (the master guide) and [`STATE.md`](STATE.md) (current status). Verify against code before relying on any detail.

## Render tree

```
src/main.tsx                 React root: StrictMode > BrowserRouter (v7 future flags) > App
└── src/App.tsx              AnimatePresence + Routes ("/" and "*" → Index); page transition
    └── src/pages/Index.tsx  Gates <LoadingScreen> until done, calls useSiteMeta(),
                             then renders the sections in a fading <motion.main>:
        ├── Hero             #home
        ├── SelectedWorks    #work
        ├── RecentProjects   #recent-projects
        ├── Stats            #stats
        └── Contact          #contact
```

## Data flow (the important bit)

Everything funnels through **[`src/lib/content.ts`](../src/lib/content.ts)**:

```
config  (the only block you normally edit)
  │  name, initials, location, email, roles, eyebrow, description,
  │  metaTitle, metaDescription, navLinks, socials, loadingWords, hlsSrc
  ▼  (derived, do not hand-edit)
PERSON · NAV_LINKS · LOADING_WORDS · SOCIALS · HLS_SRC · ACCENT_GRADIENT
META {title, description}      ← auto-generated from config when blank
GITHUB_URL                     ← from socials (fallback target for dead repo links)
PROJECTS[] · RECENT_PROJECTS[] · STATS[]   ← content collections (edit freely)
```

Types: `Project {title, category, year, image, url, span, aspect}` · `RecentProject {title, description, tech, date, url, probe?}` · `Stat {value, label}` · `SocialLink {label, href}`.

Components import these named exports; they never hardcode persona/copy.

## Components (`src/components/`)

| File | Role |
| --- | --- |
| `Hero.tsx` | Full-viewport `#home`: HLS video bg, floating navbar pill (logo + nav links + "Say hi"), GSAP entrance, 2s role cycling, dual CTAs, scroll cue. |
| `SelectedWorks.tsx` | `#work` bento grid of `PROJECTS`. `ProjectCard` probes the image; on 404 → branded placeholder + link to `GITHUB_URL`. Halftone overlay, caption, gradient "View" hover label. |
| `RecentProjects.tsx` | `#recent-projects` pill rows from `RECENT_PROJECTS` (stack chip · title · description · date · ↗). `ProjectRow` uses `probe` for the same 404 fallback. |
| `Stats.tsx` | `#stats` three-up metrics band (`STATS`) with hairline dividers + accent underlines + staggered reveals. |
| `Contact.tsx` | `#contact` footer: flipped HLS video, GSAP marquee, mailto CTA, `SOCIALS`, pulsing availability dot, `© {year} {name}`. |
| `LoadingScreen.tsx` | Fixed overlay: rAF 0→100 counter (2.7s + 0.4s hold) **with a wall-clock safety timeout** so it can't hang in a backgrounded tab; rotating words; accent progress bar. |

## Shared primitives & hooks

- `src/components/ui/GradientRing.tsx` — absolutely-positioned accent gradient border. Props: `rounded`, `inset`(px), `reveal` `"hover"|"always"`, `animated`, `glow`. Drop as first child of a `relative`/`group` element with a solid-bg sibling.
- `src/components/ui/SectionHeader.tsx` — shared header (eyebrow rule + label, heading with one italic emphasis word, subtext, optional desktop CTA pill). External `ctaHref` opens in a new tab; `#anchor` smooth-scrolls.
- `src/hooks/useHlsVideo.ts` — `useHlsVideo(src) → ref`; hls.js when supported, native HLS fallback; cleans up on unmount.
- `src/hooks/useImageStatus.ts` — `useImageStatus(url?) → "idle"|"loading"|"ok"|"error"`; eager background probe powering the 404 fallback.
- `src/hooks/useSiteMeta.ts` — sets `document.title`, `<meta name=description>`, and a runtime SVG favicon (initials + accent ring) from `META`/`PERSON`.
- `src/lib/utils.ts` — `cn(...)` (clsx-lite) and `scrollToId(href)` (smooth scroll for nav anchors).

## Design system

- `src/index.css` — Google Fonts import; Tailwind layers; CSS vars `--bg 0 0% 4%`, `--surface 0 0% 8%`, `--text 0 0% 96%`, `--muted 0 0% 53%`, `--stroke 0 0% 12%`, `--accent 0 0% 96%`; utilities `.accent-gradient`, `.accent-gradient-animated`; keyframes `scroll-down`, `role-fade-in`, `gradient-shift`; custom scrollbar. Forced dark (`<html class="dark">`).
- `tailwind.config.js` — maps tokens to `bg/surface/text-primary/muted/stroke/accent`, fonts `body`(Inter)/`display`(Instrument Serif), and the animations.
- Accent gradient: `linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)`.

## Allowed import surface (keep TS strict happy)

`react`, `framer-motion`, `gsap` + `gsap/ScrollTrigger`, and these `@/` modules only: `@/lib/content`, `@/lib/utils`, `@/hooks/useHlsVideo`, `@/hooks/useImageStatus`, `@/hooks/useSiteMeta`, `@/components/ui/GradientRing`, `@/components/ui/SectionHeader`. (`@gsap/react`/`useGSAP` is **not** installed — use `useEffect`/`useLayoutEffect` + `gsap.context().revert()`.)

## Build & deploy

`npm run build` = `tsc -b` (strict, all tsconfigs) then `vite build` → `dist/`. CI: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) runs `npm ci` → build → copies `dist/index.html` to `dist/404.html` → uploads + deploys to Pages on push to `main`. `public/` files (e.g. `og.png`, `favicon.svg`) are served at the site root. Vite `base` is `/` (correct for a user site at the domain root).
