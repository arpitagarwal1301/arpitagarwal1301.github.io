/* ============================================================================
 *  SITE CONFIG  —  edit THIS BLOCK to make the portfolio your own.
 *  Everything below the "DERIVED" line reads from `config`; you normally
 *  never need to touch it. Change a name/email/link here and it propagates
 *  to the page, the browser tab title, and the favicon automatically.
 * ==========================================================================*/

const config = {
  /** Your name — also used to auto-generate the logo/favicon initials. */
  name: "Arpit Agarwal",
  /** Logo initials. Leave "" to auto-derive from `name` (e.g. "Arpit Agarwal" → "AA"). */
  initials: "",
  /** City / where you're based. */
  location: "India",
  /** Contact email (powers every "mailto" link). */
  email: "arpitvinshu@gmail.com",

  /** Words that cycle in the hero role line: "A {role} lives in {location}." */
  roles: ["Creative", "Fullstack", "Founder", "Scholar"],
  /** Small uppercase label above your name in the hero. */
  eyebrow: "COLLECTION '26",
  /** Hero supporting paragraph. */
  description:
    "Mobile software engineer and AI solution builder — crafting native Android & macOS apps and intelligent tools that turn complex problems into effortless experiences.",

  /** Browser tab. Leave "" to auto-generate from name. */
  metaTitle: "",
  /** <meta name="description">. Leave "" to auto-generate from name + roles. */
  metaDescription: "",

  /** Floating navbar links. `href` targets section ids for smooth scroll. */
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "Resume", href: "#stats" },
  ],

  /** Social / external links (shown in the footer). */
  socials: [
    { label: "Twitter", href: "https://x.com/ArpitVinshu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/arpitagarwal1301/" },
    { label: "GitHub", href: "https://github.com/arpitagarwal1301" },
  ],

  /** Words that rotate on the loading screen. */
  loadingWords: ["Design", "Create", "Inspire"],

  /** Background HLS (.m3u8) video stream — used by Hero + Contact. */
  hlsSrc:
    "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8",
};

/* ── Content collections (swap copy + imagery freely) ─────────────────────── */

export interface Project {
  title: string;
  category: string;
  year: string;
  image: string;
  /** Repo / live link the card opens (new tab). */
  url: string;
  /** Tailwind md: column span — alternates 7 / 5 / 5 / 7. */
  span: string;
  /** Aspect ratio utility for the card. */
  aspect: string;
}

