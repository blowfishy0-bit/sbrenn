"use client";
import { useState } from "react";
import Image from "next/image";

const SCREENS = [
  "/stylo/c2.svg",
  "/stylo/c3.svg",
  "/stylo/c4.svg",
  "/stylo/c5.svg",
  "/stylo/c6.svg",
  "/stylo/c7.svg",
];

export default function ScreenCarousel() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-6" style={{ gap: 10, background: "#fff", padding: "0 16px" }}>
        {SCREENS.map((src, i) => (
          <div
            key={i}
            onClick={() => setOpen(i)}
            style={{ position: "relative", aspectRatio: "9/16", borderRadius: 12, overflow: "hidden", background: "#fff", cursor: "pointer" }}
          >
            <Image src={src} alt={`Screen ${i + 1}`} fill style={{ objectFit: "contain" }} unoptimized />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          onClick={() => setOpen(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(null)}
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", zIndex: 102, padding: 8 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>

          {/* Left arrow */}
          {open > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(open - 1); }}
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 102 }}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}

          {/* Right arrow */}
          {open < SCREENS.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(open + 1); }}
              style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 102 }}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: "80vw", maxWidth: 400, aspectRatio: "9/16", borderRadius: 16, overflow: "hidden" }}
          >
            <Image src={SCREENS[open]} alt={`Screen ${open + 1}`} fill style={{ objectFit: "contain" }} unoptimized />
          </div>
        </div>
      )}
    </>
  );
}
