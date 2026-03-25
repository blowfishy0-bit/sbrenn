"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, CASE_STUDY_SLUGS } from "@/lib/projects";

const FEATURED_SLUGS = CASE_STUDY_SLUGS;

export default function Home() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [hoverIndices, setHoverIndices] = useState<Record<string, number>>({});

const featuredProjects = FEATURED_SLUGS.map((s) => projects.find((p) => p.slug === s)!);

  return (
    <main
      className="px-6 md:px-[120px]"
      style={{
        paddingTop: "calc(var(--header-h) + 2rem)",
        paddingBottom: "4rem",
      }}
    >
      <section id="work" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
          {featuredProjects.map((p) => (
            <div
              key={p.slug}
            >
              {/* Image — only this is clickable */}
              <Link href={`/${p.slug}`} data-cursor-hover="true">
                <div
                  className="relative overflow-hidden w-full"
                  style={{ aspectRatio: "3/2", background: p.thumbWhiteBg || p.slug === "stylo-app" ? "#fff" : (hoveredSlug === p.slug && p.hoverThumbs && p.hoverThumbs[hoverIndices[p.slug] ?? 0]?.endsWith(".svg") ? "#fff" : "#f0f0f0") }}
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
                        className={p.thumbWhiteBg ? "object-contain p-2" : useContain ? "object-contain" : "object-cover"}
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
                <h2 className="font-normal text-xl leading-snug mb-1">{p.title}</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
