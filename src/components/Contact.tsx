import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useHlsVideo } from "@/hooks/useHlsVideo";
import { HLS_SRC, PERSON, SOCIALS } from "@/lib/content";
import { GradientRing } from "@/components/ui/GradientRing";

/** Marquee phrase, rendered as a repeated sequence for a seamless loop. */
const MARQUEE_WORDS = Array.from({ length: 10 }, () => "BUILDING THE FUTURE • ");

/**
 * Contact / Footer section.
 *
 * Flipped HLS background video under a heavy overlay, a GSAP-driven
 * infinite marquee, a centered "let's build something" CTA, and a footer
 * bar with social links and an availability indicator.
 */
export default function Contact() {
  const videoRef = useHlsVideo(HLS_SRC);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-bg pt-16 md:pt-20 pb-8 md:pb-12"
    >
      {/* Flipped background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover"
      />

      {/* Heavy overlay + subtle top fade */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent"
        aria-hidden="true"
      />

      {/* GSAP marquee */}
      <div className="relative z-10 overflow-hidden">
        <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, index) => (
            <span
              key={index}
              className="pr-8 font-display italic leading-none text-text-primary text-[12vw] md:text-[8vw] opacity-90"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          Get in touch
        </p>
        <h2 className="mt-4 font-display italic text-5xl text-text-primary md:text-7xl">
          Let&apos;s build something
        </h2>
        <div className="mt-10 flex justify-center">
          <span className="group relative inline-flex">
            <GradientRing rounded="rounded-full" reveal="hover" />
            <a
              href={"mailto:" + PERSON.email}
              className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-7 py-3.5 text-sm text-text-primary backdrop-blur-md transition-colors"
            >
              {PERSON.email}
              <span aria-hidden="true">↗</span>
            </a>
          </span>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 mx-auto mt-8 max-w-6xl border-t border-stroke px-6 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Social links */}
          <div className="flex gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors hover:text-text-primary"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Availability indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm text-muted">Available for projects</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted sm:text-right">
          © 2026 {PERSON.name}
        </p>
      </div>
    </section>
  );
}
