import Image from "next/image";
import ProjectLayout from "@/components/ProjectLayout";
import StyloPrototype from "./StyloPrototype";

export const metadata = {
  title: "STYLO app — Sophie Brenner",
};

export default function StyloApp() {
  return (
    <ProjectLayout slug="stylo-app">

      {/* ── Prototype ── */}
      <section className="mb-6" style={{ marginTop: "calc(-3rem)" }}>
        <StyloPrototype />
      </section>

      {/* ── Title + Meta ── */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-10">
          <div className="md:pr-8">
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", lineHeight: 1.4, fontFamily: '-apple-system, BlinkMacSystemFont, "DM Sans", "Helvetica Neue", sans-serif', letterSpacing: "-0.01em" }}>
              Stylo
            </h1>
            <p className="text-sm mt-1" style={{ color: "#BCBAA9" }}>Interactive Prototype, UX/UI</p>
            <div className="flex flex-col gap-3 mt-8">
              {[
                { label: "Timeline",  value: "Concept / Ongoing" },
                { label: "Team",      value: "Solo Designer" },
                { label: "My Role",   value: "Lead UX/UI Designer — Research, Product Strategy, Interaction Design & Prototyping." },
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
              Stylo bridges the gap between inspiration and reality by turning a single smartphone photo
              into a fully shoppable, photorealistic showroom — no LiDAR, no design expertise required.
            </p>
          </div>
        </div>

        {/* Problem / Solution summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 pt-2 mb-14">
          <div className="md:pr-8">
            <p className="text-sm font-semibold mb-3" style={{ color: "#111" }}>Problem</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Most people want to redesign their space but can&apos;t visualize how new furniture will look in their actual room — leading to paralysis, abandoned carts, and expensive mistakes.
            </p>
          </div>
          <div className="md:pl-8 mt-6 md:mt-0">
            <p className="text-sm font-semibold mb-3" style={{ color: "#111" }}>Solution</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
              Stylo uses a single phone photo and generative AI to instantly restyle the room in any aesthetic — then surfaces real, shoppable products that match, bundled into one seamless checkout.
            </p>
          </div>
        </div>

        {/* poop svg */}
        <div
          className="poop-svg"
          style={{
            width: "100%",
            height: "45vh",
            backgroundImage: "url('/poop.svg')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            margin: 0,
            padding: 0,
          }}
        />
      </section>

      {/* ── Problem ── */}
      <section className="mb-16">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", lineHeight: 1.4, fontFamily: '-apple-system, BlinkMacSystemFont, "DM Sans", "Helvetica Neue", sans-serif', letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>Problem</p>
        <p className="text-sm leading-relaxed mb-10 max-w-[700px]" style={{ color: "#444" }}>
          Most users suffer from <strong>Interior Design Paralysis</strong> — the desire to renovate stalled by three core frictions.
        </p>
        <div className="grid md:grid-cols-3 gap-10 mb-14">
          {[
            { title: "Visualization Failure", body: "The inability to imagine how a 2D catalog item looks inside their specific, cluttered bedroom." },
            { title: "Hardware Barriers",     body: "Most advanced AR tools require high-end LiDAR sensors, alienating the average smartphone user." },
            { title: "Logistical Friction",   body: "The \"hunt\" for matching sets across 10 different tabs and retailers leads to high cart abandonment." },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="font-medium mb-3 text-base">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* User story quote */}
        <div className="rounded-2xl p-8 md:p-12" style={{ background: "#f5f5f5" }}>
          <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--text-muted)" }}>User Story</p>
          <blockquote
            className="font-light leading-snug"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", borderLeft: "3px solid #111", paddingLeft: "1.25rem" }}
          >
            &ldquo;I hate my bedroom furniture, but I have no eye for design. I can&apos;t visualize how new items
            would look in my space, and I don&apos;t want to hunt across 10 different websites to find a matching set.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Research / User Flow ── */}
      <section className="mb-8">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", lineHeight: 1.4, fontFamily: '-apple-system, BlinkMacSystemFont, "DM Sans", "Helvetica Neue", sans-serif', letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>Research</p>
        <p className="text-sm leading-relaxed mb-10 max-w-[700px]" style={{ color: "#444" }}>
          Stylo utilizes a high-intelligence, low-effort user flow that leverages Computer Vision and
          Generative AI to restyle a room in-place.
        </p>
        <div className="grid md:grid-cols-3 gap-10 mb-14">
          {[
            { step: "01", title: "Capture",  body: "User takes a standard 2D photo. CV detects perspective lines and segments the architecture — floor, walls, ceiling." },
            { step: "02", title: "Style",    body: "User selects a vibe (e.g. Modern Boho). The AI generates a photorealistic furniture layout overlaid directly onto the original photo, matching the room's lighting and shadows." },
            { step: "03", title: "Identify", body: "User taps a generated item. The system searches retail databases for real-world products that match the AI's \"hallucinated\" design." },
            { step: "04", title: "Swap",     body: "User selects a real product; the AI instantly adjusts perspective and lighting to anchor it into the photo, replacing the generic AI piece." },
            { step: "05", title: "Bundle",   body: "A \"Room Cart\" aggregates the visible products — Bed, Rug, Lamp — into a single itemized list for review." },
            { step: "06", title: "Transact", body: "A frictionless \"Bundle Checkout\" handles multi-vendor transactions in the background via Apple/Google Pay." },
          ].map((item) => (
            <div key={item.step}>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>{item.step}</p>
              <h3 className="font-medium mb-3 text-base">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden flow-wrap" style={{ background: "#f0f0f0" }}>
          <Image
            src="/flow.png"
            alt="Stylo user flow diagram"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", display: "block" }}
            unoptimized
          />
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="mb-16">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", lineHeight: 1.4, fontFamily: '-apple-system, BlinkMacSystemFont, "DM Sans", "Helvetica Neue", sans-serif', letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>Solution</p>
        <p className="text-sm leading-relaxed mb-10 max-w-[700px]" style={{ color: "#444" }}>
          An AI-Powered Design Partner that bridges the gap between inspiration and reality — turning
          a single smartphone photo into a fully shoppable, photorealistic showroom.
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Instant Room Restyling",       body: "Unlike traditional tools that require a \"reset,\" Stylo allows users to see an immediate transformation of their current environment." },
            { title: "Contextual Sourcing",          body: "Every \"dream\" image generated is backed by real, available inventory, turning inspiration into an immediate purchase path." },
            { title: "Frictionless Fulfillment",     body: "Eliminates the need to visit multiple product pages or enter shipping info four different times." },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="font-medium mb-3 text-base">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Impact ── */}
      <section className="mb-16">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", lineHeight: 1.4, fontFamily: '-apple-system, BlinkMacSystemFont, "DM Sans", "Helvetica Neue", sans-serif', letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>Impact</p>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { stat: "$24B",     label: "Returned Furniture",    body: "The furniture industry loses $24B annually to returns — the #1 reason: \"it didn't look right in my space.\" Stylo eliminates that guesswork before purchase." },
            { stat: "1 Photo",   label: "Zero Setup",           body: "No room scanning, no measurements, no LiDAR — one standard phone photo is all it takes to generate a fully styled, shoppable room." },
            { stat: "100%",     label: "Hardware Inclusive",  body: "Standard JPEG processing instead of LiDAR — reach includes nearly every smartphone user globally." },
          ].map((item, i) => (
            <div key={i}>
              <p className="font-light tracking-tight mb-1" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.1 }}>{item.stat}</p>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>{item.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

    </ProjectLayout>
  );
}
