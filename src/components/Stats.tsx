import { motion } from "framer-motion";
import { STATS } from "@/lib/content";

/**
 * Stats — a minimal three-up metrics band. A hairline grid (gap-px over a
 * stroke-colored background) carves clean dividers between cells on the dark
 * canvas. Each cell reveals with a staggered fade/rise as it enters the
 * viewport, with a small accent-gradient underline beneath the figure.
 */
export default function Stats() {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke md:grid-cols-3">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col items-start gap-2 bg-bg p-8 md:p-12"
            >
              <span className="font-display text-6xl leading-none text-text-primary md:text-7xl lg:text-8xl">
                {stat.value}
              </span>
              <span className="accent-gradient h-px w-10" />
              <span className="text-sm uppercase tracking-[0.2em] text-muted md:text-base">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
