# Project state

> Living status doc — the "where things stand" handoff for the next agent/session.
> **Keep this updated when you finish work.** Verify against `git log` + the code; treat dates as written, not current.

_Last updated: 2026-06-28_

## Status: ✅ built, deployed, live

- **Live:** https://arpitagarwal1301.github.io (GitHub Pages via Actions; HTTPS; `404.html` SPA fallback).
- **Repo:** `arpitagarwal1301/arpitagarwal1301.github.io`, default branch `main`. Push to `main` auto-deploys.
- `npm run build` green; no console errors in the browser.
- Sections live: Hero → SelectedWorks → RecentProjects → Stats → Contact. (The old "Visual Playground"/Explorations section was **removed**.)

### Content currently shipped
- **Persona:** Arpit Agarwal · India · arpitvinshu@gmail.com · roles cycle `Creative / Fullstack / Founder / Scholar` (see TODO 3).
- **Featured (`PROJECTS`):** PermissionPilot (`docs/hero.svg`), hoverask, wardlume (banner svg), linkedinbot.
- **Recent (`RECENT_PROJECTS`):** hoverask, wardlume, PermissionPilot, linkedinbot, socialhunter, MySmsApp.
- **Stats:** 12+ Years · 10+ Projects · 100% Satisfied.
- **Socials:** Twitter `@ArpitVinshu`, LinkedIn `in/arpitagarwal1301`, GitHub (Dribbble removed).
- **OG/social preview:** `public/og.png` + static tags in `index.html`; README banner `docs/preview.png` (source `docs/preview.svg`).

## Open TODOs

1. **Make `linkedinbot` public** (review for secrets/.env first). It's private now, so its card shows the **placeholder + profile-redirect fallback**; going public makes the real image (`public/screenshots/landing.png`) and repo links resolve automatically — no code change. (`BlasterApp` is also private if you ever feature it.)
2. **(Optional) Node 22 in CI** — `.github/workflows/deploy.yml` uses `node-version: 20`; runners warn it's deprecated. Bump to `22` to silence (deploy still succeeds today).
3. **(Optional) Align hero roles** — `config.roles` still reads `Creative / Fullstack / Founder / Scholar`; consider matching the new positioning, e.g. `Android / macOS / AI / Fullstack`.
4. **OG cache** — if the link was shared before OG tags went live, refresh previews once via LinkedIn Post Inspector / X Card Validator / Facebook Sharing Debugger.
5. **(Optional) Add a personal website link** to `config.socials` if/when one exists.

## Key decisions & rationale

- **One-file config (`src/lib/content.ts`)** — single place to rebrand; initials, tab title, favicon, and meta all derive from it.
- **Image-probe 404 fallback (`useImageStatus`)** — reliable client-side way to avoid broken images + dead links for private/unreachable repos; self-heals when public. Chosen over cross-origin `fetch` (CORS makes 404 detection unreliable).
- **Runtime meta + favicon (`useSiteMeta`) AND static OG tags (`index.html`)** — runtime for live UX; static because social crawlers don't run JS.
- **GitHub Pages via Actions** (not branch deploy) — standard for a Vite SPA; Vite `base` stays `/` because it's a user site at the domain root.
- **LoadingScreen wall-clock safety timeout** — rAF pauses entirely in a backgrounded tab; a `setTimeout` guarantees the intro completes.
- **Banner/OG image** is an SVG hero mockup rendered to PNG with `rsvg-convert` (kept as `docs/preview.svg`).

## Conventions & preferences (enforced)

- **Never** add a `Co-Authored-By: Claude` trailer to commits/PRs.
- **Commit/push only when the user asks.**
- Strict TS (no unused imports/vars). 2-space, double quotes, named components, `@/` alias.

## Resuming on a new machine / agent

- `npm install` first. The site needs nothing else to run/build.
- Repo + Pages operations use the **`gh` CLI** — run `gh auth login` if not authenticated. No tokens/secrets are stored in the repo.
- Conversation history doesn't transfer; decisions live here + in `git log`.
