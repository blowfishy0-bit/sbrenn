"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ULine({
  href,
  children,
  style,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`relative inline-block ${className}`}
      style={{ ...style, width: "150px" }}
    >
      {children}
      <span
        className="absolute left-0 bottom-0 w-full h-px"
        style={{ background: "#111" }}
      />
    </a>
  );
}

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 1);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: "var(--header-h)",
          background: "#fff",
          borderBottom: "1px solid #111",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.38s cubic-bezier(0.25,1,0.5,1)",
          willChange: "transform",
        }}
      >
        <div
          className="h-full grid items-center px-6 md:px-[120px]"
          style={{
            gridTemplateColumns: "1fr auto 1fr",
            gap: "24px",
          }}
        >
          {/* Left — name + subtitle */}
          <div className="flex flex-col gap-[6px]">
            <ULine href="/" style={{ fontSize: "15px", fontWeight: 500, color: "#111", lineHeight: 1.4 }}>
              Sophie Brenner
            </ULine>
            <span
              className="relative inline-block"
              style={{ fontSize: "15px", fontWeight: 400, color: "#111", lineHeight: 1.4, width: "150px" }}
            >
              Product Designer
              <span className="absolute left-0 bottom-0 w-full h-px" style={{ background: "#111" }} />
            </span>
          </div>

          {/* Center — hidden on mobile */}
          <div className="hidden md:block" />

          {/* Right — nav stacked */}
          <nav className="hidden md:flex flex-col items-end gap-[6px]">
            <ULine
              href={isHome ? "#work" : "/#work"}
              className="nav-hover"
              style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.4, textAlign: "right" }}
            >
              Work ↗
            </ULine>
            <ULine
              href="/about"
              className="nav-hover"
              style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.4, textAlign: "right" }}
            >
              About ↗
            </ULine>
          </nav>

          {/* Hamburger (mobile only) */}
          <div className="md:hidden flex justify-end col-start-3">
            <button
              className="flex flex-col gap-[5px] p-1"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className="block w-[18px] h-px transition-transform duration-300" style={{ background: "#111", transform: menuOpen ? "translateY(6px) rotate(45deg)" : "" }} />
              <span className="block w-[18px] h-px transition-opacity duration-300" style={{ background: "#111", opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-[18px] h-px transition-transform duration-300" style={{ background: "#111", transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed z-40 left-0 right-0 flex flex-col gap-4 md:hidden"
          style={{ top: "var(--header-h)", background: "#fff", padding: "24px 40px", borderBottom: "1px solid #e0e0e0" }}
        >
          {[
            { label: "Work ↗", href: isHome ? "#work" : "/#work" },
            { label: "About ↗", href: "/about" },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{ fontSize: "15px", color: "#111" }} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
