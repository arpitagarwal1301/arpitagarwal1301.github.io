import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GITHUB_URL, PERSON, RECENT_PROJECTS, type RecentProject } from "@/lib/content";
import { useImageStatus } from "@/hooks/useImageStatus";

const rowReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ProjectRow({ project, index }: { project: RecentProject; index: number }) {
  // If the project has a probe image and it 404s (repo private/unreachable),
  // fall back to the GitHub profile rather than a dead repo link.
  const probe = useImageStatus(project.probe);
  const href = probe === "error" ? GITHUB_URL : project.url;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title} on GitHub`}
      variants={rowReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex items-center gap-4 rounded-[32px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:gap-6 sm:rounded-full sm:px-7 sm:py-5"
    >
      {/* Stack chip */}
      <span className="hidden shrink-0 rounded-full border border-stroke px-3 py-1 text-xs uppercase tracking-wide text-muted sm:inline-block">
        {project.tech}
      </span>

      {/* Title + description */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-lg italic leading-snug text-text-primary sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-1 truncate text-xs text-muted sm:text-sm">
          {project.description}
        </p>
      </div>

      {/* Date + arrow */}
      <div className="flex shrink-0 items-center gap-3 pl-2 text-right">
        <span className="hidden text-sm text-muted sm:inline">{project.date}</span>
        <span className="text-sm text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-text-primary">
          ↗
        </span>
      </div>
    </motion.a>
  );
}

/**
 * Recent projects — a stack of horizontal pill rows. Each row shows a stack
 * chip, the project title with a one-line description, the GitHub "last
 * pushed" date, and opens the repo on click. "View all" jumps to the profile.
 */
export default function RecentProjects() {
  return (
    <section id="recent-projects" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Open Source"
          titleLead="Recent"
          titleEmphasis="projects"
          subtext={`Things ${PERSON.name.split(" ")[0]} has been building lately — tap any project to open it on GitHub.`}
          ctaLabel="View all"
          ctaHref={GITHUB_URL}
        />

        <div className="mt-10 flex flex-col gap-4 md:mt-14">
          {RECENT_PROJECTS.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
