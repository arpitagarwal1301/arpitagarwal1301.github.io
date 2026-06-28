/** Tiny classNames joiner (clsx-lite) — filters falsy values and joins. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Smoothly scroll to an element id (used by the navbar anchors). */
export function scrollToId(href: string) {
  if (!href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
