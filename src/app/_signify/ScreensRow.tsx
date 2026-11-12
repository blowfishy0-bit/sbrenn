"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* The static screens from the Figma file, in its order. The agent panel runs a
   little taller than the rest. */
const SCREENS = [
  { src: "/signify/screens/01.jpg", alt: "Home, signing" },
  { src: "/signify/screens/02.jpg", alt: "Home, speech" },
  { src: "/signify/screens/03.jpg", alt: "Conversation: the agent asks which sign Sam meant" },
  { src: "/signify/screens/04.jpg", alt: "Agent panel", tall: true },
  { src: "/signify/screens/05.jpg", alt: "Conversation in speech mode" },
  { src: "/signify/screens/06.jpg", alt: "Recap" },
  { src: "/signify/screens/07.jpg", alt: "Messages" },
  { src: "/signify/screens/08.jpg", alt: "Chat with Candace" },
  { src: "/signify/screens/09.jpg", alt: "Community" },
  { src: "/signify/screens/10.jpg", alt: "Memory" },
];

/* The screens in two rows of five (two to a row on phones). The first time they
   come into view they slide in one after another, alternately from below and
   from above; with reduced motion they're simply there. */
export default function ScreensRow() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-5 items-start gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8">
      {SCREENS.map((s, i) => (
        <div
          key={s.src}
          className="motion-reduce:opacity-100! motion-reduce:transform-none! motion-reduce:transition-none!"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : `translateY(${i % 2 === 0 ? 80 : -80}px)`,
            transition: "opacity 0.7s var(--ease), transform 0.9s var(--ease)",
            transitionDelay: `${i * 0.08}s`,
          }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            width={466}
            height={s.tall ? 972 : 922}
            sizes="(min-width: 768px) 220px, 50vw"
            className="w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}
