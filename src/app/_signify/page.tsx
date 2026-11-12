import Image from "next/image";
import ProjectLayout from "@/components/ProjectLayout";
import AutoVideo from "@/components/AutoVideo";
import ScreensRow from "./ScreensRow";

export const metadata = {
  title: "Signify — Sophie Brenner",
};

const HEADING = {
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#111",
  lineHeight: 1.4,
  fontFamily: '-apple-system, BlinkMacSystemFont, "DM Sans", "Helvetica Neue", sans-serif',
  letterSpacing: "-0.01em",
  marginBottom: "1.5rem",
} as const;

/* Body copy on this page: a step larger and darker than the other case studies'
   text-sm #444, so it reads comfortably. */
const BODY = "text-[15px] leading-relaxed";
const BODY_COLOR = { color: "#333" };

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p style={HEADING}>{children}</p>;
}

function Items({ items, cols = 3 }: { items: { title: string; body: string }[]; cols?: 2 | 3 }) {
  return (
    <div className={`grid ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-10`}>
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="font-medium mb-3 text-base">{item.title}</h3>
          <p className={BODY} style={BODY_COLOR}>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function Signify() {
  return (
    <ProjectLayout slug="signify">

      {/* ── Hero video: the café demo ──
          The full window width, as tall as the screen allows. The video's own
          background is white like the page, so it's centred in the band without
          cropping the phone. (A 1080p copy: three 4K clips plus a CSS mask ran Chrome
          short of graphics memory and blanked the fixed header and footer.) */}
      <section
        className="mb-12"
        style={{
          marginTop: "calc(-3rem)",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          height: "min(56.25vw, calc(100svh - var(--header-h) - 45px))",
          background: "#fff",
        }}
      >
        <AutoVideo
          src="/signify/signify-cafe-demo-1080.mp4"
          poster="/signify/signify-cafe-demo-poster-white.jpg"
          label="Signify demo: ordering an iced oat milk latte, the agent checks a sign it isn't sure of, then recaps the order"
          className="block w-full h-full object-contain"
          style={{}}
        />
      </section>

      {/* ── Title + Meta ──
          TODO(Sophie): add the outcome once the makeathon results are out. */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="md:pr-8">
            <h1 style={{ ...HEADING, marginBottom: 0 }}>
              Signify: AI Agent for Live ASL Conversations
            </h1>
            <p className="text-sm mt-1" style={{ color: "#BCBAA9" }}>FIG AI Makeathon · Prototype · React, TypeScript, iOS</p>
            <div className="flex flex-col gap-3 mt-8">
              {[
                { label: "Event",    value: "FIG AI Makeathon" },
                { label: "Timeline", value: "4-day sprint" },
                { label: "Team",    value: "Sophie Brenner, Gus Sun, Tania Cortez, Venus Li" },
                { label: "My Role", value: "Product design and prototyping. Designed the agent experience (the checkpoint before speaking, the repair card, the agent panel, the recap) and built the React prototype that runs inside the native iOS app." },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-6">
                  <p className="text-sm w-20 shrink-0 pt-[2px]" style={{ color: "var(--text-muted)" }}>{label}</p>
                  <p className={BODY} style={BODY_COLOR}>{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:pl-8 mt-6 md:mt-0">
            <p className={BODY} style={BODY_COLOR}>
              Signify is an AI agent that translates live between a Deaf signer and a hearing person
              who doesn&rsquo;t sign. Sign recognition is never perfect, so instead of acting as if it
              is always right, the agent checks with the signer before it says anything it isn&rsquo;t
              sure of: speech can&rsquo;t be taken back.
            </p>
          </div>
        </div>
      </section>

      {/* ── Target user ── */}
      <section className="mb-16">
        <SectionTitle>Target User</SectionTitle>
        <p className={`${BODY} max-w-[700px]`} style={BODY_COLOR}>
          <strong>Sam (persona)</strong>, a Deaf ASL signer, in quick everyday conversations with hearing
          strangers who don&rsquo;t sign: ordering coffee, a pharmacy counter, asking for directions.
          These are moments where no interpreter is available, and typing works, but it means passing a phone back and forth and leaving your own language.
        </p>
        <Image
          src="/signify/hifi-v1-screens.jpg"
          alt="Hi-fi screens for Sam: home, messages, calling and a live conversation with Candace"
          width={1140}
          height={514}
          className="w-full mt-10"
        />
      </section>

      {/* ── Research ── */}
      <section className="mb-16">
        <div className="rounded-2xl p-8 md:p-12 mb-12" style={{ background: "#f5f5f5" }}>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>Research</p>
          <p className={`${BODY} mb-8`} style={BODY_COLOR}>
            Desk research: public forum discussions from Deaf people and people who communicate with them.
          </p>
          <blockquote
            className="font-light leading-snug"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", borderLeft: "3px solid #111", paddingLeft: "1.25rem" }}
          >
            &ldquo;It really isn&rsquo;t that slow. You learn pretty quickly not to ramble very much.&rdquo;
          </blockquote>
          <p className="text-sm mt-3" style={{ color: "var(--text-muted)", paddingLeft: "calc(1.25rem + 3px)" }}>
            <a
              href="https://www.quora.com/How-do-deaf-people-communicate-with-those-that-have-no-knowledge-of-sign-language"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[#111]"
            >
              Rebecca Billy, a hearing person who communicates with Deaf people by writing (Quora)
            </a>
          </p>
        </div>

        <div className="mb-12">
          <Items items={[
            { title: "Writing Is the Default",              body: "Notes, texting, or typing on a phone is one of the most common ways Deaf people talk with hearing people who don’t sign." },
            { title: "Simple Settings, Simple Tools",       body: "At restaurants, pointing and gesturing is often enough." },
            { title: "A Trusted Go-Between Comes First",    body: "One Deaf man’s ranked choices: an interpreter, then writing or texting, then lipreading, then his cochlear implant." },
          ]} />
        </div>

        <h3 className="font-medium mb-6 text-lg">What This Means for Signify</h3>
        <div className="mb-10">
          <Items items={[
            { title: "Typing Is the Bar to Beat",   body: "If Signify is less reliable than a notes app, people will just type. So the agent asks instead of guessing, and Type is always one tap away." },
            { title: "Act Like a Good Interpreter", body: "Check when unsure. Never put words in the signer’s mouth." },
            { title: "Win on Specific Requests",    body: "Pointing works for “a coffee.” Signify matters for “a medium iced oat milk latte” or a pharmacy question." },
          ]} />
        </div>

        <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
          Limit: this is desk research, not interviews. Next step is testing with Deaf signers.
        </p>
      </section>

      {/* ── Problem ── */}
      <section className="mb-16">
        <SectionTitle>Problem</SectionTitle>
        <p className={`${BODY} mb-10 max-w-[700px]`} style={BODY_COLOR}>
          An AI translator can turn signs into speech, but when it guesses wrong it speaks the mistake
          out loud. The other person hears &ldquo;milk&rdquo; instead of &ldquo;latte,&rdquo; and the
          signer loses trust and control.
        </p>
        <Items items={[
          { title: "Recognition Is Never Perfect", body: "ASL relies on the face and body, not just the hands, and signs vary from person to person." },
          { title: "Speech Can’t Be Taken Back",   body: "Once a wrong word is spoken aloud, the hearing person has already heard it. There is no undo in a conversation." },
          { title: "Overconfident Tools Failed",   body: "Past sign-translation projects were criticized by Deaf people for acting as if they were always right, leaving the signer to clean up after them." },
        ]} />
      </section>

      {/* ── The decision: the question, then the flow ── */}
      <section className="mb-16">
        <p className="font-light leading-snug mb-10" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}>
          The agent isn&rsquo;t sure what Sam signed. Should it speak, or check first?
        </p>

        {/* Sam signs → how sure is the agent? → >75% speak it / <75% ask Sam → speak it */}
        <Image
          src="/signify/decision-flow.png"
          alt="Sam signs, then: how sure is the agent? Above 75%, it speaks. Below 75%, it asks Sam to pick one of two options or type the word, then speaks."
          width={2304}
          height={384}
          className="w-full h-auto"
        />

        {/* Without vs. with the checkpoint */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-2xl p-8" style={{ border: "1px solid #e5e5e5" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>Without the checkpoint</p>
            <p className={BODY} style={BODY_COLOR}>
              The agent speaks its guess straight away. If it guesses &ldquo;milk,&rdquo; the barista
              hears &ldquo;milk,&rdquo; and it can&rsquo;t be taken back.
            </p>
          </div>
          <div className="rounded-2xl p-8" style={{ border: "1px solid #10d98a", background: "#f3fdf8" }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>With it</p>
            <p className={BODY} style={BODY_COLOR}>
              Below 75%, the agent asks first. Sam taps &ldquo;latte,&rdquo; and only the right word
              is spoken.
            </p>
          </div>
        </div>
      </section>

      {/* ── Key interaction choices ── */}
      <section className="mb-16">
        <SectionTitle>Key Interaction Choices</SectionTitle>
        <div className="mb-14">
          <Items items={[
            {
              title: "A Checkpoint Before Speaking",
              body: "When the agent’s confidence is below the signer’s threshold (75% by default), it pauses before speaking and asks “Which sign did you mean?”",
            },
            {
              title: "Confidence, Two Clear Options",
              body: "The agent shows its best guess and runner-up with confidence (“latte 58%, milk 31%”) plus “Type the right word” as an escape. One tap resolves it.",
            },
            {
              title: "Familiar and Minimal",
              body: "Camera first, each speaker on their own side, a Google Translate style listening light, and one bottom bar for both directions (Signing and Speech). Nothing gets between Sam and the conversation.",
            },
          ]} />
        </div>

        {/* The agent panel video beside the choices it shows */}
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <AutoVideo
              src="/signify/signify-agent-panel-1080.mp4"
              poster="/signify/signify-agent-panel-poster-white.jpg"
              label="The agent panel: its steps, the last thing it did and why, how cautious it is, and the signs it has learned"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-8">
            {[
              {
                title: "“Why Did It Do That?”",
                body: "The agent panel shows which step it’s on (Translate, Check, Ask, Recap), its last action and the reason: “58% confident, could also be milk, below the 75% threshold.”",
              },
              {
                title: "The Person Stays in Control",
                body: "Undo right after any fix, a slider for how cautious the agent is, and an on/off switch to disable it completely.",
              },
              {
                title: "It Learns, and Keeps a Record",
                body: "Corrections show up as “oat to oat-milk” under Signs it has learned, so the person can see exactly what changed. When the conversation ends, the agent recaps it and saves it to Memory.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-medium mb-3 text-base">{item.title}</h3>
                <p className={BODY} style={BODY_COLOR}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design iterations ──
          TODO(Sophie): add a before/after screenshot pair to each when you have them. */}
      <section className="mb-16">
        <SectionTitle>Design Iterations</SectionTitle>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
          {[
            {
              before: "Three options to choose from",
              after: "Two options",
              why: "Fewer choices make it faster to fix a sign in the middle of a conversation.",
            },
            {
              before: "“None of these”",
              after: "“Type the right word”",
              why: "The way out became an action instead of a dead end.",
            },
            {
              before: "An “Ask me less” button",
              after: "Removed",
              why: "People found it confusing, and the caution slider already does that job.",
            },
            {
              before: "A simplified agent panel",
              after: "“What it did” and “What it learned” brought back",
              why: "People need to see why the agent acted.",
            },
          ].map((it, i) => (
            <div key={i}>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>{String(i + 1).padStart(2, "0")}</p>
              <p className="text-base mb-3">
                <span style={{ color: "#999", textDecoration: "line-through" }}>{it.before}</span>
                <span className="mx-2" style={{ color: "#999" }}>→</span>
                <span className="font-medium">{it.after}</span>
              </p>
              <p className={BODY} style={BODY_COLOR}>{it.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The journey ── */}
      <section className="mb-16">
        <SectionTitle>The Journey in the Prototype</SectionTitle>
        <p className={`${BODY} mb-10 max-w-[700px]`} style={BODY_COLOR}>
          One coffee order, start to finish: the moment the agent is unsure is the heart of the demo.
        </p>
        <div className="grid md:grid-cols-4 gap-10">
          {[
            { step: "01", title: "Start",   body: "Sam starts a conversation. The camera opens, each speaker on their own side." },
            { step: "02", title: "Listen",  body: "The barista speaks, and their words appear as captions." },
            { step: "03", title: "Sign",    body: "Sam signs, with the hand tracked live." },
            { step: "04", title: "Check",   body: "The agent is unsure and asks: latte or milk?" },
            { step: "05", title: "Choose",  body: "Sam picks the right sign with one tap." },
            { step: "06", title: "Speak",   body: "The sentence is spoken aloud, correctly." },
            { step: "07", title: "Reply",   body: "The barista replies, captioned for Sam." },
            { step: "08", title: "Recap",   body: "The recap appears and is saved to Memory, with the new signs it learned." },
          ].map((item) => (
            <div key={item.step}>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>{item.step}</p>
              <h3 className="font-medium mb-3 text-base">{item.title}</h3>
              <p className={BODY} style={BODY_COLOR}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Beyond the conversation: one line and the video ── */}
      <section className="mb-16">
        <p className={`${BODY} mb-6`} style={BODY_COLOR}>
          Every recap is saved to Memory, next to Messages and Community.
        </p>
        <AutoVideo
          src="/signify/signify-messages-community-memory-1080.mp4"
          poster="/signify/signify-messages-community-memory-poster-white.jpg"
          label="Messages, a captioned chat, Community and Memory"
        />
      </section>

      {/* ── Screens: the static screens ── */}
      <section className="mb-16">
        <SectionTitle>Screens</SectionTitle>
        <ScreensRow />
      </section>

      {/* ── How it's built ── */}
      <section className="mb-16 max-w-[700px]">
        <SectionTitle>How It&rsquo;s Built</SectionTitle>
        <p className={BODY} style={BODY_COLOR}>
          A React prototype built with Lovable, wrapped in a native iOS app. Swift handles the camera,
          hand tracking and speech recognition, connected to the web app through a typed bridge. In
          the web demo, the camera and AI are simulated.
        </p>
      </section>

      {/* ── Limits ── */}
      <section className="mb-16">
        <SectionTitle>Limits We&rsquo;re Honest About</SectionTitle>
        <Items items={[
          { title: "Hands First",        body: "Version 1 tracks hands. ASL facial grammar is future work." },
          { title: "Private by Default", body: "Video stays on the device." },
          { title: "Not an Interpreter", body: "Not a replacement for interpreters in medical or legal situations." },
        ]} />
      </section>

      {/* ── Reflection ── */}
      <section className="mb-16">
        <SectionTitle>Reflection</SectionTitle>
        <Items items={[
          { title: "Test With Deaf Signers First", body: "Our research was desk research. Before building further, Deaf signers should shape the agent, not just try it." },
          { title: "Facial Grammar Next",          body: "Version 1 reads hands. ASL meaning also lives in the face and body." },
          { title: "What I’d Do Differently",      body: "Bring Deaf users in on day one, and test the checkpoint against plain typing to prove it’s worth it." },
        ]} />
      </section>

    </ProjectLayout>
  );
}
