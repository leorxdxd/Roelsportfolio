import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "../lib/hooks";

/** Number that counts up when scrolled into view. Screen readers get the final value. */
export default function CountUp({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {value}
        {suffix}
      </span>
      <span className="visually-hidden">
        {to}
        {suffix}
      </span>
    </>
  );
}
