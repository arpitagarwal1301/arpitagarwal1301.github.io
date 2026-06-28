import { useEffect, useRef } from "react";
import Hls from "hls.js";

/**
 * Attaches an HLS (.m3u8) stream to a <video> element.
 * Uses hls.js when MSE is supported, otherwise falls back to the
 * browser's native HLS support (Safari / iOS).
 *
 * Usage:
 *   const videoRef = useHlsVideo(HLS_SRC);
 *   <video ref={videoRef} autoPlay muted loop playsInline />
 */
export function useHlsVideo(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          /* autoplay can be blocked — video is muted so this is rare */
        });
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      hls?.destroy();
    };
  }, [src]);

  return videoRef;
}
