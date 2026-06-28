import { motion } from "framer-motion";
import { GradientRing } from "./GradientRing";
import { scrollToId } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  /** Heading text rendered before the emphasized word. */
  titleLead: string;
  /** Emphasized word, rendered in font-display italic. */
  titleEmphasis: string;
  /** Optional trailing text after the emphasized word. */
  titleTrail?: string;
  subtext: string;
  /** Optional desktop-only CTA pill. */
  ctaLabel?: string;
  ctaHref?: string;
}

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Shared section header: small eyebrow rule + label, a large display heading
 * with one emphasized italic word, supporting copy, and an optional
 * desktop-only "View all" pill with a gradient hover ring.
 */
export function SectionHeader({
  eyebrow,
  titleLead,
  titleEmphasis,
  titleTrail,
  subtext,
  ctaLabel,
  ctaHref,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    >
      <div className="max-w-xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-4xl leading-[1.05] tracking-tight text-text-primary md:text-5xl lg:text-6xl">
          {titleLead}{" "}
          <span className="font-display italic">{titleEmphasis}</span>
          {titleTrail ? ` ${titleTrail}` : ""}
        </h2>
        <p className="mt-5 max-w-md text-sm text-muted md:text-base">{subtext}</p>
      </div>

      {ctaLabel && (
        <a
          href={ctaHref ?? "#"}
          {...(ctaHref && !ctaHref.startsWith("#")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
          onClick={(e) => {
            if (ctaHref?.startsWith("#")) {
              e.preventDefault();
              scrollToId(ctaHref);
            }
          }}
          className="group relative hidden shrink-0 md:inline-flex"
        >
          <GradientRing rounded="rounded-full" reveal="hover" />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-sm text-text-primary transition-colors">
            {ctaLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </a>
      )}
    </motion.div>
  );
}
