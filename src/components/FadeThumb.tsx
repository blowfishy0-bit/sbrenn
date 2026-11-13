"use client";

import { useEffect, useRef, useState } from "react";

/* A card thumbnail that slowly crossfades between its images on its own (no
   hover). It only runs while on screen; with reduced motion it shows the first
   image, still. */
export default function FadeThumb({
  srcs, alt, hold = 2600, fade = 900,
}: {
  srcs: string[]; alt: string; hold?: number; fade?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || srcs.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % srcs.length), hold + fade);
    return () => clearInterval(t);
  }, [visible, srcs.length, hold, fade]);

  return (
    <div ref={ref} className="absolute inset-0">
      {srcs.map((s, k) => (
        <img
          key={s}
          src={s}
          alt={k === 0 ? alt : ""}
          aria-hidden={k === 0 ? undefined : true}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: k === i ? 1 : 0, transition: `opacity ${fade}ms ease` }}
        />
      ))}
    </div>
  );
}
