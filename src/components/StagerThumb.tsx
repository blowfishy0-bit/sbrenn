"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400"] });

/* The 3D AI Stager card: the prompt bar from the thumbnail comes alive. A
   prompt types itself into the box, the send arrow turns black, it's pressed,
   the arrow shoots off and back, and the prompt slides away as if sent. Then it
   starts again. It only runs while on screen; with reduced motion it shows the
   typed prompt and black arrow, still.

   Everything is placed in the thumbnail's own pixels (1280 × 854), as
   percentages, so it stays lined up at any card size. */
const W = 1280;
const H = 854;
const px = (x: number) => `${(x / W) * 100}%`;
const py = (y: number) => `${(y / H) * 100}%`;

const PROMPT = "Redesign this bedroom in a Scandi style";

type Phase = "idle" | "typing" | "ready" | "press" | "sent";

/* Where the zoom is anchored while zoomed out: on the button as it zooms out
   after sending, back at the start of the text box before the next prompt. */
const originXRest = (phase: Phase) => (phase === "sent" ? 1178 : 140);

export default function StagerThumb({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [reduced, setReduced] = useState(false);

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

    const run = () => {
      setTyped(0);
      setPhase("idle");
      let t = 900;
      at(t, () => setPhase("typing"));
      for (let i = 1; i <= PROMPT.length; i++) {
        t += 45 + (PROMPT[i - 1] === " " ? 40 : 0);
        at(t, () => setTyped(i));
      }
      at((t += 50), () => setPhase("ready"));
      at((t += 1000), () => setPhase("press"));
      at((t += 650), () => setPhase("sent"));
      at((t += 1100), run);
    };
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [visible, reduced]);

  const showTyped = reduced ? PROMPT.length : typed;
  const showPhase: Phase = reduced ? "ready" : phase;
  const hasText = showTyped > 0 && showPhase !== "sent";
  const dark = hasText || showPhase === "press";
  const pressed = showPhase === "press";
  const sent = showPhase === "sent";

  /* The camera: zoomed out while idle; while typing it zooms in on the text
     and slides right along with it, then slides on to the send button for the
     press, and zooms back out as the prompt is sent. Done by moving the zoom's
     origin, which the browser animates as a pan. */
  const ZOOM = 1.8;
  const zoomed = !reduced && (phase === "typing" || phase === "ready" || phase === "press");
  const originX = phase === "typing" ? 140 + (typed / PROMPT.length) * 760 : 1178;
  const camera: React.CSSProperties = {
    transform: zoomed ? `scale(${ZOOM})` : "scale(1)",
    transformOrigin: `${px(zoomed ? originX : originXRest(phase))} ${py(418)}`,
    transition: phase === "typing"
      ? "transform 0.9s cubic-bezier(.6,0,.2,1), transform-origin 0.3s linear"
      : "transform 0.9s cubic-bezier(.6,0,.2,1), transform-origin 0.8s cubic-bezier(.6,0,.2,1)",
  };

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" style={{ containerType: "inline-size" }}>
     <div className="absolute inset-0" style={camera}>
      <Image src={src} alt={alt} fill unoptimized sizes="50vw" className="object-cover" />

      {/* The text box: a white patch over the static placeholder, then either
          the placeholder or the prompt being typed. */}
      <div
        aria-hidden
        className={`absolute flex items-center overflow-hidden ${jakarta.className}`}
        style={{
          left: px(132), top: py(390), width: px(1000), height: py(58),
          background: "#fff",
          fontSize: "2.2cqw",
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="absolute"
          style={{
            left: px(6),
            color: "#a3a3a3",
            opacity: showPhase === "idle" ? 1 : 0,
            transition: showPhase === "idle" ? "opacity 0.3s ease" : "none",
          }}
        >
          Describe changes, select a style, or paint areas to edit...
        </span>
        <span
          className="absolute"
          style={{
            left: px(6),
            color: "#1a1a1a",
            transform: sent ? "translateY(-140%)" : "none",
            opacity: sent ? 0 : 1,
            transition: sent ? "transform 0.55s cubic-bezier(.5,0,.2,1), opacity 0.45s ease" : "none",
          }}
        >
          {PROMPT.slice(0, sent ? PROMPT.length : showTyped)}
          {!sent && showTyped > 0 && (
            <span className="stager-caret" style={{ display: "inline-block", width: "0.08em", height: "1.1em", marginLeft: "0.06em", verticalAlign: "-0.2em", background: "#1a1a1a" }} />
          )}
        </span>
      </div>

      {/* The send button, over the grey one in the thumbnail. */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{ left: px(1140), top: py(380), width: px(76), aspectRatio: "1", background: "#fff" }}
      />
      <div
        aria-hidden
        className="absolute rounded-full overflow-hidden flex items-center justify-center"
        style={{
          left: px(1146.5), top: py(386), width: px(63), aspectRatio: "1",
          background: dark ? "#111" : "#d3d3d3",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          transform: pressed ? "scale(0.86)" : "scale(1)",
          transition: "background 0.3s ease, transform 0.18s ease",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="46%"
          height="46%"
          fill="none"
          stroke="#fff"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={pressed ? "stager-arrow-go" : undefined}
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>

     </div>

      <style>{`
        .stager-caret { animation: stager-blink 0.9s steps(1) infinite; }
        @keyframes stager-blink { 50% { opacity: 0; } }
        .stager-arrow-go { animation: stager-arrow 0.6s cubic-bezier(.6,0,.3,1) both; }
        @keyframes stager-arrow {
          0%   { transform: translateX(0); opacity: 1; }
          45%  { transform: translateX(160%); opacity: 1; }
          46%  { transform: translateX(-160%); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
