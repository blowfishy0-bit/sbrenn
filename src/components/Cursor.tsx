"use client";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      setHovered(!!(e.target as Element).closest("[data-cursor-hover]"));
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: hovered ? "#BCBAA9" : "#111",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 99999,
        transition: "background 0.2s ease",
      }}
    />
  );
}
