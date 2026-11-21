import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { PLACEHOLDER_IMAGE } from "../data/projects";

/**
 * Lazy-loaded <img> that falls back to a neutral placeholder if the file is
 * missing, so a project with no media yet never shows a broken image.
 */
export default function MediaImage({
  src,
  alt,
  loading = "lazy",
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  const [current, setCurrent] = useState(src);
  useEffect(() => setCurrent(src), [src]);

  return (
    <img
      src={current}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => current !== PLACEHOLDER_IMAGE && setCurrent(PLACEHOLDER_IMAGE)}
      {...rest}
    />
  );
}
