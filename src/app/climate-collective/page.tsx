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

        {/* Title row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-6 mb-10">
          <div className="md:pr-8">
            <h1 style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4 }}>
              Climate Collective Mosambi
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
              Driving conversion for the Mosambi platform by replacing the &ldquo;Black Box&rdquo; login with value-first onboarding.
            </p>
          </div>
        </div>

        {/* Problem / Solution row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 pt-2 mb-10">
          <div className="md:pr-8">
            <p className="text-sm font-semibold mb-3" style={{ color: "#111" }}>Problem</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              For a new social ecosystem like Mosambi, the primary hurdle was converting guests into members without losing them to a tedious signup process — especially when users hit a wall trying to access high-value features like event registration.
            </p>
          </div>
          <div className="md:pl-8 mt-6 md:mt-0">
            <p className="text-sm font-semibold mb-3" style={{ color: "#111" }}>Solution</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#444" }}>
              Design a high-speed, frictionless onboarding sequence with a persistent status indicator to maximize signup conversion and reduce user drop-off.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              We shifted the onboarding philosophy from &ldquo;Ask then Show&rdquo; to <strong>Show then Invite</strong>. Users start on the home or events page and can access some content freely. In order to register for events — or take any action that requires an account — they are sent to my onboarding screens. Users are far more motivated to complete a task when they can see exactly how close they are to the finish line.
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

      {/* ── Research ── */}
      <section className="mb-16">
        <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4, marginBottom: "1.5rem" }}>Research</p>
        <p className="text-sm leading-relaxed mb-10" style={{ color: "#444" }}>
          We conducted a competitive analysis beginning with Mosambi, mapping how comparable platforms approach user acquisition, community building, and onboarding within the climate and professional networking space.
        </p>

        {(() => {
          const items = [
            {
              name: "Mosambi",
              users: "Climate tech professionals and startups in the Global South",
              value: "Search & match services and talent for startups in the climate tech space",
            },
            {
              name: "Sayuj",
              users: "Entrepreneurs and startups in India",
              value: "India's exclusive startup community network",
            },
            {
              name: "LinkedIn",
              users: "Working professionals and job-seekers across the globe",
              value: "Networking and hiring for professionals across the world",
            },
            {
              name: "Climatebase",
              users: "Climate professionals and job-seekers across the globe",
              value: "Hiring platform for the climate industry",
            },
          ];
          return (
            <div className="grid md:grid-cols-4 gap-10">
              {items.map((item) => (
                <div key={item.name}>
                  <p className="font-medium text-base mb-3">{item.name}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.users} — {item.value}</p>
                </div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* ── The Problem ── */}
      <section className="mb-16">
        <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4, marginBottom: "1.5rem" }}>The Problem</p>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "The \u201cLeap of Faith\u201d Barrier",
              body: "Forcing a login before showing value creates a high bounce rate; the \u201ccost\u201d of data entry often outweighs the \u201cperceived benefit\u201d of an unproven platform.",
            },
            {
              title: "The Momentum Kill",
              body: "Hitting a multi-field signup form at the moment of registration creates a jarring experience that kills user intent and lead conversion.",
            },
            {
              title: "The Ambiguity Gap",
              body: "Without a clear \u201cDigital Host\u201d or status indicator, users feel lost and abandoned, leading to high abandonment rates mid-transition.",
            },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="font-medium mb-3 text-base">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Solution ── */}
      <section className="mb-16">
        <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4, marginBottom: "1.5rem" }}>The Solution</p>

        <div className="flex flex-col gap-10">
          {[
            {
              num: "01",
              title: "3-Dot Progress Indicator",
              body: "3 dots at the top of every screen tell the user exactly how much of the signup is left — removing ambiguity and keeping them moving forward.",
              img: "/group-16.svg",
            },
            {
              num: "02",
              title: "\u201cWho Am I\u201d Icons",
              body: "Instead of a long dropdown, I used visual icons for user roles — making the choice feel instant and intuitive rather than administrative.",
              img: "/group-12.svg",
            },
            {
              num: "03",
              title: "Already Have an Account?",
              body: "A clear login path is built into the flow for returning users, so they can bypass signup entirely and get straight back to what they came for.",
              img: "/sign-in.svg",
            },
          ].map((item) => (
            <div key={item.num} className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
              <div>
                <h3 className="font-medium text-base mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
              </div>
              <img src={item.img} alt={item.title} className="w-full h-auto max-w-sm mx-auto block" style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.12))" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── The Impact ── */}
      <section className="mb-16">
        <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4, marginBottom: "1.5rem" }}>The Impact</p>
        <p className="text-sm leading-relaxed mb-10" style={{ color: "#444" }}>
          We validated this approach with 12 users through high-fidelity usability testing. The data confirmed that transparency leads to higher engagement.
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              stat: "81%",
              label: "Completion rate",
              body: "The vast majority of users navigated the entire sequence and successfully unlocked the features they were seeking.",
            },
            {
              stat: "92.9s",
              label: "Guest → Member",
              body: "Users moved from the initial prompt to their unlocked state in under two minutes.",
            },
            {
              stat: "Community",
              label: "#1 most exciting feature",
              body: "Post-test feedback revealed Community as the feature users were most excited about — skeptics converted into members before the first form field.",
            },
          ].map((item, i) => (
            <div key={i}>
              <p className="font-light tracking-tight mb-1" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.1 }}>
                {item.stat}
              </p>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>{item.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

    </ProjectLayout>
  );
}
