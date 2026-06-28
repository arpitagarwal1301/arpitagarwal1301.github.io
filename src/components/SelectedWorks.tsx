import { useState } from "react";
import { motion } from "framer-motion";
import { GITHUB_URL, PROJECTS, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useImageStatus } from "@/hooks/useImageStatus";
import { GradientRing } from "@/components/ui/GradientRing";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Inline GitHub mark used by the unreachable-repo placeholder. */
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/** Shown when a project image can't load (e.g. a private/unreachable repo). */
function ProjectPlaceholder({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-surface p-6 text-center">
      <span
        aria-hidden="true"
        className="h-12 w-px accent-gradient"
        style={{ boxShadow: "0 0 12px rgba(137,170,204,0.4)" }}
      />
      <GitHubMark className="h-9 w-9 text-muted" />
      <span className="font-display text-2xl italic text-text-primary/90">
        {project.title}
      </span>
      <span className="text-xs uppercase tracking-[0.25em] text-muted">
        View on GitHub ↗
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Eagerly probe the image so the fallback fires reliably (independent of the
  // lazy <img>); the inline onError below is a secondary safety net.
  const status = useImageStatus(project.image);
  const [imgError, setImgError] = useState(false);
  // If the repo's image is unreachable the repo itself is likely private/404,
  // so send visitors to the GitHub profile instead of a dead repo link.
  const broken = status === "error" || imgError;
  const href = broken ? GITHUB_URL : project.url;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={
        broken
          ? `${project.title} — view on GitHub profile`
          : `Open ${project.title} on GitHub`
      }
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "group relative block w-full overflow-hidden rounded-3xl border border-stroke bg-surface",
        project.span,
        project.aspect
      )}
    >
      {broken ? (
        <ProjectPlaceholder project={project} />
      ) : (
        <>
          {/* Project image — contained (not cropped) and framed on the card */}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03] md:p-4"
          />

          {/* Halftone texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />

          {/* Persistent caption (fades out on hover) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 bg-gradient-to-t from-bg/80 via-bg/30 to-transparent p-5 transition-opacity duration-500 group-hover:opacity-0 md:p-6">
            <span className="text-xs uppercase tracking-wide text-white/80">
              {project.category} · {project.year}
            </span>
            <span className="font-display text-lg italic text-white">
              {project.title}
            </span>
          </div>

          {/* Hover scrim + centered "View" label */}
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100">
            <span className="relative inline-flex translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
              <GradientRing rounded="rounded-full" reveal="always" animated />
              <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm text-bg">
                View <span className="font-display italic">{project.title}</span>
                <span aria-hidden="true">↗</span>
              </span>
            </span>
          </div>
        </>
      )}
    </motion.a>
  );
}

/**
 * Selected Works — an editorial bento grid of featured projects. Each card
 * links to its GitHub repo; if the repo image is unreachable (e.g. a private
 * repo) it shows a branded placeholder and links to the GitHub profile instead.
 */
export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          titleLead="Featured"
          titleEmphasis="projects"
          subtext="A selection of things I've shipped recently — tap any card to open the repo on GitHub."
          ctaLabel="View all work"
          ctaHref={GITHUB_URL}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-12 md:gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
