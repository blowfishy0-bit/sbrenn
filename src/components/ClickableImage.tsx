"use client";
import { useState } from "react";

export default function ClickableImage({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ ...style, cursor: "pointer" }}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", zIndex: 102, padding: 8 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "95vw", maxWidth: 1400 }}>
            <img
              src={src}
              alt={alt}
              style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }}
            />
          </div>
        </div>
      )}
    </>
  );
}
