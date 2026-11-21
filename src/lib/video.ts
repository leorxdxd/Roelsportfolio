import { useEffect, useState } from "react";
import type { ResolvedVideo } from "../data/projects";

export type VideoStatus = "checking" | "ready" | "missing";

const cache = new Map<string, Promise<boolean>>();

/**
 * Checks whether a local video file exists. Missing files on Netlify / Vite
 * fall back to index.html (text/html), so we look at the content type.
 */
function checkVideo(url: string): Promise<boolean> {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url, { method: "HEAD" })
      .then((r) => r.ok && (r.headers.get("content-type") ?? "").startsWith("video/"))
      .catch(() => false);
    cache.set(url, p);
  }
  return p;
}

export function useVideoStatus(video: ResolvedVideo | undefined, enabled = true): VideoStatus {
  const remote = !!video && (video.youtubeId !== null || video.external);
  const [status, setStatus] = useState<VideoStatus>(remote ? "ready" : "checking");

  useEffect(() => {
    if (!video) return;
    if (remote) {
      setStatus("ready");
      return;
    }
    if (!enabled) return;
    let alive = true;
    setStatus("checking");
    checkVideo(video.url).then((ok) => alive && setStatus(ok ? "ready" : "missing"));
    return () => {
      alive = false;
    };
  }, [video, remote, enabled]);

  return status;
}
