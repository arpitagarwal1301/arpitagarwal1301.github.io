# AGENTS.md — project guide for AI coding agents

> Canonical context file for any AI agent (Claude Code, Codex, Cursor, …) working in this repo.
> `CLAUDE.md` imports this file; `.cursorrules` points here. Keep this the single source of truth.

**What:** A dark, editorial single-page portfolio for **Arpit Agarwal** (mobile software engineer & AI solution builder).
**Live:** https://arpitagarwal1301.github.io · **Repo:** https://github.com/arpitagarwal1301/arpitagarwal1301.github.io

---

## 🚦 Onboarding ritual (read this first)

When the user says something like *"I want to read and understand the project first then I will give you a task"* — **do not change anything yet.** Instead:

1. Read, in order: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) → [`docs/STATE.md`](docs/STATE.md) → [`docs/BUILD_SPEC.md`](docs/BUILD_SPEC.md).
2. Skim [`src/lib/content.ts`](src/lib/content.ts) (the project's control panel) and [`src/pages/Index.tsx`](src/pages/Index.tsx) (section order).
3. Reply with a short summary of: **what the project is**, **its architecture**, and **current state + open TODOs** (from `docs/STATE.md`).
4. Then **wait** for the user's task. Verify any doc claim against the code / `git log` before acting — docs can drift.

---

## Stack

React 18 · Vite 6 · TypeScript (strict) · Tailwind CSS v3 · GSAP · Framer Motion · hls.js · React Router · `tailwindcss-animate`

## Commands

```sh
npm install        # first time (also: gh auth login, if using gh)
npm run dev        # dev server → http://localhost:5173
npm run build      # tsc -b && vite build  → dist/   (this is the source-of-truth check)
npm run preview    # serve the production build
npm run typecheck  # tsc -b --noEmit
```

## 🥇 Golden rule: one config file

Almost all content/persona/copy lives in the `config` block at the top of **[`src/lib/content.ts`](src/lib/content.ts)** — name, location, email, roles, eyebrow, description, nav links, socials, loading words, HLS stream, plus the `PROJECTS`, `RECENT_PROJECTS`, and `STATS` arrays. Everything else **derives** from it (`PERSON`, `META`, `GITHUB_URL`, `SOCIALS`, …). The browser **tab title + favicon** are generated from this config at runtime ([`src/hooks/useSiteMeta.ts`](src/hooks/useSiteMeta.ts)). Change copy here, not in components.

## Architecture at a glance

`src/main.tsx` → `App.tsx` (router + page transition) → `src/pages/Index.tsx`, which gates a `LoadingScreen` then renders, in order:

`Hero` → `SelectedWorks` → `RecentProjects` → `Stats` → `Contact`

Sections live in `src/components/*.tsx`; shared primitives in `src/components/ui/`; hooks in `src/hooks/`; helpers in `src/lib/`. Full map in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Key patterns (know these before editing)

- **Design system** — HSL tokens + fonts + keyframes in [`src/index.css`](src/index.css) and [`tailwind.config.js`](tailwind.config.js). Colors: `bg`, `surface`, `text-primary`, `muted`, `stroke`, `accent`. Fonts: `font-body` (Inter), `font-display` (Instrument Serif, italic). Forced dark — no light mode.
- **HLS video** — [`useHlsVideo(src)`](src/hooks/useHlsVideo.ts) attaches a `.m3u8` stream to a `<video>` ref (hls.js, native Safari fallback). Used by Hero + Contact.
- **Gradient ring** — [`GradientRing`](src/components/ui/GradientRing.tsx) renders the accent gradient border used on buttons/cards/logo.
- **404-safe GitHub links** — [`useImageStatus`](src/hooks/useImageStatus.ts) probes a repo's image; if it 404s (private/unreachable), the project card shows a placeholder and the link falls back to `GITHUB_URL`. Self-heals when the repo becomes public.
- **Runtime meta** — [`useSiteMeta`](src/hooks/useSiteMeta.ts) sets title/description/favicon from config. **Static OG/Twitter tags** live in [`index.html`](index.html) because social crawlers don't run JS.

## Conventions

- Strict TS with `noUnusedLocals` + `noUnusedParameters` — **no unused imports/vars** or the build fails.
- 2-space indent, double quotes, named function components, `@/` alias → `src/`.
- Only import from existing modules listed in `docs/ARCHITECTURE.md`. Match surrounding style.

## Deploy

Push to `main` → [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes `dist/` to GitHub Pages (user site, served at the domain root). No manual steps. A `404.html` copy of `index.html` is generated for SPA routing.

## Working agreements

- **Commit/push only when the user asks.** This repo's default branch is `main`.
- **Never add a `Co-Authored-By: Claude` trailer** to commits or PRs.
- **Verify before claiming done:** run `npm run build` and, for UI changes, the preview/dev server.
- Keep [`docs/STATE.md`](docs/STATE.md) updated when you finish work so the next agent inherits accurate context.

## Deeper docs

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — component-by-component map, data flow, design system.
- [`docs/STATE.md`](docs/STATE.md) — current status, open TODOs, decisions (**the resume enabler**).
- [`docs/BUILD_SPEC.md`](docs/BUILD_SPEC.md) — the full original build spec, persona-agnostic (rebuild/extend reference).
