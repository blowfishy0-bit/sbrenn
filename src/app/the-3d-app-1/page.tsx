import ProjectLayout from "@/components/ProjectLayout";

export const metadata = {
  title: "The3DApp — Sophie Brenner",
};

export default function The3DApp() {
  return (
    <ProjectLayout slug="the-3d-app-1">

      {/* ── Hero ── */}
      <section className="mb-16">
        {/* Hero image — full bleed, flush to top */}
        <div style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw", background: "#f0f0f0", marginTop: "calc(-3rem)" }}>
          <img src="/slide2.svg" alt="The 3D App virtual tour viewer" className="w-full block" />
        </div>

        {/* Title row below image */}
        <div className="grid grid-cols-2 gap-0 mt-6 mb-10">
          <div className="pr-8">
            <h1 style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4 }}>
              Perfecting the Pitch: AI Virtual Staging for the Modern Agent
            </h1>
            <p className="text-sm mt-1" style={{ color: "#BCBAA9" }}>Figma, UX Research (Ongoing)</p>

            <div className="flex flex-col gap-3 mt-8">
              {[
                { label: "Timeline", value: "Ongoing" },
                { label: "Team", value: "Solo Lead Designer" },
                { label: "My Role", value: "Lead UX/UI Designer — Research, Interaction Logic, and Prototyping." },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-6">
                  <p className="text-sm w-20 shrink-0 pt-[2px]" style={{ color: "var(--text-muted)" }}>{label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="pl-8">
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              An ongoing product redesign for a 3D marketplace platform. Research-driven UX improvements to core browsing, discovery, and onboarding flows.
            </p>
          </div>
        </div>

        {/* Problem / Solution row */}
        <div className="grid grid-cols-2 gap-0 pt-2 mb-10">
          <div className="pr-8">
            <p className="text-sm font-semibold mb-3" style={{ color: "#111" }}>Problem</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Real estate agents need high-quality staging, but AI is often a "black box"—unpredictable and hard to control.
            </p>
          </div>
          <div className="pl-8">
            <p className="text-sm font-semibold mb-3" style={{ color: "#111" }}>Solution</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Design a "Control Deck" that gives agents the ability to guide AI imagery with precision, speed, and creative flexibility.
            </p>
          </div>
        </div>

      </section>

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── 01 The Discovery ── */}
      <section className="mb-20 max-w-[700px]">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>01 — The Discovery</p>
        <h2 className="font-light tracking-tight mb-6" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Beyond the "Pretty Picture"
        </h2>
        <p className="body-text mb-6">
          When I began research with listing agents like Brian, I realized the problem wasn't a lack
          of images—it was a lack of <em>trust</em> and <em>speed</em>. Industry tools like Matterport
          lacked the high-def photography required for premium listings, while open-ended AI tools
          produced unreliable results.
        </p>
        <p className="body-text">
          Agents needed more than a scan. They needed a way to show "what a property could be"
          without waiting 48 hours for a third-party editor.
        </p>
      </section>

      {/* ── User Interview Card ── */}
      <section className="mb-20">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: "#f5f5f5" }}>
          <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--text-muted)" }}>
            UX Research — User Interview: Brian
          </p>
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <blockquote
              className="font-light leading-snug"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", borderLeft: "3px solid #111", paddingLeft: "1.25rem" }}
            >
              "ChatGPT is difficult to use to virtually stage a 2D image because it hallucinates."
            </blockquote>
            <blockquote
              className="font-light leading-snug"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", borderLeft: "3px solid #111", paddingLeft: "1.25rem" }}
            >
              "The biggest opportunity for adoption among agents is high-end virtual staging and
              rendering for listings."
            </blockquote>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm" style={{ color: "#444" }}>
            <p>Brian uses ChatGPT to recreate specific styles (Scandinavian, Mid-Century Modern) using reference photos and exact prompts.</p>
            <p>Brian uses the Matterport app and is exploring AI to remove "ugly mirrors" or declutter spaces—but finds it lacks precision.</p>
            <p>Brian wants to stage units based on the likely buyer profile (family vs. single professional, etc.).</p>
          </div>
        </div>
      </section>

      {/* Slide 7 */}
      <section className="mb-20">
        <div className="rounded-2xl overflow-hidden" style={{ background: "#f0f0f0" }}>
          <img src="/slide%207.svg" alt="Research findings" className="w-full block" style={{ clipPath: "inset(3px round 13px)" }} />
        </div>
      </section>

      {/* ── The Friction ── */}
      <section className="mb-20">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>The Friction</p>
        <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          The "Control" Gap
        </h2>
        <div className="grid md:grid-cols-3 gap-0">
          {[
            {
              title: "The \u201cBlank Page\u201d Anxiety",
              body: "Agents aren\u2019t prompt engineers. Facing a blank text box leads to Analysis Paralysis\u2014they don\u2019t know the \u201cmagic words\u201d to get a professional result.",
            },
            {
              title: "The Reference Problem",
              body: "Agents often have a specific vision in mind but can\u2019t describe it in words. Brian mentioned wanting to \u201cupload a professional photograph to virtually stage in it.\u201d",
            },
            {
              title: "The Precision Gap",
              body: "Agents need to fix specific issues like \u201cugly mirrors\u201d or clutter, but text-only prompts are too blunt to handle surgical edits.",
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

      {/* ── 02 The Strategy ── */}
      <section className="mb-14 max-w-[700px]">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>02 — The Strategy</p>
        <h2 className="font-light tracking-tight mb-6" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Constraint as a Catalyst
        </h2>
        <p className="body-text mb-6">
          I moved away from "Open Prompting" and toward a <strong>System of Constraints</strong>—
          a structured set of tools that ensure speed and accuracy without requiring the user to
          think like a prompt engineer.
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
          Rather than giving agents more power over text, I gave them more power over space.
        </blockquote>
      </section>

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── 03 The Solutions ── */}
      <section className="mb-20">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>03 — The Solutions</p>
        <h2 className="font-light tracking-tight mb-14" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Redesigning Access to AI Features
        </h2>

        {/* Feature 01 */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-6 items-start">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Feature 01</p>
            <h3 className="font-medium text-xl mb-4">The Style Gallery</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              I replaced the empty text box with high-intent Style Tags. By selecting
              "Scandinavian" or "Mid-Century Modern," the agent feeds the AI a curated data set of
              high-end design—eliminating the need to write long descriptions.
            </p>
          </div>
          <img src="/slide8.svg" alt="The Style Gallery" className="w-full block" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))" }} />
        </div>

        {/* Feature 02 */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-6 items-start">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Feature 02</p>
            <h3 className="font-medium text-xl mb-4">The AI Paintbrush</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Instead of telling the AI where to go with words, the agent "paints" their intent
              directly onto the scan. This acts as a spatial prompt, telling the AI: "Only imagine
              in this specific area."
            </p>
          </div>
          <img src="/slide9.svg" alt="The AI Paintbrush" className="w-full block" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))" }} />
        </div>

        {/* Feature 03 */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-6 items-start">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Feature 03</p>
            <h3 className="font-medium text-xl mb-4">The Action Bar</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              A control deck featuring: an Attach Photo tool for styling from inspiration photos,
              a 2D/3D Toggle to switch between high-def listing stills and immersive panoramas,
              a Paintbrush, Undo/Redo, Download, and Add to Gallery—so agents can quickly refine
              visualizations until they're listing-ready.
            </p>
          </div>
          <img src="/slide10.svg" alt="The Action Bar" className="w-full block" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))" }} />
        </div>

        {/* Slide 11 + 11 part 2 — side by side */}
        <div className="grid grid-cols-2 gap-4 mt-6 items-end">
          <img src="/slide11.svg" alt="Action Bar detail" className="w-full block rounded-2xl" />
          <img src="/slide11%20part%202.svg" alt="Action Bar detail 2" className="w-full block rounded-2xl" />
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)", marginBottom: "5rem" }} />

      {/* ── The Impact ── */}
      <section className="mb-20">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>The Impact</p>
        <h2 className="font-light tracking-tight mb-12" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Results
        </h2>
        <div className="grid md:grid-cols-3 gap-0">
          {[
            {
              stat: "48h → 30s",
              label: "Turnaround time",
              body: "Transformed a 48-hour third-party editing cycle into a 30-second in-app interaction.",
            },
            {
              stat: "$0",
              label: "Staging cost",
              body: "Eliminated the need for $1,000+ staging fees, democratizing high-end marketing for every property—from rentals to luxury condos.",
            },
            {
              stat: "Win more",
              label: "listings",
              body: "Serves as a pitching asset, demonstrating a custom high-tech marketing suite that shows sellers a staged 3D tour directly on their phone.",
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

    </ProjectLayout>
  );
}
