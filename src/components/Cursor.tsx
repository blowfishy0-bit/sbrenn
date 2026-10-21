"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NATIVE_CURSOR_PATHS = ["/beadle", "/knit"];

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [view, setView] = useState(false);
  const pathname = usePathname();

  // Reset to the dot on navigation — otherwise "View" stays stuck until the
  // next mousemove fires on the new page.
  useEffect(() => {
    setView(false);
  }, [pathname]);

  useEffect(() => {
    const last = { x: -100, y: -100 };

    const updateView = (target: Element | null, x: number, y: number) => {
      const el = target?.closest?.("[data-cursor-view]") as HTMLElement | null;
      if (!el) {
        setView(false);
        return;
      }
      // For rows marked with data-cursor-edge (Experience), revert to the dot near
      // the dividing lines (top/bottom edges). Everything else shows "View" fully.
      if (el.hasAttribute("data-cursor-edge")) {
        const rect = el.getBoundingClientRect();
        const edgeDist = Math.min(y - rect.top, rect.bottom - y);
        setView(edgeDist > 10);
      } else {
        setView(true);
      }
    };

    const onMove = (e: MouseEvent) => {
      last.x = e.clientX;
      last.y = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
      updateView(e.target as Element, e.clientX, e.clientY);
    };

    // Scrolling slides content under a still pointer without firing
    // mousemove, so recheck what's under it or "View" goes stale.
    const onScroll = () => {
      updateView(document.elementFromPoint(last.x, last.y), last.x, last.y);
    };

    document.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, []);

  // Full-window embeds (Beadle, Sparkling Yuzu) keep the system cursor: the
  // dot can't follow the pointer inside a cross-origin iframe.
  const native = NATIVE_CURSOR_PATHS.includes(pathname);
  useEffect(() => {
    document.documentElement.toggleAttribute("data-native-cursor", native);
  }, [native]);

  if (native) return null;

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
