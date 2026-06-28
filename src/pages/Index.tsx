import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSiteMeta } from "@/hooks/useSiteMeta";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import RecentProjects from "@/components/RecentProjects";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  // Sync the browser tab title + favicon with the central site config.
  useSiteMeta();

  // Lock scroll while the loading screen is visible.
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        <Hero />
        <SelectedWorks />
        <RecentProjects />
        <Stats />
        <Contact />
      </motion.main>
    </>
  );
}