export const PROJECTS: Project[] = [
  {
    title: "PermissionPilot",
    category: "Swift · macOS",
    year: "2026",
    image:
      "https://raw.githubusercontent.com/arpitagarwal1301/PermissionPilot/main/docs/hero.svg",
    url: "https://github.com/arpitagarwal1301/PermissionPilot",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    title: "hoverask",
    category: "Swift · macOS",
    year: "2026",
    image:
      "https://raw.githubusercontent.com/arpitagarwal1301/hoverask/HEAD/docs/assets/hoverask-v1-final-preview.png",
    url: "https://github.com/arpitagarwal1301/hoverask",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    title: "wardlume",
    category: "Swift · macOS",
    year: "2026",
    image:
      "https://raw.githubusercontent.com/arpitagarwal1301/wardlume/main/.github/assets/wardlume-banner.svg",
    url: "https://github.com/arpitagarwal1301/wardlume",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    title: "linkedinbot",
    category: "TypeScript · SaaS",
    year: "2026",
    image:
      "https://raw.githubusercontent.com/arpitagarwal1301/linkedinbot/main/public/screenshots/landing.png",
    url: "https://github.com/arpitagarwal1301/linkedinbot",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
];

export interface RecentProject {
  title: string;
  /** Short subtitle shown under the title. */
  description: string;
  /** Primary language / stack chip. */
  tech: string;
  /** GitHub "last pushed" month shown on the right. */
  date: string;
  /** Repo link the row opens (new tab). */
  url: string;
  /**
   * Optional raw image URL used only to detect whether the repo is reachable.
   * If it 404s (e.g. the repo is private), the row falls back to the GitHub
   * profile instead of a dead repo link. Self-heals once the repo is public.
   */
  probe?: string;
}

/** Recency-ordered list of notable repos, shown as the "Recent projects" list. */
export const RECENT_PROJECTS: RecentProject[] = [
  {
    title: "hoverask",
    description:
      "Native macOS floating voice assistant with a glass companion UI, powered by Codex or Claude CLI.",
    tech: "Swift",
    date: "Jun 2026",
    url: "https://github.com/arpitagarwal1301/hoverask",
  },
  {
    title: "wardlume",
    description:
      "Lock your Mac so people can watch your AI agent work but can't touch it — Touch ID to unlock.",
    tech: "Swift",
    date: "Jun 2026",
    url: "https://github.com/arpitagarwal1301/wardlume",
  },
  {
    title: "PermissionPilot",
    description:
      "Drop-in SwiftUI onboarding + permissions flow for macOS apps. Zero dependencies.",
    tech: "Swift",
    date: "Jun 2026",
    url: "https://github.com/arpitagarwal1301/PermissionPilot",
  },
  {
    title: "linkedinbot",
    description: "LinkedIn outreach bot SaaS with a live demo.",
    tech: "TypeScript",
    date: "May 2026",
    url: "https://github.com/arpitagarwal1301/linkedinbot",
    probe:
      "https://raw.githubusercontent.com/arpitagarwal1301/linkedinbot/main/public/screenshots/landing.png",
  },
  {
    title: "socialhunter",
    description: "Full-stack social platform built on the MERN stack.",
    tech: "JavaScript",
    date: "Jan 2023",
    url: "https://github.com/arpitagarwal1301/socialhunter",
  },
  {
    title: "MySmsApp",
    description: "A full replacement for Android's native default SMS app.",
    tech: "Java",
    date: "Apr 2020",
    url: "https://github.com/arpitagarwal1301/MySmsApp",
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: "12+", label: "Years Experience" },
  { value: "10+", label: "Projects Done" },
  { value: "100%", label: "Satisfied Clients" },
];

export interface SocialLink {
  label: string;
  href: string;
}

/* ============================================================================
 *  DERIVED  —  values the components consume. Do not edit; change `config`.
 * ==========================================================================*/

/** Turn a full name into 1–2 uppercase initials ("Michael Smith" → "MS"). */
function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "—";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? "" : "";
  return (first + last).toUpperCase();
}

/** Shared HLS stream used by the Hero and Contact background videos. */
export const HLS_SRC = config.hlsSrc;

/** Accent gradient used across logo ring, hover borders, progress bars. */
export const ACCENT_GRADIENT = "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)";

/** Persona / hero copy. */
export const PERSON = {
  name: config.name,
  initials: config.initials || deriveInitials(config.name),
  location: config.location,
  email: config.email,
  eyebrow: config.eyebrow,
  description: config.description,
  roles: config.roles,
};

/** Floating navbar links. */
export const NAV_LINKS: { label: string; href: string }[] = config.navLinks;

/** Rotating words shown on the loading screen. */
export const LOADING_WORDS: string[] = config.loadingWords;

/** Social links (footer). */
export const SOCIALS: SocialLink[] = config.socials;

/** GitHub profile URL — used as the fallback when a repo link is unreachable. */
export const GITHUB_URL =
  config.socials.find((s) => s.label.toLowerCase() === "github")?.href ??
  "https://github.com/arpitagarwal1301";

/** Document <head> metadata, auto-generated from `config` when left blank. */
export const META = {
  title: config.metaTitle || `${config.name} — Portfolio`,
  description:
    config.metaDescription ||
    `${config.name} — ${config.roles.join(", ")} based in ${config.location}. ${config.description}`,
};
