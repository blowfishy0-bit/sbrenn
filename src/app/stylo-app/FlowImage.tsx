"use client";
import { useState } from "react";
import Image from "next/image";

export default function FlowImage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden flow-wrap"
        onClick={() => setOpen(true)}
        style={{ background: "#f0f0f0", cursor: "pointer" }}
      >
        <Image
          src="/flow.png"
          alt="Stylo user flow diagram"
          width={1200}
          height={600}
          style={{ width: "100%", height: "auto", display: "block" }}
          unoptimized
        />
      </div>

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
            <Image
              src="/flow.png"
              alt="Stylo user flow diagram"
              width={1200}
              height={600}
              style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }}
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}
