# Build spec (original, persona-agnostic)

This is the **original prompt** used to build this portfolio, reproduced as a reusable spec. Every persona-specific value has been replaced with a placeholder.

**Placeholder convention:** `«INPUT REQUIRED: …»` marks a value the user must supply. In this project those values live in the `config` block of [`../src/lib/content.ts`](../src/lib/content.ts) — set them there, not in components.

> ⚠️ **This is the original spec, not the current state.** The live site has since evolved — see [`STATE.md`](STATE.md). Notably: the **Explorations / "Visual playground" section was removed**, and the Works + Journal sections are now **GitHub-driven** (cards link to repos with a private-repo fallback; "Journal" became "Recent projects"). Use this doc to understand original intent and to rebuild/extend; use `STATE.md` + the code for what's true now.

---

Build a single-page dark portfolio landing page using **React + Vite + Tailwind CSS + TypeScript + GSAP + Framer Motion + hls.js**.

## Global Design System

### Fonts
Google Fonts import: Inter (300–700) and Instrument Serif (italic, 400).
- `--font-body: 'Inter', sans-serif` → Tailwind `font-body`
- `--font-display: 'Instrument Serif', serif` → Tailwind `font-display`

### CSS Custom Properties (HSL, no `hsl()` wrapper — Tailwind adds it)
```
--bg: 0 0% 4%;
--surface: 0 0% 8%;
--text: 0 0% 96%;
--muted: 0 0% 53%;
--stroke: 0 0% 12%;
--accent: 0 0% 96%;
```

### Tailwind Custom Colors
`bg`, `surface`, `text-primary` (→ `--text`), `muted`, `stroke` — each `hsl(var(--…))`.

### Accent Gradient
`linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)` — logo ring, hover borders, progress bars. Utility class `.accent-gradient`.

### Custom Animations (index.css)
- `scroll-down` — translateY(-100%) → translateY(200%), 1.5s ease-in-out infinite
- `role-fade-in` — opacity 0 + translateY(8px) → opacity 1 + translateY(0), 0.4s ease-out
- `gradient-shift` — background-position 0% 50% → 100% 50% → 0% 50%, 6s ease infinite

Forced dark theme — no light mode. `body` gets `bg-bg text-text-primary`.

## Page structure (Index.tsx)
`{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}` then the sections.

