"use client";

import { useEffect, useRef, useState } from "react";

/* The Mosambi card: the five onboarding phones slide in one after another,
   alternately from below and above, hold, then the card fades to the Mosambi
   logo, holds, and fades back as the phones slide in again. It only runs while
   on screen; with reduced motion the phones simply sit there.

   The phones are cut from the thumbnail (2984 × 1940) and placed back at their
   own spots in it, as percentages, so the layout matches the old still. */
const W = 2984;
const H = 1940;
const PHONE_W = 574;
const PHONE_H = 1142;
const PHONES = [
  { x: 29,   y: 476 },
  { x: 616,  y: 350 },
  { x: 1201, y: 476 },
  { x: 1785, y: 350 },
  { x: 2373, y: 476 },
];

type Phase = "out" | "in";

export default function MosambiThumb({ alt }: { alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState<Phase>("out");
  /* phones snap back to their start offset without animating while the logo covers them */
  const [snap, setSnap] = useState(false);
  const [logoUp, setLogoUp] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(() => !cancelled && fn(), ms));

    const cycle = () => {
      setSnap(false);
      setLogoUp(false);                     // the logo fades out...
      setPhase("in");                       // ...as the phones slide in
      at(1550, () => setLogoUp(true));     // fade to the logo
      at(2080, () => setSnap(true));        // under the logo, reset the phones
      at(2120, () => setPhase("out"));
      at(2650, cycle);
    };
    setSnap(true);
    setPhase("out");
    at(60, cycle);
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [visible, reduced]);

  const shown = reduced || phase === "in";
  const logo = !reduced && logoUp;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" style={{ background: "#fff" }}>
      {/* the phones, in a box with the thumbnail's own proportions, fitted to the card */}
      <div className="absolute inset-2 flex items-center justify-center">
        <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}`, maxHeight: "100%" }}>
          {PHONES.map((p, i) => (
            <img
              key={i}
              src={`/mosambi-thumb/phone-${i + 1}.jpg`}
              alt={i === 0 ? alt : ""}
              aria-hidden={i === 0 ? undefined : true}
              className="absolute"
              style={{
                left: `${(p.x / W) * 100}%`,
                top: `${(p.y / H) * 100}%`,
                width: `${(PHONE_W / W) * 100}%`,
                height: `${(PHONE_H / H) * 100}%`,
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : `translateY(${i % 2 === 0 ? 30 : -30}%)`,
                /* longhands only: React warns when the transition shorthand and
                   transitionDelay are mixed on a rerender */
                transitionProperty: snap ? "none" : "opacity, transform",
                transitionDuration: "0.6s, 0.8s",
                transitionTimingFunction: "var(--ease)",
                transitionDelay: snap ? "0s" : `${i * 0.08}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* the logo, faded over the whole card */}
      <img
        src="/mosambi.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: logo ? 1 : 0, transition: "opacity 0.5s ease" }}
      />
    </div>
  );
}
