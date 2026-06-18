"use client";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [view, setView] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const el = (e.target as Element).closest?.("[data-cursor-view]") as HTMLElement | null;
      if (!el) {
        setView(false);
        return;
      }
      // For rows marked with data-cursor-edge (Experience), revert to the dot near
      // the dividing lines (top/bottom edges). Everything else shows "View" fully.
      if (el.hasAttribute("data-cursor-edge")) {
        const rect = el.getBoundingClientRect();
        const edgeDist = Math.min(e.clientY - rect.top, rect.bottom - e.clientY);
        setView(edgeDist > 10);
      } else {
        setView(true);
      }
    };

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="hidden md:flex items-center justify-center"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        background: "#000",
        pointerEvents: "none",
        zIndex: 99999,
        overflow: "hidden",
        borderRadius: 9999,
        width: view ? 54 : 16,
        height: view ? 26 : 16,
        transition:
          "width 0.24s cubic-bezier(0.22, 1, 0.36, 1), height 0.24s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <span
        style={{
          color: "#fff",
          fontSize: 11,
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          opacity: view ? 1 : 0,
          transition: "opacity 0.18s ease",
        }}
      >
        View
      </span>
    </div>
  );
}
