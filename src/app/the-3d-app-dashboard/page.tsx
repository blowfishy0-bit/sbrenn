import ProjectLayout from "@/components/ProjectLayout";
import Image from "next/image";

export const metadata = {
  title: "The3DApp — B2B Agent Dashboard — Sophie Brenner",
};

export default function The3DAppDashboard() {
  return (
    <ProjectLayout slug="the-3d-app-dashboard">
      {/* ── Hero ── */}
      <section className="mb-16">
        {/* Title row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-6 mb-10">
          <div className="md:pr-8">
            <h1 style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4 }}>
              The3DApp — B2B Agent Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: "#BCBAA9" }}>
              Shipped B2B SaaS · Product Design, UX Research, 0→1
            </p>

            <div className="flex flex-col gap-3 mt-8">
              {[
                { label: "Timeline", value: "2025 — Shipped" },
                { label: "Team", value: "Solo Product Designer, working with Engineering" },
                { label: "My Role", value: "End-to-end product design — user research, information architecture, interaction design, and front-end development." },
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
              The first analytics and management dashboard for The3DApp&rsquo;s real-estate agents —
              a 0→1 product built from user research. I designed the workflow that connects the
              dashboard to tours created and their resulting views &amp; shares, turning agent
              activity into a measurable product loop.
            </p>
          </div>
        </div>

        {/* Dashboard preview */}
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #ece9df" }}
        >
          <Image
            src="/the-3d-app-dashboard/title-card.png"
            alt="The3DApp B2B agent dashboard — title card"
            width={2928}
            height={1600}
            className="w-full h-auto"
            unoptimized
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="mb-16 max-w-[700px]">
        <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4, marginBottom: "1.5rem" }}>The Problem</p>
        <p className="body-text mb-4">
          Agents had no single place to keep all of their tours together, share them, or make edits.
          Every tour lived somewhere different, and there was no cohesive home for the work.
        </p>
        <p className="body-text">
          Editing ran entirely through our tour artists, which created a bottleneck. We wanted to
          keep that support available while also giving agents direct access to their tours — so they
          could make changes themselves whenever they needed to.
        </p>
      </section>

      {/* ── Research ── */}
      <section className="mb-16 max-w-[700px]">
        <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4, marginBottom: "1.5rem" }}>Research</p>
        <p className="body-text mb-4">
          I interviewed current users, property managers, and agents to understand how they were
          managing tours today. The workarounds were telling: one property manager tracked the tours
          for her building in an Excel sheet, while an agent simply relied on tours being emailed to
          him one at a time.
        </p>
        <p className="body-text">
          I paired this with a competitive analysis and interviews with users of a competing app. One
          insight stood out — the <strong>folder feature</strong> was central to how they organized
          tours, and it was clearly something ours needed to have.
        </p>
      </section>

      {/* ── The Solution ── */}
      <section className="mb-16">
        <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4, marginBottom: "1.5rem" }}>The Solution</p>
        <p className="text-sm leading-relaxed mb-10 max-w-[700px]" style={{ color: "#444" }}>
          A single dashboard that brings every tour into one place — organized, shareable, and
          editable. I led both the design and the front-end code, shipping the live dashboard, and
          also worked on the stager tools to make sure the embedded editing fit cleanly inside the 3D
          tour.
        </p>

        <div className="grid grid-cols-1 gap-y-16">
          <div>
            <div className="max-w-[700px]">
              <h3 className="font-medium mb-3 text-base">Everything on one page</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                Competitors split a tour&rsquo;s details across separate pages you had to click through.
                I designed ours as a single scroll, surfacing the most important information first — so
                agents get the full picture without hunting for it.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden mt-5" style={{ border: "1px solid #ece9df" }}>
              <video autoPlay muted loop playsInline className="w-full block" style={{ marginBottom: "-2px" }}>
                <source src="/the-3d-app-dashboard/dashboard-scroll-1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div>
            <div className="max-w-[700px]">
              <h3 className="font-medium mb-3 text-base">A folder system</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                Research made it clear that organization was the missing piece — agents were tracking
                tours in spreadsheets or scattered email threads. Folders let them group tours the way
                they actually work, and share a whole folder with teammates and clients at once.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden mt-5" style={{ border: "1px solid #ece9df" }}>
              <video autoPlay muted loop playsInline className="w-full block" style={{ marginBottom: "-2px" }}>
                <source src="/the-3d-app-dashboard/dashboard-scroll-2.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div>
            <div className="max-w-[700px]">
              <h3 className="font-medium mb-3 text-base">Self-serve editing</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                Editing used to run entirely through our tour artists. The dashboard gives agents direct
                access to their tours, so they can make edits themselves while artists stay free for the
                heavier work.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden mt-5" style={{ border: "1px solid #ece9df" }}>
              <video autoPlay muted loop playsInline className="w-full block" style={{ marginBottom: "-2px" }}>
                <source src="/the-3d-app-dashboard/dashboard-scroll-3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div>
            <div className="max-w-[700px]">
              <h3 className="font-medium mb-3 text-base">Onboarding built around real behavior</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                I designed the sign-on flow, then refined it from a live usability issue: a user who
                signed up with Google was confused by a screen asking them to type an email. We learned
                that agents reach for the first button they see — and most create accounts with Google —
                so we reordered the flow to lead with it.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden mt-5" style={{ border: "1px solid #ece9df" }}>
              <video autoPlay muted loop playsInline className="w-full block" style={{ marginBottom: "-2px" }}>
                <source src="/the-3d-app-dashboard/dashboard-scroll-4.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Impact ── */}
      <section className="mb-16">
        <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4, marginBottom: "1.5rem" }}>The Impact</p>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              stat: "3,906",
              label: "Tours brought together",
              body: "Tours that were once scattered across email and spreadsheets, now organized in one dashboard.",
            },
            {
              stat: "19 / mo",
              label: "New tours created each month",
              body: "Tours created on average every month since the dashboard launched four months ago — a steady, measurable product loop.",
            },
            {
              stat: "5.71 / day",
              label: "Daily active users",
              body: "Active users on the dashboard landing page each day, averaged over the past 28 days.",
            },
          ].map((item, i) => (
            <div key={i}>
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

      {/* ── Next Steps ── */}
      <section className="mb-16 max-w-[700px]">
        <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#111", lineHeight: 1.4, marginBottom: "1.5rem" }}>Next Steps</p>
        <p className="body-text mb-4">
          The next piece is an email and notification system. When you&rsquo;re invited to a folder,
          you&rsquo;ll get notified right away — closing the loop between sharing a tour and knowing
          it landed.
        </p>
        <p className="body-text mb-4">
          And if you don&rsquo;t have an account yet when you&rsquo;re invited, an easy onboarding
          process picks up from the invitation, so a new collaborator can get in and start viewing
          tours with as little friction as possible.
        </p>
        <p className="body-text">
          Research also surfaced a strong appetite for deeper tour analytics — agents wanted to see
          which rooms clients spent the longest in, and where their attention went inside a tour. I&rsquo;d
          like to work with developers to bring this to life, turning tour engagement into insight
          agents can act on.
        </p>
      </section>
    </ProjectLayout>
  );
}
