"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, CASE_STUDY_SLUGS } from "@/lib/projects";
import AutoVideo from "@/components/AutoVideo";

const FEATURED_SLUGS = CASE_STUDY_SLUGS;

/* One pastel per status label, so the dot colour reads as a legend. */
const STATUS_DOT: Record<string, string> = {
  Shipped: "#8FD9A8",     // mint
  Delivered: "#9EC5F0",   // soft blue
  Prototype: "#C9A9E9",   // lavender
  Interactive: "#F5B29A", // peach
};
const STATUS_DOT_FALLBACK = "#D6D6D6";

/* The hero is a black band: white text on the left, the holomaid climbing up
   its right side. */
/* Where the climbing clip is looped (seconds), before she leaves its frame. */
const CLIMB_END = 2.8;


function IntroText() {
  return (
    <div className="relative z-10 text-left">
      {/* The type scales with the room the text has, so each line stays on one
          row: the full width when stacked (below lg), the column left of the
          images when side by side. */}
      <h1 className="font-light leading-snug text-[clamp(1.25rem,6.2vw,2.25rem)] lg:text-[clamp(1.75rem,calc(4.3vw_-_0.9rem),3.25rem)]">
        <span className="intro-line" style={{ "--delay": "0.05s" } as React.CSSProperties}>
          Sophie Brenner
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
        className="mt-4 lg:mt-6 max-w-[52ch] leading-relaxed [text-wrap:balance]"
        style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)" }}
      >
        <span className="intro-line" style={{ "--delay": "0.5s" } as React.CSSProperties}>
          Product designer taking AI and 3D products from idea to shipped.
        </span>
      </p>
    </div>
  );
}

export default function Home() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [hoverIndices, setHoverIndices] = useState<Record<string, number>>({});
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroVideoBlocked, setHeroVideoBlocked] = useState(false);

  /* iOS only honours autoplay on a video muted at the DOM-property level, so
     set it directly rather than relying on the rendered attribute. When
     playback is refused anyway — Low Power Mode always refuses — swap the
     <video> out for a still. An <img> cannot draw a play affordance, which a
     paused inline video on iOS otherwise can. */
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => setHeroVideoBlocked(true));
    /* The clip ends with her climbing out of the top of the frame in a white
       flash; loop it just before, so she climbs from mid-hero up to the top. */
    let raf = 0;
    const loop = () => {
      if (v.currentTime >= CLIMB_END) v.currentTime = 0;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
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
      {/* Intro — a black band from the header down: white text on the left, the
          holomaid climbing up the right side (its black background blends into
          the band). It ends in a hard edge against the white page. */}
      <section
        id="intro"
        data-cursor-light
        className="relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between pt-[calc(var(--header-h)+4rem)] lg:pt-[var(--header-h)] mb-24 -mx-6 md:-mx-[120px] px-6 md:px-[120px]"
        style={{
          /* the band runs up behind the header (past main's top padding), so when
             the header slides away on scroll the strip it leaves is black too; its
             content still starts below the header */
          marginTop: "calc(-1 * (var(--header-h) + 2rem))",
          minHeight: "100svh",
          background: "#000",
          color: "#fff",
        }}
      >
        <IntroText />

        {/* The holomaid on the right, her clip as tall as the hero so she climbs
            from low in the band right up to its top. Screen blending drops the clip's
            own black, so no box shows against the band. */}
        <div
          aria-hidden="true"
          className="absolute top-[var(--header-h)] bottom-0 right-[-14%] lg:right-[6%] pointer-events-none"
          style={{ aspectRatio: "9 / 16", zIndex: 1, mixBlendMode: "screen" }}
        >
          {heroVideoBlocked ? (
            <Image
              src="/climbing-poster.jpg"
              alt=""
              width={720}
              height={1280}
              priority
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <video
              ref={heroVideoRef}
              src="/climbing.mp4"
              poster="/climbing-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

      </section>

      <section id="work" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
          {featuredProjects.map((p) => (
            <div
              key={p.slug}
            >
              {/* Image — only this is clickable */}
              <Link
                href={p.href ?? `/${p.slug}`}
                {...(p.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-cursor-view
              >
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
                  {p.thumbVideo ? (
                    <AutoVideo
                      src={p.thumbVideo}
                      poster={p.thumb}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{}}
                    />
                  ) : (() => {
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
