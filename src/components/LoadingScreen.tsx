import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LOADING_WORDS } from "@/lib/content";

interface LoadingScreenProps {
  /** Called once the counter has reached 100 and a short hold has elapsed. */
  onComplete: () => void;
}

/** Total run time of the 0 → 100 counter, in milliseconds. */
const DURATION = 2700;
/** Delay after hitting 100 before handing control back to the parent. */
const HOLD = 400;
/** Cadence of the rotating word carousel. */
const WORD_INTERVAL = 900;

/**
 * Full-screen intro overlay. Drives a requestAnimationFrame counter from
 * 0 → 100 over ~2.7s, cycles a set of rotating words, and fades itself out
 * before signalling completion. Mounting is owned by the parent; this only
 * animates an exit fade for a graceful unmount.
 */
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>();
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  // 0 → 100 counter, driven by requestAnimationFrame.
  useEffect(() => {
    let holdTimer: ReturnType<typeof setTimeout>;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      completeRef.current();
    };

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const progress = Math.min(1, (now - startRef.current) / DURATION);
      setCount(Math.round(progress * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        holdTimer = setTimeout(finish, HOLD);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    // Wall-clock safety net: rAF pauses entirely in a backgrounded tab, which
    // would otherwise hang the loader forever. setTimeout is only throttled, so
    // this guarantees the intro always completes.
    const safety = setTimeout(() => {
      setCount(100);
      finish();
    }, DURATION + HOLD + 250);

    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      clearTimeout(holdTimer);
      clearTimeout(safety);
    };
  }, []);

  // Rotating words.
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % LOADING_WORDS.length);
    }, WORD_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const word = LOADING_WORDS[wordIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex overflow-hidden bg-bg p-8 md:p-12"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Top-left label */}
      <motion.span
        className="absolute left-8 top-8 text-xs uppercase tracking-[0.3em] text-muted md:left-12 md:top-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Portfolio
      </motion.span>

      {/* Centered rotating words */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <span className="absolute bottom-8 right-8 font-display text-6xl tabular-nums text-text-primary md:bottom-12 md:right-12 md:text-8xl lg:text-9xl">
        {String(count).padStart(3, "0")}
      </span>

      {/* Bottom progress bar */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-stroke/50">
        <div
          className="accent-gradient h-full w-full origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137,170,204,0.35)",
            transition: "transform 0.1s linear",
          }}
        />
      </div>
    </motion.div>
  );
}
