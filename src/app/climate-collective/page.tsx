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
        {/* Hero image — full bleed, flush to top */}
        <div style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw", marginTop: "calc(-3rem)" }}>
          <img src="/mosambi-final.svg" alt="Mosambi overview" className="w-full block" />
        </div>

        {/* Title row below image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-6 mb-10">
          <div className="md:pr-8">
            <h1 style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4 }}>
              Climate Collective: From Skepticism to Community
            </h1>
            <p className="text-sm mt-1" style={{ color: "#BCBAA9" }}>Figma, UX Research, UI Design System</p>

            <div className="flex flex-col gap-3 mt-8">
              {[
                { label: "Timeline", value: "4 weeks" },
                { label: "Team", value: "4 Product Designers" },
                { label: "My Role", value: "UX/UI Design, Research, Design System" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-6">
                  <p className="text-sm w-20 shrink-0 pt-[2px]" style={{ color: "var(--text-muted)" }}>{label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:pl-8 mt-6 md:mt-0">
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Driving conversion for the Mosambi platform by replacing the "Black Box" login with value-first onboarding.
            </p>
          </div>
        </div>

        {/* Problem / Goal row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 pt-2 mb-10">
          <div className="md:pr-8">
            <p className="text-sm font-semibold mb-3" style={{ color: "#111" }}>Problem</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              For a new social ecosystem like Mosambi, the primary hurdle was converting guests into members without losing them to a tedious signup process — especially when users hit a wall trying to access high-value features like event registration.
            </p>
          </div>
          <div className="md:pl-8 mt-6 md:mt-0">
            <p className="text-sm font-semibold mb-3" style={{ color: "#111" }}>Goal</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Design a high-speed, frictionless onboarding sequence with a persistent status indicator to maximize signup conversion and reduce user drop-off.
            </p>
          </div>
        </div>

        {/* User flow */}
        <div className="mb-10">
          <img src="/userflow.svg" alt="User flow" className="w-full h-auto block" />
        </div>

        {/* Hero video */}
        <div className="rounded-2xl overflow-hidden">
          <video autoPlay muted loop playsInline poster={imgs.video1Poster} className="w-full block" style={{ marginBottom: "-2px" }}>
            <source src={imgs.video1} type="video/quicktime" />
            <source src={imgs.video1} type="video/mp4" />
          </video>
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── The Friction ── */}
      <section className="mb-20">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>The Friction</p>
        <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Where Users Got Lost
        </h2>
        <div className="grid md:grid-cols-3 gap-0">
          {[
            {
              title: "The Black Box",
              body: "Users hit a wall when trying to access high-value features like event registration — forced into a signup with no sense of what they were committing to or how long it would take.",
            },
            {
              title: "Signup Fatigue",
              body: "Traditional forms front-load every question at once. The cognitive weight of a long form caused users to abandon before they reached a single field.",
            },
            {
              title: "No Progress Anchor",
              body: "Without a visible indicator of how far along they were, users had no motivation to push through. The end never felt close, so they stopped.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="py-8 pr-8"
              style={{
                borderTop: "1px solid var(--border)",
                paddingLeft: i > 0 ? "2rem" : "0",
                borderLeft: i > 0 ? "1px solid var(--border)" : "none",
              }}
            >
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>0{i + 1}</p>
              <h3 className="font-medium mb-3 text-base">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── 01 The Strategy ── */}
      <section className="mb-14 max-w-[700px]">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>01 — The Strategy</p>
        <h2 className="font-light tracking-tight mb-6" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Value-First Entry
        </h2>
        <p className="body-text mb-6">
          We shifted the onboarding philosophy from "Ask then Show" to <strong>Show then Invite</strong>.
          Rather than demanding commitment upfront, users start on the Home or Events pages with
          partial access. When they try to perform a high-value action — like registering for a
          climate event — they are seamlessly transitioned into the onboarding screens.
        </p>
        <blockquote
          className="font-light leading-snug my-10"
          style={{
            fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)",
            borderLeft: "3px solid #111",
            paddingLeft: "1.5rem",
            color: "#222",
          }}
        >
          Users are far more motivated to complete a task when they can see exactly how close they are to the finish line.
        </blockquote>
      </section>

      {/* Strategy features */}
      <section className="mb-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-10 items-start">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Feature 01</p>
            <h3 className="font-medium text-xl mb-4">The "Guest to Member" Hook</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Users begin with partial access — enough to feel the platform's value. The moment they
              want more (registering for an event, joining a discussion), the onboarding flow
              activates seamlessly in context, rather than as an interruption.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <video autoPlay muted loop playsInline poster={imgs.video2Poster} className="w-full block">
              <source src={imgs.video2} type="video/quicktime" />
              <source src={imgs.video2} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-10 items-start">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Feature 02</p>
            <h3 className="font-medium text-xl mb-4">The Digital Host</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              The 3-step sequence acts as a digital host — walking the user through the front door
              so they never feel lost or abandoned during the transition from guest to member.
              Each screen has one purpose, one icon, and one clear action.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <video autoPlay muted loop playsInline poster={imgs.video3Poster} className="w-full block">
              <source src={imgs.video3} type="video/quicktime" />
              <source src={imgs.video3} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Feature 03</p>
            <h3 className="font-medium text-xl mb-4">The Direct Return Logic</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Once the host completes the walkthrough, the user is returned to exactly where they
              started — with all features now fully unlocked. No generic dashboard dump.
              The transition feels like a natural progression, not a detour.
            </p>
          </div>
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

      {/* ── 02 The Digital Host Workflow ── */}
      <section className="mb-20">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>02 — The Digital Host Workflow</p>
        <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Designing for Intuition
        </h2>
        <div className="grid md:grid-cols-3 gap-0">
          {[
            {
              title: "The 3-Dot Status Indicator",
              body: "Positioned at the top of every screen, these dots act as a Progress Anchor. By showing the user exactly how little is left to do, we eliminate the ambiguity of the Black Box signup.",
            },
            {
              title: "The \"Who Am I\" Visual Icons",
              body: "Instead of a tedious dropdown menu, I used intuitive icons for user roles — reducing cognitive load and making the choice feel instantaneous and tactile rather than administrative.",
            },
            {
              title: "The Seamless Login Switch",
              body: "For returning users, a clear \"I already have an account\" path is integrated within the flow — ensuring they can bypass onboarding and return to their task immediately.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="py-8 pr-8"
              style={{
                borderTop: "1px solid var(--border)",
                paddingLeft: i > 0 ? "2rem" : "0",
                borderLeft: i > 0 ? "1px solid var(--border)" : "none",
              }}
            >
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>0{i + 1}</p>
              <h3 className="font-medium mb-3 text-base">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design system + flows */}
      <section className="mb-20">
        <div className="flex flex-col gap-6">
          <Image
            src={imgs.design2}
            alt="Design system"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
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

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── 03 Outcomes ── */}
      <section className="mb-20">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>03 — Outcomes</p>
        <h2 className="font-light tracking-tight mb-12" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Proving the Value
        </h2>
        <div className="grid md:grid-cols-3 gap-0">
          {[
            {
              stat: "81%",
              label: "Completion rate",
              body: "12 users navigated the entire sequence and successfully unlocked the features they were seeking — without frustration or prompting.",
            },
            {
              stat: "92.9s",
              label: "Guest → Member",
              body: "Users moved from the initial signup prompt to their fully unlocked state in under two minutes — a record speed for community onboarding.",
            },
            {
              stat: "Community",
              label: "#1 most exciting feature",
              body: "Post-test feedback revealed Community as the feature users were most excited about — confirming the Digital Host approach converted skeptics into active members.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="py-8 pr-8"
              style={{
                borderTop: "1px solid var(--border)",
                paddingLeft: i > 0 ? "2rem" : "0",
                borderLeft: i > 0 ? "1px solid var(--border)" : "none",
              }}
            >
              <p
                className="font-light tracking-tight mb-1"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.1 }}
              >
                {item.stat}
              </p>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>{item.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Impact ── */}
      <section className="mb-20 max-w-[700px]">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>The Impact</p>
        <h2 className="font-light tracking-tight mb-6" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Scaling the Movement
        </h2>
        <p className="body-text">
          By prioritizing the user's current task over a generic dashboard dump, the onboarding
          process became a retention hook. Users didn't just sign up — they gained immediate access
          to the value they came for, ensuring they stayed active within the community from minute one.
        </p>
      </section>

    </ProjectLayout>
  );
}
