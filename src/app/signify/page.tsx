import Image from "next/image";
import ProjectLayout from "@/components/ProjectLayout";
import AutoVideo from "@/components/AutoVideo";
import ScreensRow, { FINAL_FLOW, FINAL_STATES, FINAL_DARK_SHORT } from "./ScreensRow";

export const metadata = {
  title: "Signify — Sophie Brenner",
};

/* Built from the team's Notion write-up, reordered as a story: who it's for,
   the problem, what we learned, my decision (the check before speaking), the
   agent I designed, then the final UI. */

const FONT = '-apple-system, BlinkMacSystemFont, "DM Sans", "Helvetica Neue", sans-serif';
const TEXT = "text-[15px] leading-relaxed";
const INK = { color: "#333" };
const MUTED = { color: "var(--text-muted)" };

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-20 mb-4" style={{ fontFamily: FONT, fontSize: "1.5rem", fontWeight: 700, color: "#111", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-10 mb-3 text-lg font-semibold" style={{ color: "#111" }}>{children}</h3>;
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`${TEXT} mb-4 max-w-[760px] ${className}`} style={INK}>{children}</p>;
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className={`${TEXT} list-disc pl-6 mb-4 max-w-[760px] flex flex-col gap-2`} style={INK}>
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

function Numbered({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className={`${TEXT} list-decimal pl-6 mb-4 max-w-[760px] flex flex-col gap-2`} style={INK}>
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ol>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className={`${TEXT} mb-4 max-w-[760px]`} style={{ ...INK, borderLeft: "3px solid #111", paddingLeft: "1.25rem" }}>
      {children}
    </blockquote>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-sm mt-3" style={MUTED}>{children}</p>;
}

export default function Signify() {
  return (
    <ProjectLayout slug="signify">

      {/* ── Hero: the makeathon demo, full window width ── */}
      <section
        className="mb-12"
        style={{
          marginTop: "calc(-3rem)",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          height: "min(56.25vw, calc(100svh - var(--header-h) - 45px))",
          background: "#ededed",
        }}
      >
        <video
          src="/signify/signify-makeathon-demo.mp4"
          poster="/signify/signify-makeathon-demo-poster.jpg"
          aria-label="Signify makeathon demo: starting a conversation, the barista's speech captioned, Sam signing, the agent checking a sign it isn't sure of, Memory, Learn ASL and Community"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          disablePictureInPicture
          className="block w-full h-full object-contain"
        />
      </section>

      {/* ── Title + meta, with "What it is" beside it ── */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="md:pr-8">
            <h1 style={{ fontFamily: FONT, fontSize: "1.5rem", fontWeight: 700, color: "#111", letterSpacing: "-0.01em", lineHeight: 1.4 }}>
              Signify: AI Agent for Live ASL Conversations
            </h1>
            <p className="text-sm mt-1" style={{ color: "#BCBAA9" }}>FIG AI Design Makeathon 2026 · Prototype · React, TypeScript, iOS</p>
            <div className="flex flex-col gap-3 mt-8">
              {[
                { label: "Event",    value: "FIG AI Design Makeathon 2026" },
                { label: "Timeline", value: "5-day sprint" },
                { label: "Team",     value: "Sophie Brenner, Gus Sun, Tania Cortez, Venus Li" },
                { label: "My Role",  value: "Product design and prototyping. Designed the agent experience (the checkpoint before speaking, the repair card, the agent panel, the recap) and built the React prototype that runs inside the native iOS app. Final UI designed by Tania Cortez." },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-6">
                  <p className="text-sm w-20 shrink-0 pt-[2px]" style={MUTED}>{label}</p>
                  <p className={TEXT} style={INK}>{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:pl-8 mt-6 md:mt-0">
            <p className={TEXT} style={INK}>
              Signify is an AI agent that translates live between a Deaf signer and a hearing person
              who doesn&rsquo;t sign. Sign recognition is never perfect, so instead of acting as if
              it&rsquo;s always right, the agent checks with the signer before it says anything it
              isn&rsquo;t sure of. Speech can&rsquo;t be taken back.
            </p>
            <p className="text-sm mt-6">
              <a
                href="https://sign-together-social.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
                style={{ color: "#111" }}
              >
                Try the web prototype ↗
              </a>
              <span style={MUTED}> · camera and AI simulated</span>
            </p>
          </div>
        </div>
      </section>

      <article>

        {/* ── Where this came from ── */}
        <H2>Where this came from</H2>
        <P>
          Deaf people often need a third person just to have a conversation: an interpreter, or a
          phone passed back and forth with a stranger. Signify isn&rsquo;t meant to replace
          interpreters. It&rsquo;s for everyday moments when there isn&rsquo;t one around, like
          ordering coffee or asking for directions.
        </P>

        {/* ── Target user ── */}
        <H2>Target user</H2>
        <P>
          Sam, a Deaf ASL signer, in quick conversations with hearing strangers who don&rsquo;t sign:
          ordering coffee, a pharmacy counter, asking for directions. No interpreter is available, and
          typing on a phone feels slow and awkward.
        </P>
        <Image
          src="/signify/hifi-v1-screens.jpg"
          alt="Hi-fi screens for Sam: home, messages, calling and a live conversation with Candace"
          width={1140}
          height={514}
          className="w-full h-auto mt-6"
        />

        {/* ── Problem ── */}
        <H2>Problem</H2>
        <P>
          Sign recognition is never perfect. ASL relies on the face and body, and signs vary from
          person to person. When a translator guesses wrong, it speaks the mistake out loud, and speech
          can&rsquo;t be taken back. The other person hears &ldquo;milk&rdquo; instead of
          &ldquo;latte,&rdquo; and the signer loses trust and control.
        </P>

        {/* ── Research, trimmed ── */}
        <H2>Research</H2>
        <P>
          Desk research plus one firsthand account. Writing and typing are the default today, and
          they&rsquo;re faster than people expect: &ldquo;You learn pretty quickly not to ramble very
          much.&rdquo; Private appointments still run through video relay services, and as of 2026
          Deaf people were still reporting barriers in medical settings.
        </P>
        <H3>Why past sign-translation tools failed</H3>
        <Bullets items={[
          <><b>They serve the wrong person.</b> &ldquo;ASL gloves are mainly created/designed to serve hearing people.&rdquo; (Rachel Kolb)</>,
          <><b>They were built without Deaf people.</b> One project never checked with the Deaf community or ASL teachers.</>,
          <><b>The Deaf person does all the work.</b> The signer sets up the equipment; the hearing person only listens.</>,
          <><b>They reduce ASL to hands,</b> ignoring the face and body.</>,
        ]} />
        <H3>What this meant for the design</H3>
        <Bullets items={[
          <><b>Typing is the bar to beat.</b> If Signify is less reliable than a notes app, people will type. So the agent asks instead of guessing, and Type is always one tap away.</>,
          <><b>Never put words in the signer&rsquo;s mouth.</b> The signer approves before anything is spoken.</>,
          <><b>Both sides do the work.</b> The hearing person&rsquo;s speech is captioned too, and tap-to-share means they need no app.</>,
        ]} />

        {/* ── My decision ── */}
        <H2>Key decision moment</H2>
        <P>
          The agent isn&rsquo;t sure what Sam signed. Should it speak, or check first? I designed it
          to check: below the signer&rsquo;s confidence threshold, nothing is spoken until Sam
          confirms.
        </P>
        <Image
          src="/signify/decision-flow.png"
          alt="Sam signs, then: how sure is the agent? Above 75%, it speaks. Below 75%, it asks Sam to pick one of two options or type the word, then speaks."
          width={2304}
          height={384}
          className="w-full h-auto mt-4"
        />
        <div className="mt-10">
          <AutoVideo
            src="/signify/signify-cafe-demo-1080.mp4"
            poster="/signify/signify-cafe-demo-poster-white.jpg"
            label="Signify demo: ordering an iced oat milk latte, the agent checks a sign it isn't sure of, then recaps the order"
            className="block w-full h-auto"
          />
          <Caption>One coffee order: the agent isn&rsquo;t sure, asks latte or milk, and speaks only once Sam picks.</Caption>
        </div>

        {/* ── The agent I designed ── */}
        <H2>Key interaction choices</H2>
        <Numbered items={[
          <><b>A checkpoint before speaking.</b> Below 75% confidence, the agent asks &ldquo;Which sign did you mean?&rdquo; The other person sees &ldquo;One moment&rdquo; instead of a wrong word.</>,
          <><b>Two clear options.</b> Best guess and runner-up (&ldquo;latte 58%, milk 31%&rdquo;), plus &ldquo;Type the right word.&rdquo; One tap resolves it.</>,
          <><b>It explains itself.</b> The agent panel shows its step, its last action, and why.</>,
          <><b>The person stays in control.</b> Undo, a caution slider, and an on/off switch.</>,
          <><b>It learns visibly</b> and recaps every conversation to Memory.</>,
          <><b>Graceful failure.</b> Every error state has its own recovery and offers Type.</>,
        ]} />
        <div className="mt-10">
          <AutoVideo
            src="/signify/signify-agent-panel-1080.mp4"
            poster="/signify/signify-agent-panel-poster-white.jpg"
            label="The agent panel: its steps, the last thing it did and why, how cautious it is, and the signs it has learned"
          />
          <Caption>The agent panel: what it did, why, how cautious it is, and what it has learned.</Caption>
        </div>
        <div className="mt-10">
          <AutoVideo
            src="/signify/signify-messages-community-memory-1080.mp4"
            poster="/signify/signify-messages-community-memory-poster-white.jpg"
            label="Messages, a captioned chat, Community and Memory"
          />
          <Caption>Every recap is saved to Memory, next to Messages and Community.</Caption>
        </div>

        <H2>Design iterations</H2>
        <ul className={`${TEXT} mb-4 max-w-[760px] flex flex-col gap-3`} style={INK}>
          {[
            { before: "Three options to choose from", after: "Two options", why: "Faster to fix a sign mid-conversation." },
            { before: "“None of these”", after: "“Type the right word”", why: "The way out became an action, not a dead end." },
            { before: "An “Ask me less” button", after: "Removed", why: "Confusing, and the caution slider already does it." },
            { before: "A simplified agent panel", after: "“What it did” and “What it learned” back", why: "People need to see why the agent acted." },
          ].map((n) => (
            <li key={n.after}>
              <span style={{ color: "#999", textDecoration: "line-through" }}>{n.before}</span>
              <span className="mx-2" style={{ color: "#999" }}>→</span>
              <span className="font-medium" style={{ color: "#111" }}>{n.after}</span>
              <span style={MUTED}> · {n.why}</span>
            </li>
          ))}
        </ul>

        <H3>My first version</H3>
        <P>The first screens I designed in Figma, before the final UI.</P>
        <div className="mt-6"><ScreensRow /></div>

        {/* ── The final UI ── */}
        <H2>Final UI</H2>
        <H3>Main flow</H3>
        <P>Launch, sharing with the other person, signing, the agent check, speech, recap, Memory, Learn ASL, and Community.</P>
        <div className="mt-6"><ScreensRow screens={FINAL_FLOW} cols={4} /></div>

        <H3>Missing states</H3>
        <P>When something goes wrong, every state keeps the conversation going, usually by offering Type.</P>
        <div className="mt-6"><ScreensRow screens={FINAL_STATES} cols={4} /></div>

        <H3>Dark mode</H3>
        <div className="mt-6"><ScreensRow screens={FINAL_DARK_SHORT} cols={4} /></div>

        {/* ── Build + accessibility ── */}
        <H2>How I built it</H2>
        <P>
          I built the React prototype and wrapped it in a native iOS app. Swift handles the camera,
          hand-pose tracking, and speech through a typed JavaScript bridge, with on-device captions
          and spoken output. Video stays on the device, and transcripts are never logged.
        </P>
        <H3>Accessibility built in</H3>
        <Bullets items={[
          <><b>Cues that don&rsquo;t rely on sound:</b> haptics, an edge flash, a live waveform, and the spoken word highlighted in the caption.</>,
          <><b>Only reviewed text is spoken,</b> the mic is muted while the app speaks, and Stop speaking is always available.</>,
          <><b>Design rules:</b> VoiceOver order, 44 × 44 pt targets, WCAG AA contrast, Dynamic Type, Reduce Motion, and no state shown by color alone.</>,
        ]} />

        {/* ── Limits + next ── */}
        <H2>Limits and next step</H2>
        <Bullets items={[
          <>Version 1 tracks hands; ASL facial grammar is future work.</>,
          <>Signify is not a replacement for interpreters in medical or legal settings.</>,
          <>We haven&rsquo;t tested with Deaf signers yet. That&rsquo;s next: Tania reached out to leaders of a church with an active Deaf community to review the prototype and help with sign recordings.</>,
        ]} />

        <p className="text-xs leading-relaxed mt-20 mb-16 max-w-[760px]" style={MUTED}>
          Sources: Michael Erard,{" "}
          <a
            href="https://www.theatlantic.com/technology/archive/2017/11/why-sign-language-gloves-dont-help-deaf-people/545441/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            &ldquo;Why Sign-Language Gloves Don&rsquo;t Help Deaf People,&rdquo;
          </a>{" "}
          The Atlantic, 2017 · UW Linguistics open letter on SignAloud, 2016 · Rogers et al., PLOS
          Global Public Health, 2025 · News 12, 2026 · TMJ4 · mindbodygreen · National Deaf Center,
          2017 · Quora.
        </p>

      </article>
    </ProjectLayout>
  );
}
