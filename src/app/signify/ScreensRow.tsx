"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Screen = { src: string; alt: string; tall?: boolean };

/* Sophie's static screens from the Figma file, in its order. The agent panel
   runs a little taller than the rest. */
export const MY_SCREENS: Screen[] = [
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

/* Tania Cortez's updated UI for the final prototype: the main flow handed off to
   Lovable, then the states for when something goes wrong. */
export const FINAL_FLOW: Screen[] = [
  "Launch", "Home: who is talking?", "Share with a nearby person", "Share: what they get",
  "Live: signing", "Live: the agent checks a sign", "Speech: start", "Speech: conversation",
  "Agent settings", "Recap from Memory", "Memory", "Learn ASL",
  "Contribute: consent", "Messages", "Chat", "Community",
].map((alt, i) => ({ src: `/signify/final/flow-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const FINAL_STATES: Screen[] = [
  "Camera permission", "Camera access off", "Hands not in view", "No sign recognized",
  "Recognition unavailable", "Review your message", "Speaking", "Captions unavailable",
].map((alt, i) => ({ src: `/signify/final/state-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

/* Screens in rows (two to a row on phones). The first time they come into view
   they slide in one after another, alternately from below and from above; with
   reduced motion they're simply there. */
export default function ScreensRow({ screens = MY_SCREENS, cols = 5 }: { screens?: Screen[]; cols?: 4 | 5 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`grid grid-cols-2 ${cols === 4 ? "md:grid-cols-4" : "md:grid-cols-5"} items-start gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8`}>
      {screens.map((s, i) => (
        <div
          key={s.src}
          className="motion-reduce:opacity-100! motion-reduce:transform-none! motion-reduce:transition-none!"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : `translateY(${i % 2 === 0 ? 80 : -80}px)`,
            transitionProperty: "opacity, transform",
            transitionDuration: "0.7s, 0.9s",
            transitionTimingFunction: "var(--ease)",
            transitionDelay: `${(i % 8) * 0.06}s`,
          }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            width={466}
            height={s.tall ? 972 : 922}
            sizes={cols === 4 ? "(min-width: 768px) 280px, 50vw" : "(min-width: 768px) 220px, 50vw"}
            className="w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}
