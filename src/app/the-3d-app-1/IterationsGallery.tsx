"use client";
import { useState } from "react";

const SLIDES = ["/sketch-2.png", "/sketch-3.png", "/sketch-4.svg"];

export default function IterationsGallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SLIDES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Iteration ${i + 1}`}
            onClick={() => setOpen(i)}
            className="w-full block rounded-xl"
            style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.12))", cursor: "pointer" }}
          />
        ))}
      </div>

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
          <button
            onClick={() => setOpen(null)}
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", zIndex: 102, padding: 8 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>

          {open > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(open - 1); }}
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 102 }}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}

          {open < SLIDES.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(open + 1); }}
              style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 102 }}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}

          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "80vw", maxHeight: "80vh" }}>
            <img src={SLIDES[open]} alt={`Iteration ${open + 1}`} style={{ maxWidth: "80vw", maxHeight: "80vh", objectFit: "contain", borderRadius: 16 }} />
          </div>
        </div>
      )}
    </>
  );
}
