import { useEffect, useRef, useState } from "react";
import { PLACEHOLDER_IMAGE } from "../data/projects";

interface Props {
  src: string;
  poster: string;
  title: string;
}

/**
 * Demo video that only starts loading when scrolled near the viewport.
 * Uses native controls, a poster image, and preload="metadata".
 * If demo.mp4 is missing it shows the poster with a "coming soon" badge.
 */
export default function DemoVideo({ src, poster, title }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterSrc, setPosterSrc] = useState(poster);

  useEffect(() => {
    setFailed(false);
    setPosterSrc(poster);
  }, [src, poster]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fall back if the poster image itself is missing
  useEffect(() => {
    const img = new Image();
    img.onerror = () => setPosterSrc(PLACEHOLDER_IMAGE);
    img.src = poster;
  }, [poster]);

  return (
    <div className="video-frame" ref={frameRef}>
      {failed ? (
        <div className="video-placeholder">
          <img src={posterSrc} alt="" loading="lazy" decoding="async" />
          <span className="video-placeholder__badge">Demo video coming soon</span>
        </div>
      ) : (
        <video
          controls
          playsInline
          preload="metadata"
          poster={posterSrc}
          src={inView ? src : undefined}
          onError={() => setFailed(true)}
          aria-label={`${title} demo video`}
          width={1280}
          height={720}
        >
          Your browser does not support embedded videos.
        </video>
      )}
    </div>
  );
}
