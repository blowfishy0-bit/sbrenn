import Image from "next/image";
import ProjectLayout from "@/components/ProjectLayout";
import { cargoImg } from "@/lib/cargo";

const imgs = {
  mockup: cargoImg("N2735218665335836108730808036606", "MacBook-Pro-14_---3.png"),
  screenshot: cargoImg("M2735218823756474213748437314814", "screencapture-spareroom-roommate-2026-01-07-21_30_55.png"),
  system: cargoImg("B2735912585675688645567594261758", "Untitled.png"),
};

export const metadata = {
  title: "SpareRoom Redesign — Sophie Brenner",
};

export default function UIRedesign() {
  return (
    <ProjectLayout slug="ui-redesign-1">
      <h2 className="font-light tracking-tight mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
        SpareRoom UI / UX Redesign
      </h2>

      <div className="mb-10 max-w-xl">
        <p className="text-base mb-2">
          <strong>Role:</strong> UX/UI Designer
        </p>
        <p className="text-base leading-relaxed" style={{ color: "#333" }}>
          <strong>Focus:</strong> Streamlining search efficiency and decluttering Information
          Architecture.
        </p>
      </div>

      {/* Two-column image layout */}
      <div className="grid md:grid-cols-[3fr_2fr] gap-6 mb-10">
        <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          <Image
            src={imgs.mockup}
            alt="SpareRoom mockup"
            width={1512}
            height={2441}
            className="w-full h-auto"
          />
        </div>
        <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          <Image
            src={imgs.screenshot}
            alt="SpareRoom original screenshot"
            width={2880}
            height={9980}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Full-width design system */}
      <div className="mb-10 rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
        <Image
          src={imgs.system}
          alt="Design system"
          width={2656}
          height={2371}
          className="w-full h-auto"
        />
      </div>

      {/* Highlights */}
      <div className="max-w-2xl text-sm leading-loose" style={{ color: "#333" }}>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Componentization:</strong> Building scalable, atomic UI elements.
          </li>
          <li>
            <strong>Variables &amp; Tokens:</strong> Managing color, spacing, styles, and
            typography.
          </li>
          <li>
            <strong>Accessibility (WCAG):</strong> Designing for screen readers, high-contrast
            ratios, and inclusive UX.
          </li>
        </ul>
      </div>
    </ProjectLayout>
  );
}
