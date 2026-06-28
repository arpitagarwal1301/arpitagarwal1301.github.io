import { cn } from "@/lib/utils";

interface GradientRingProps {
  /** Rounding utility — MUST match the parent/inner rounding. */
  rounded?: string;
  /** Ring thickness in px (applied as negative inset). Default 2. */
  inset?: number;
  /** "hover" fades in on parent `.group` hover; "always" stays visible. */
  reveal?: "always" | "hover";
  /** Animate the gradient left↔right (uses gradient-shift). */
  animated?: boolean;
  /** Add a soft accent glow behind the ring. */
  glow?: boolean;
  className?: string;
}

/**
 * Absolutely-positioned accent gradient layer that sits *behind* an element to
 * create a gradient border ring. Drop it as the first child of a
 * `relative` (and, for hover reveal, `group`) container, then render the
 * actual content in a sibling with `relative` + a solid background.
 *
 *   <span className="group relative inline-flex">
 *     <GradientRing rounded="rounded-full" reveal="hover" />
 *     <span className="relative rounded-full bg-surface px-4 py-2">Say hi ↗</span>
 *   </span>
 */
export function GradientRing({
  rounded = "rounded-full",
  inset = 2,
  reveal = "hover",
  animated = false,
  glow = false,
  className,
}: GradientRingProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute accent-gradient",
        rounded,
        animated && "accent-gradient-animated animate-gradient-shift",
        glow && "shadow-[0_0_20px_rgba(137,170,204,0.45)]",
        reveal === "hover"
          ? "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          : "opacity-100",
        className
      )}
      style={{ inset: -inset }}
    />
  );
}
