import { useEffect, useRef, useState } from "react";
import { useHlsVideo } from "@/hooks/useHlsVideo";
import { HLS_SRC, PERSON, NAV_LINKS } from "@/lib/content";
import { cn, scrollToId } from "@/lib/utils";
import { GradientRing } from "@/components/ui/GradientRing";
import { gsap } from "gsap";

/**
 * Floating pill navbar pinned to the top center of the viewport. Rendered
 * inside the Hero file since it belongs to the same overlay layer.
 */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(NAV_LINKS[0]?.href ?? "#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        className={cn(
          "inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition",
          scrolled && "shadow-md shadow-black/10"
        )}
      >
        {/* Logo — accent gradient ring that reverses direction on hover */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("#home");
            setActive("#home");
          }}
          className="group relative block h-9 w-9 overflow-hidden rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110"
          aria-label={PERSON.name}
        >
          <span className="absolute inset-0 rounded-full accent-gradient transition-transform duration-500 group-hover:rotate-180" />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg font-display text-[13px] italic text-text-primary">
            {PERSON.initials}
          </span>
        </a>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Nav links */}
        {NAV_LINKS.map((link) => {
          const isActive = active === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(link.href);
                setActive(link.href);
              }}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs transition sm:px-4 sm:py-2 sm:text-sm",
                isActive
                  ? "bg-stroke/50 text-text-primary"
                  : "text-muted hover:bg-stroke/50 hover:text-text-primary"
              )}
            >
              {link.label}
            </a>
          );
        })}

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Say hi */}
        <a
          href={`mailto:${PERSON.email}`}
          className="group relative ml-1 inline-flex"
        >
          <GradientRing rounded="rounded-full" reveal="hover" />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Say hi <span aria-hidden="true">↗</span>
          </span>
        </a>
      </nav>
    </header>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useHlsVideo(HLS_SRC);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle the role word every 2s.
  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % PERSON.roles.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  // GSAP entrance animations.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".name-reveal", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.1,
        ease: "power3.out",
      });
      gsap.from(".blur-in", {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const role = PERSON.roles[roleIndex];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen min-h-screen overflow-hidden"
    >
      <Navbar />

      {/* Background HLS video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          {PERSON.eyebrow}
        </p>

        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          {PERSON.name}
        </h1>

        <p className="blur-in mb-6 text-lg text-muted md:text-xl">
          A{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {role}
          </span>{" "}
          lives in {PERSON.location}.
        </p>

        <p className="blur-in mb-12 max-w-md text-sm text-muted md:text-base">
          {PERSON.description}
        </p>

        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          {/* See Works — solid, inverts to gradient-ringed on hover */}
          <button
            type="button"
            onClick={() => scrollToId("#work")}
            className="group relative"
          >
            <GradientRing rounded="rounded-full" reveal="hover" />
            <span className="relative inline-flex items-center rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition duration-300 group-hover:scale-105 group-hover:bg-bg group-hover:text-text-primary">
              See Works
            </span>
          </button>

          {/* Reach out — outlined, gradient ring on hover */}
          <a
            href={`mailto:${PERSON.email}`}
            className="group relative"
          >
            <GradientRing rounded="rounded-full" reveal="hover" />
            <span className="relative inline-flex items-center rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition duration-300 group-hover:scale-105 group-hover:border-transparent">
              Reach out <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          SCROLL
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="absolute inset-x-0 top-0 h-1/2 w-px animate-scroll-down bg-text-primary" />
        </span>
      </div>
    </section>
  );
}