## Section 1: Loading Screen
Full-screen overlay (`fixed inset-0 z-[9999] bg-bg`). `requestAnimationFrame` counter 000→100 over ~2700ms (plus a wall-clock safety timeout so it can't hang in a backgrounded tab).
- Top-left: "Portfolio" label — `text-xs text-muted uppercase tracking-[0.3em]`, animates y:-20→0, opacity 0→1.
- Center: rotating words `«INPUT REQUIRED: loading words»` (default: Design / Create / Inspire) every 900ms, AnimatePresence `mode="wait"`, y:20→0→-20. `text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80`.
- Bottom-right: counter — `text-6xl md:text-8xl lg:text-9xl font-display tabular-nums`, `String(count).padStart(3,"0")`.
- Bottom progress bar: `h-[3px] bg-stroke/50`, inner `.accent-gradient` scaleX(count/100), box-shadow `0 0 8px rgba(137,170,204,0.35)`.
- On 100: 400ms delay → `onComplete`.

## Section 2: Hero
Full-viewport section with background HLS video and centered content.

### Background video
- HLS source: `«INPUT REQUIRED: HLS .m3u8 URL»` (a generic Mux demo stream ships by default — swap for your own).
- Use hls.js if `Hls.isSupported()`, else native HLS (`video.src`). `autoPlay muted loop playsInline`, centered + `object-cover`.
- Dark overlay `bg-black/20`; bottom fade `h-48 bg-gradient-to-t from-bg to-transparent`.

### Navbar (fixed, top center)
`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4`. Inner pill `inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2`; gains `shadow-md shadow-black/10` when `scrollY > 100`.
1. Logo: 9×9 circle, accent gradient border (reverses on hover), inner `bg-bg` circle with `«auto-derived from name»` initials in `font-display italic text-[13px]`, scales 110% on hover.
2. Divider `w-px h-5 bg-stroke mx-1` (hidden on mobile).
3. Nav links `["Home","Work","Resume"]` — `text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2`. Active: `text-text-primary bg-stroke/50`. Inactive: `text-muted hover:text-text-primary hover:bg-stroke/50`.
4. Divider.
5. "Say hi" button — same size; accent gradient border on hover (absolute span `inset:-2px`), inner `bg-surface rounded-full backdrop-blur-md`, includes "↗".

### Hero content (centered, z-10)
- Eyebrow: `text-xs text-muted uppercase tracking-[0.3em] mb-8` — `«INPUT REQUIRED: eyebrow label»` (e.g. "COLLECTION '26"). Class `blur-in`.
- Name: `text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight mb-6` — `«INPUT REQUIRED: full name»`. Class `name-reveal`.
- Role line: "A {role} lives in `«INPUT REQUIRED: location»`." — roles cycle every 2s through `«INPUT REQUIRED: rotating roles»`. Role word `font-display italic text-text-primary animate-role-fade-in inline-block` with `key={roleIndex}`.
- Description: `text-sm md:text-base text-muted max-w-md mb-12` — `«INPUT REQUIRED: tagline/description»`.
- CTA buttons (`inline-flex gap-4`): "See Works" (solid `bg-text-primary text-bg`, hover inverts to gradient-ring) and "Reach out ↗" (outline `border-2 border-stroke`, hover gradient ring). Both `rounded-full text-sm px-7 py-3.5 hover:scale-105`.

### GSAP entrance (`ease: "power3.out"`)
- `.name-reveal`: opacity 0→1, y 50→0, 1.2s, delay 0.1.
- `.blur-in`: opacity 0→1, blur(10px)→0, y 20→0, 1s, stagger 0.1, delay 0.3.

### Scroll indicator
Bottom-center: "SCROLL" (`text-xs text-muted uppercase tracking-[0.2em]`) over a `w-px h-10 bg-stroke` line with `.animate-scroll-down` highlight.

## Section 3: Selected Works
`bg-bg py-12 md:py-16`; inner `max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16`.
- Header (Framer Motion whileInView): eyebrow rule + "Selected Work"; heading "Featured *projects*" (italic word `font-display italic`); subtext; "View all work" pill (desktop only) with gradient hover ring.
- Bento grid: `grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6`, column spans alternating 7/5/5/7. Cards = `«INPUT REQUIRED: projects»`. Each card `bg-surface border border-stroke rounded-3xl` with image (`object-cover`, hover scale — current site uses `object-contain` to avoid cropping screenshots), halftone overlay (`radial-gradient(circle,#000 1px,transparent 1px)` at 4×4px, `opacity-20 mix-blend-multiply`), hover scrim (`bg-bg/70` + `backdrop-blur-lg`), and a hover pill with animated gradient border reading "View — *Title*".

## Section 4: Journal  → now "Recent projects"
`bg-bg py-16 md:py-24`; same header pattern (eyebrow + "Recent *thoughts*" + subtext + "View all"). Items = `«INPUT REQUIRED: journal/recent items»` rendered as horizontal pills (`rounded-[40px] sm:rounded-full`) — `flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke`.
*(Current site: retitled "Recent projects", rows show title + description + tech chip + GitHub date, link to repos.)*

## Section 5: Explorations (Parallax Gallery) — REMOVED in current site
`min-h-[300vh]` scroll-driven parallax. Layer 1: pinned center text via `ScrollTrigger.create({ pin, pinSpacing:false })` (eyebrow "Explorations", heading "Visual *playground*", subtext, Dribbble button). Layer 2: two parallax columns of rotated square cards with a click lightbox. *(This whole section was later removed — see STATE.md.)*

## Section 6: Stats
`bg-bg py-16 md:py-24`. 3-column grid of `«INPUT REQUIRED: stats»` (label + value), e.g. Years Experience / Projects Done / Satisfied Clients.

## Section 7: Contact / Footer
`bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden`.
- Background video: same HLS source, flipped vertically (`scale-y-[-1]`), heavier overlay `bg-black/60`.
- GSAP marquee: "BUILDING THE FUTURE • " repeated, `xPercent:-50`, duration 40, `ease:"none"`, `repeat:-1`.
- CTA: email button `mailto:«INPUT REQUIRED: email»` with gradient hover ring.
- Footer bar: social links `«INPUT REQUIRED: social URLs»` (Twitter / LinkedIn / GitHub …) + green pulsing dot + "Available for projects" + `© {year} «INPUT REQUIRED: full name»`.

## Dependencies
`gsap`, `framer-motion`, `hls.js`, `react-router-dom`, `tailwindcss-animate`. Add smooth-scroll nav and page transitions.
