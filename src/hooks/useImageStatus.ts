import { useEffect, useState } from "react";

export type ImageStatus = "idle" | "loading" | "ok" | "error";

/**
 * Loads an image URL in the background and reports whether it resolves.
 * Used to detect unreachable (e.g. private/404) GitHub assets so the UI can
 * fall back gracefully. Returns "idle" when no URL is given.
 */
export function useImageStatus(url?: string): ImageStatus {
  const [status, setStatus] = useState<ImageStatus>(url ? "loading" : "idle");

  useEffect(() => {
    if (!url) {
      setStatus("idle");
      return;
    }
    let active = true;
    setStatus("loading");

    const img = new Image();
    img.onload = () => active && setStatus("ok");
    img.onerror = () => active && setStatus("error");
    img.src = url;

    return () => {
      active = false;
    };
  }, [url]);

  return status;
}
