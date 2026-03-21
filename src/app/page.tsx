"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, CASE_STUDY_SLUGS } from "@/lib/projects";

const FEATURED_SLUGS = CASE_STUDY_SLUGS;

export default function Home() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

const featuredProjects = FEATURED_SLUGS.map((s) => projects.find((p) => p.slug === s)!);

  return (
    <main
      style={{
        paddingTop: "calc(var(--header-h) + 2rem)",
        paddingBottom: "4rem",
        paddingLeft: "120px",
        paddingRight: "120px",
      }}
    >
      <section id="work">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10">
          {featuredProjects.map((p) => (
            <div
              key={p.slug}
            >
              {/* Image — only this is clickable */}
              <Link href={`/${p.slug}`} data-cursor-hover="true">
                <div
                  className="relative overflow-hidden w-full"
                  style={{ aspectRatio: "3/2", background: p.thumbWhiteBg ? "#fff" : "#f0f0f0" }}
                  onMouseEnter={() => p.hoverThumb && setHoveredSlug(p.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                >
                  <Image
                    src={p.hoverThumb && hoveredSlug === p.slug ? p.hoverThumb : p.thumb}
                    alt={p.title}
                    fill
                    className={p.thumbWhiteBg ? "object-contain p-6" : "object-cover"}
                    unoptimized
                    sizes="50vw"
                  />
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
