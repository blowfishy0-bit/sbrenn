import Image from "next/image";
import ProjectLayout from "@/components/ProjectLayout";
import { cargoImg, cargoOriginal } from "@/lib/cargo";

const imgs = {
  logo: cargoImg("S2750912458441777787162226748670", "logo-2.png"),
  design1: cargoImg("V2750912589616574895310848290046", "dsfsdfdsfs.png"),
  design2: cargoImg("D2750924230397529121575976463614", "Group-3.svg"),
  video1: cargoOriginal("Y2767551976252964611018656738558", "ezgif-80847595daa6433f.mov"),
  video1Poster: cargoImg("E2767551983281174103101995904254", "ezgif-80847595daa6433f.jpg"),
  video2: cargoOriginal("R2767554125390882918549967760638", "landing-page.mov"),
  video2Poster: cargoImg("P2767554146862893020347885841662", "landing-page.jpg"),
  video3: cargoOriginal("M2767554125409329662623677312254", "dashboard.mov"),
  video3Poster: cargoImg("B2767554145239579541861445299454", "dashboard.jpg"),
  flow: cargoImg("P2767565661505011270587100065022", "dsfdsfsdfds.png"),
  comp: cargoImg("P2767565661523458014660809616638", "fdgdfgdfg.png"),
};

export const metadata = {
  title: "Climate Collective — Sophie Brenner",
};

export default function ClimateCollective() {
  return (
    <ProjectLayout slug="climate-collective">

      {/* ── Hero ── */}
      <section className="mb-16">
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "var(--text-muted)" }}>
          UX Case Study · Client Work
        </p>
        <h1
          className="font-light leading-[1.05] tracking-tight mb-10"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: "var(--text)" }}
        >
          Climate Collective:<br />
          Mosambi Onboarding
        </h1>

        {/* Overview row */}
        <div
          className="grid grid-cols-4 gap-0 pt-10 mb-14"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="pr-8" style={{ borderRight: "1px solid var(--border)" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Client</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Climate Collective Foundation
            </p>
          </div>
          <div className="px-8" style={{ borderRight: "1px solid var(--border)" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Timeline</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              4 weeks
            </p>
          </div>
          <div className="px-8" style={{ borderRight: "1px solid var(--border)" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Team</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              4 Product Designers
            </p>
          </div>
          <div className="pl-8">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>My Role</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              UX/UI Design, Research, Design System
            </p>
          </div>
        </div>

        {/* Hero video */}
        <div className="rounded-2xl overflow-hidden">
          <video autoPlay muted loop playsInline poster={imgs.video1Poster} className="w-full block">
            <source src={imgs.video1} type="video/quicktime" />
            <source src={imgs.video1} type="video/mp4" />
          </video>
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── 01 The Project ── */}
      <section className="mb-20 max-w-[700px]">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>01 — The Project</p>
        <h2 className="font-light tracking-tight mb-6" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          End-to-End Onboarding
        </h2>
        <p className="body-text">
          As part of a four-person design team, we developed the end-to-end process of onboarding
          new users into the Mosambi platform — a product by Climate Collective Foundation focused
          on climate data and action. The project involved UX research, design systems, and
          high-fidelity UI design in Figma.
        </p>
      </section>

      {/* Logo + design overview */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <Image
            src={imgs.logo}
            alt="Climate Collective logo"
            width={250}
            height={163}
            className="w-auto h-auto"
          />
          <Image
            src={imgs.design1}
            alt="Design overview"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── 02 The Design System ── */}
      <section className="mb-14">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>02 — The Design System</p>
        <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Components & Tokens
        </h2>
      </section>

      <section className="mb-20">
        <Image
          src={imgs.design2}
          alt="Design system"
          width={1200}
          height={800}
          className="w-full h-auto rounded-2xl"
        />
      </section>

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── 03 The Screens ── */}
      <section className="mb-14">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>03 — The Screens</p>
        <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Landing Page & Dashboard
        </h2>
      </section>

      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { src: imgs.video2, poster: imgs.video2Poster, label: "Landing Page" },
            { src: imgs.video3, poster: imgs.video3Poster, label: "Dashboard" },
          ].map(({ src, poster, label }) => (
            <div key={label}>
              <div className="rounded-2xl overflow-hidden">
                <video autoPlay muted loop playsInline poster={poster} className="w-full block">
                  <source src={src} type="video/quicktime" />
                  <source src={src} type="video/mp4" />
                </video>
              </div>
              <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── 04 Flows & Components ── */}
      <section className="mb-14">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>04 — Flows & Components</p>
        <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          User Flow & Component Library
        </h2>
      </section>

      <section className="mb-20">
        <div className="flex flex-col gap-6">
          <Image
            src={imgs.flow}
            alt="User flow"
            width={1738}
            height={718}
            className="w-full h-auto rounded-2xl"
          />
          <Image
            src={imgs.comp}
            alt="Component overview"
            width={1620}
            height={986}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </section>

    </ProjectLayout>
  );
}
