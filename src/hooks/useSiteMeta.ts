import { useEffect } from "react";
import { META, PERSON } from "@/lib/content";

/** Build an SVG favicon (accent gradient ring + initials) as a data URI. */
function faviconDataUri(initials: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#89AACC"/><stop offset="100%" stop-color="#4E85BF"/>
  </linearGradient></defs>
  <circle cx="16" cy="16" r="15" fill="url(#g)"/>
  <circle cx="16" cy="16" r="12" fill="#0a0a0a"/>
  <text x="16" y="21" font-family="Georgia, serif" font-style="italic" font-size="12" fill="#f5f5f5" text-anchor="middle">${initials}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Applies the document title, meta description, and favicon from the central
 * site config (`src/lib/content.ts`) at runtime — so the browser tab and
 * favicon stay in sync with whatever name/copy you set there.
 */
export function useSiteMeta() {
  useEffect(() => {
    document.title = META.title;

    let desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.name = "description";
      document.head.appendChild(desc);
    }
    desc.content = META.description;

    let icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.type = "image/svg+xml";
    icon.href = faviconDataUri(PERSON.initials);
  }, []);
}
