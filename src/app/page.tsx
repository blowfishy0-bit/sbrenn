"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, CASE_STUDY_SLUGS } from "@/lib/projects";

const FEATURED_SLUGS = CASE_STUDY_SLUGS;

/* One pastel per status label, so the dot colour reads as a legend. */
const STATUS_DOT: Record<string, string> = {
  Shipped: "#8FD9A8",     // mint
  Delivered: "#9EC5F0",   // soft blue
  Prototype: "#C9A9E9",   // lavender
  Interactive: "#F5B29A", // peach
};
const STATUS_DOT_FALLBACK = "#D6D6D6";

/* The hero video occupies this rect on the right of the intro card. A white
   copy of the intro text is clipped to the same rect and layered on top, so
   only the glyphs crossing the video read white. Keep the two in sync: the
   clip is the inset equivalent of the rect below. */
const HERO_VIDEO = { top: "18%", left: "60%", width: "40%", height: "64%" };
const HERO_VIDEO_CLIP = "inset(18% 0% 18% 60%)";

function IntroText({ color }: { color: string }) {
  return (
    <>
      <h1
        className="relative z-10 text-center font-light leading-snug"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", color }}
      >
        <span className="intro-line" style={{ "--delay": "0.05s" } as React.CSSProperties}>
          Sophie Brenner.
        </span>
        <span className="intro-line" style={{ "--delay": "0.2s" } as React.CSSProperties}>
          I ship B2B dashboards and
        </span>
        <span className="intro-line" style={{ "--delay": "0.35s" } as React.CSSProperties}>
          build{" "}
          <span
            style={{
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              textDecorationColor: "currentColor",
              textUnderlineOffset: "0.15em",
            }}
          >
            holograms that talk back
          </span>
          .
        </span>
      </h1>

      <p
        className="relative z-10 mt-6 text-center max-w-[52ch] leading-relaxed"
        style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)", color }}
      >
        <span className="intro-line" style={{ "--delay": "0.5s" } as React.CSSProperties}>
          Taking AI and 3D products from 0→1.
        </span>
        <span className="intro-line" style={{ "--delay": "0.65s" } as React.CSSProperties}>
          Research to shipped tools I design and build.
        </span>
      </p>
    </>
  );
}

export default function Home() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [hoverIndices, setHoverIndices] = useState<Record<string, number>>({});
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  /* iOS only honours autoplay on a video that is muted at the DOM-property
     level; React renders `muted` as a property, so the server HTML ships
     without the attribute and Safari falls back to a play button. Set it
     directly and kick off playback once mounted. */
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => {
      /* Blocked anyway (e.g. iOS Low Power Mode) — leave the first frame up. */
    });
  }, []);

const featuredProjects = FEATURED_SLUGS.map((s) => projects.find((p) => p.slug === s)!);

  return (
    <main
      className="px-6 md:px-[120px]"
      style={{
        paddingTop: "calc(var(--header-h) + 2rem)",
        paddingBottom: "4rem",
      }}
    >
      {/* Intro card — full viewport height, reserved for further development */}
      <section
        id="intro"
        className="relative overflow-hidden flex flex-col items-center justify-center mb-24 -mx-6 md:-mx-[120px] px-6 md:px-[120px]"
        style={{
          height: "calc(100svh - var(--header-h) - 2rem)",
          color: "var(--text)",
        }}
      >
        <video
          ref={heroVideoRef}
          src="/climbing.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          className="absolute object-cover pointer-events-none"
          style={{ ...HERO_VIDEO, zIndex: 0 }}
        />

        <IntroText color="var(--text)" />

        {/* White copy of the same text, clipped to the video rect. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 md:px-[120px] pointer-events-none"
          style={{ clipPath: HERO_VIDEO_CLIP }}
        >
          <IntroText color="#fff" />
        </div>
      </section>

      <section id="work" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
          {featuredProjects.map((p) => (
            <div
              key={p.slug}
            >
              {/* Image — only this is clickable */}
              <Link href={`/${p.slug}`} data-cursor-view>
                <div
                  className="relative overflow-hidden w-full"
                  style={{ aspectRatio: "3/2", background: (p.thumbWhiteBg && !(hoveredSlug === p.slug && p.hoverThumb)) || p.slug === "stylo-app" ? "#fff" : (hoveredSlug === p.slug && p.hoverThumbs && p.hoverThumbs[hoverIndices[p.slug] ?? 0]?.endsWith(".svg") ? "#fff" : "#f0f0f0") }}
                  onMouseEnter={() => {
                    if (p.hoverThumbs) {
                      setHoveredSlug(p.slug);
                      setHoverIndices((prev) => {
                        const cur = prev[p.slug] ?? 0;
                        return { ...prev, [p.slug]: (cur + 1) % p.hoverThumbs!.length };
                      });
                    } else if (p.hoverThumb) {
                      setHoveredSlug(p.slug);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredSlug(null);
                  }}
                >
                  {(() => {
                    const isHovered = hoveredSlug === p.slug;
                    const currentSrc = isHovered && p.hoverThumbs
                      ? p.hoverThumbs[hoverIndices[p.slug] ?? 0]
                      : isHovered && p.hoverThumb
                      ? p.hoverThumb
                      : p.thumb;
                    const useContain = p.thumbWhiteBg || p.thumbContain || currentSrc.endsWith(".svg");
                    return (
                      <Image
                        src={currentSrc}
                        alt={p.title}
                        fill
                        className={isHovered && p.hoverThumb && p.thumbWhiteBg ? "object-cover" : p.thumbWhiteBg ? "object-contain p-2" : useContain ? "object-contain" : "object-cover"}
                        style={p.slug === "stylo-app" && !currentSrc.endsWith(".svg") ? { objectFit: "contain", transform: "scale(1.15)", objectPosition: "center" } : undefined}
                        unoptimized
                        sizes="50vw"
                      />
                    );
                  })()}
                </div>
              </Link>

              {/* Text — not clickable */}
              <div className="mt-4 text-left">
                <h2 className="font-normal text-base leading-snug mb-1 flex items-baseline justify-between gap-4">
                  <span>
                    {p.logo && (
                      <Image
                        src={p.logo}
                        alt=""
                        width={18}
                        height={18}
                        unoptimized
                        className="inline-block mr-2"
                        style={{ verticalAlign: "-0.18em" }}
                      />
                    )}
                    {p.title}
                  </span>
                  {p.status && (
                    <span
                      className="shrink-0 whitespace-nowrap rounded-full"
                      style={{
                        color: "var(--text)",
                        border: "1px solid #dcdcdc",
                        padding: "3px 12px",
                      }}
                    >
                      <span
                        aria-hidden
                        className="inline-block rounded-full mr-[7px]"
                        style={{
                          width: 8,
                          height: 8,
                          background: STATUS_DOT[p.status] ?? STATUS_DOT_FALLBACK,
                          verticalAlign: "middle",
                          position: "relative",
                          top: "-1px",
                        }}
                      />
                      {p.status}
                    </span>
                  )}
                </h2>
                <p className="text-2xl leading-snug" style={{ color: "var(--text)" }}>{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
