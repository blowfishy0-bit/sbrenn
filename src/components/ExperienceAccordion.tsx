"use client";

import { useState } from "react";

type ExperienceItem = {
  role: string;
  org: string;
  date: string;
  points: string[];
};

function Item({ x }: { x: ExperienceItem }) {
  // Bumped every time the panel opens so the <ul> remounts and the
  // reveal-down animation replays on each open (not just the first).
  const [openCount, setOpenCount] = useState(0);

  return (
    <details
      className="group border-b"
      style={{ borderColor: "#666" }}
      onToggle={(e) => {
        if (e.currentTarget.open) setOpenCount((c) => c + 1);
      }}
    >
      <summary data-cursor-view data-cursor-edge className="flex items-start justify-between gap-4 py-4 list-none cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <span className="flex flex-col gap-0.5 text-[1.25rem] leading-tight">
          <span style={{ color: "#111" }}>{x.org}</span>
          <span style={{ color: "#666" }}>{x.role}</span>
          <span className="font-[family-name:var(--font-mono)] text-[0.72rem] mt-1" style={{ color: "#999" }}>
            {x.date}
          </span>
        </span>
        <span className="relative shrink-0 mt-[0.4rem] w-[20px] h-[20px]" aria-hidden>
          {/* horizontal bar — always visible */}
          <span className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 rounded-full bg-[#111] transition-colors duration-200 group-hover:bg-[#BCBAA9]" />
          {/* vertical bar — subtly fades out to leave a minus */}
          <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-[#111] transition-[opacity,background-color] duration-150 ease-out group-hover:bg-[#BCBAA9] group-open:opacity-0" />
        </span>
      </summary>
      <ul key={openCount} className="reveal-down pb-5 space-y-1.5 text-[1.0625rem] leading-relaxed" style={{ color: "#666" }}>
        {x.points.map((p, i) => (
          <li key={i} className="pl-4 relative">
            <span className="absolute left-0">•</span>
            {p}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function ExperienceAccordion({ experience }: { experience: ExperienceItem[] }) {
  return (
    <div className="border-t" style={{ borderColor: "#666" }}>
      {experience.map((x) => (
        <Item key={x.role + x.org} x={x} />
      ))}
    </div>
  );
}
