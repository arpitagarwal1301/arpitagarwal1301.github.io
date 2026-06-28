# Arpit Agarwal — Portfolio

A single-page, dark, editorial portfolio landing page. Live at **[arpitagarwal1301.github.io](https://arpitagarwal1301.github.io)**.

**Stack:** React 18 · Vite 6 · TypeScript · Tailwind CSS v3 · GSAP · Framer Motion · hls.js · React Router

## Deployment

Pushed to `main` → a [GitHub Actions workflow](.github/workflows/deploy.yml) builds the Vite app and publishes `dist/` to GitHub Pages. No manual steps.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # type-check (tsc -b) + production build to dist/
npm run preview  # serve the production build
npm run typecheck
```

## What's inside

| Section | File | Highlights |
| --- | --- | --- |
| Loading screen | `src/components/LoadingScreen.tsx` | RAF 000→100 counter, rotating words, accent progress bar |
| Hero | `src/components/Hero.tsx` | HLS video background, floating navbar, GSAP entrance, cycling role word, scroll cue |
| Selected Works | `src/components/SelectedWorks.tsx` | 12-col bento grid (7/5/5/7), halftone overlay, gradient-ring hover label |
| Journal | `src/components/Journal.tsx` | Horizontal pill rows with thumbnails, read times, dates |
| Explorations | `src/components/Explorations.tsx` | GSAP ScrollTrigger pinned text + parallax columns + lightbox |
| Stats | `src/components/Stats.tsx` | Hairline 3-up grid |
| Contact / Footer | `src/components/Contact.tsx` | Flipped HLS video, GSAP marquee, mailto CTA, social bar |

## Make it yours

There's **one place to edit**: the `config` block at the top of [`src/lib/content.ts`](src/lib/content.ts).
Change your name, location, email, social links, and copy there and it propagates everywhere —
including the role line, footer links, the Dribbble button, the browser tab title, and the favicon.

```ts
const config = {
  name: "Ada Lovelace",          // → hero, footer ©, and auto initials ("AL")
  initials: "",                  // leave "" to auto-derive from name
  location: "London",
  email: "hi@ada.dev",           // powers every mailto link
  roles: ["Engineer", "Founder"],
  socials: [ { label: "Twitter", href: "https://x.com/you" }, /* … */ ],
  // metaTitle / metaDescription auto-generate from the above when left ""
};
```

- The browser tab **title + favicon** are applied at runtime from this config (see [`src/hooks/useSiteMeta.ts`](src/hooks/useSiteMeta.ts)), so `index.html` and `public/favicon.svg` stay generic.
- Swap the `PROJECTS`, `JOURNAL`, `EXPLORATIONS`, and `STATS` arrays (further down the same file) to change cards and imagery — image URLs are plain strings.
- Replace `hlsSrc` with your own Mux/HLS `.m3u8` for the background video.

### Shared foundation

- **Design system** — HSL CSS variables + Tailwind tokens in `src/index.css` / `tailwind.config.js`
  (`bg`, `surface`, `text-primary`, `muted`, `stroke`, `accent`); fonts `font-body` (Inter) / `font-display` (Instrument Serif).
- **Content + config** — all copy, links, imagery, and the editable `config` block live in `src/lib/content.ts`.
- **`useHlsVideo(src)`** — `src/hooks/useHlsVideo.ts` attaches an `.m3u8` stream via hls.js (native HLS fallback).
- **`<GradientRing>`** — `src/components/ui/GradientRing.tsx`, the reusable accent gradient border ring.
- **`<SectionHeader>`** — `src/components/ui/SectionHeader.tsx`, shared eyebrow + display heading + CTA.
- Smooth-scroll nav (`scrollToId` in `src/lib/utils.ts`) and a Framer Motion page transition in `src/App.tsx`.

The page is forced-dark (no light mode). Imagery is loaded from Unsplash; swap the URLs in `src/lib/content.ts` to customize.
