import { Inter, Fragment_Mono } from "next/font/google";
import ExperienceAccordion from "@/components/ExperienceAccordion";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono" });

export const metadata = {
  title: "About — Sophie Brenner",
};

const experience = [
  {
    role: "Lead Product Designer",
    org: "The3DApp",
    date: "Feb 2026 – Present",
    points: [
      "Lead UX/UI strategy and end-to-end design for a 3D scanning platform (The3DApp) and Stylo AI, a consumer-facing spatial visualization app.",
      "Championed “vibe coding” and GenAI workflows (Claude) to rapid-prototype interactive web features, bridging Figma layouts and functional code.",
      "Transformed user research insights into intuitive user flows, wireframes, and mockups for complex spatial tasks.",
      "Used strategic storytelling to communicate design positions with Engineering, challenging product thinking to prioritize the user.",
    ],
  },
  {
    role: "Product Designer",
    org: "Climate Collective, Mosambi",
    date: "Dec 2025 – Jan 2026",
    points: [
      "Collaborated within a team of 4 designers to conduct foundational UX research.",
      "Designed the end-to-end onboarding and login experience, mapping the full user flow from account creation to platform entry for the climate startup.",
    ],
  },
  {
    role: "Exhibition Presenter",
    org: "HoloMaid Thesis Project",
    date: "Dec 2024 – May 2025",
    points: [
      "Engineered an interactive AI character by deploying a locally-run Large Language Model (LLM).",
      "Presented the work at gallery exhibitions, including Afterlives at the Steuben Gallery and the Pratt BFA Art & Tech Senior Capstones.",
    ],
  },
  {
    role: "Studio Apprentice",
    org: "Holography Studios",
    date: "Jun 2024 – Aug 2024",
    points: [
      "Apprenticed at NYC's oldest holography studio under Dr. Laser, learning the craft of analog holography while managing public tours and web content.",
    ],
  },
];

const education = [
  {
    school: "Pratt Institute",
    degree: "BFA in Art and Technology",
    date: "Sept 2021 – May 2025",
  },
];

const awards = [
  { label: "DIGITAL SPRINGBOARD Vol.4, TOKYO NODE Lab & NEORT Toranomon Hills", date: "2025" },
  { label: "Afterlives at the Steuben Gallery", date: "2025" },
  { label: "Pratt Shows BFA Art & Tech Senior Capstones, Pratt Institute", date: "2025" },
  { label: "Pratt.ios ‘After Hours’ Exhibition, Pratt Institute", date: "2024" },
  { label: "Nothing Island, Flux Factory Governors Island", date: "2023" },
  { label: "Presidential Merit-Based Scholarship, Pratt Institute", date: "2021 – 2025" },
  { label: "National Scholastic Gold Key Art Award", date: "2018" },
];

const skillGroups = [
  { title: "Tools", items: ["Adobe CC", "Illustrator", "Photoshop", "After Effects"] },
  { title: "Coding", items: ["HTML", "CSS", "JavaScript", "p5.js"] },
  { title: "AI", items: ["Claude Code", "Nanobanana", "Google AI Studio"] },
  { title: "Other", items: ["Blender", "Unity", "TouchDesigner"] },
  {
    title: "Product Design",
    items: [
      "Figma",
      "Prototyping",
      "Design Systems",
      "User Research",
      "Usability Testing",
    ],
  },
  {
    title: "Languages",
    items: ["English (Native)", "Spanish (Fluent)", "Russian (Intermediate)", "Japanese (Basic)"],
  },
];

const contacts = [
  { label: "sbren156@pratt.edu", href: "mailto:sbren156@pratt.edu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sophiebrenner000/" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.18em] mb-6"
      style={{ color: "#999" }}
    >
      {children}
    </p>
  );
}

export default function About() {
  return (
    <main
      className={`${inter.variable} ${mono.variable} max-w-[1080px] mx-auto px-8`}
      style={{
        paddingTop: "calc(var(--header-h) + 2rem)",
        paddingBottom: "7rem",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Switzer — the typeface used for the bio on the reference about page */}
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@400&display=swap" />

      {/* ── About + Experience (side by side) ── */}
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-start">
      {/* ── About / bio ── */}
      <section>
      <Label>About</Label>
      <div
        className="space-y-5"
        style={{ color: "#222", fontFamily: "'Switzer', sans-serif", fontSize: "24px", lineHeight: "28px" }}
      >
        <p>
          A product and interactive designer working at the intersection of design and technology.
          I shape digital experiences, from spatial 3D tools to B2B dashboards and prototype them with
          GenAI code.
        </p>
        <p>
          I currently lead product design at The3DApp. Previously I studied Arts and Technology at Pratt
          Institute and have shown interactive work in galleries in New York and Tokyo.
        </p>
      </div>
      <div className="flex flex-col gap-2 text-[1.125rem] mt-8">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="nav-hover w-fit group inline-flex items-center gap-1"
          >
            {c.label}
            <span className="arrow-grow">↗</span>
          </a>
        ))}
      </div>
      </section>

      {/* ── Experience (click to expand) ── */}
      <section>
        <Label>Experience</Label>
        <ExperienceAccordion experience={experience} />
      </section>
      </div>

      {/* ── Lower sections — two explicit columns (Skills left, Exhibitions right) ── */}
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-start mt-16">
      {/* Left column */}
      <div className="flex flex-col gap-12">
      {/* Skills */}
      <section>
        <Label>Skills</Label>
        <div className="grid grid-cols-2 gap-x-8 gap-y-8">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <p
                className="font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.16em] mb-3"
                style={{ color: "#111" }}
              >
                {group.title}
              </p>
              <ul className="space-y-1.5 text-[0.95rem] leading-snug" style={{ color: "#666" }}>
                {group.items.map((item) => (
                  <li key={item} className="whitespace-nowrap">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer */}
      <section>
        <Label>Volunteer</Label>
        <div className="flex flex-col gap-0.5 text-[1.25rem] leading-tight">
          <span style={{ color: "#111" }}>NGO Ant-Hiroshima</span>
          <span style={{ color: "#666" }}>Volunteer Staff and Photographer</span>
          <span className="font-[family-name:var(--font-mono)] text-[0.72rem] mt-1" style={{ color: "#999" }}>Aug 2025 – Oct 2025</span>
        </div>
        <p className="text-[1.0625rem] leading-relaxed mt-1" style={{ color: "#666" }}>
          Contributed to the preservation of Hiroshima's living history by photographing and cataloging
          surviving trees from the atomic blast.
        </p>
      </section>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-12">
      {/* Exhibitions & Awards */}
      <section>
        <Label>Exhibitions & Awards</Label>
        <ul className="space-y-3 text-[1.0625rem] leading-relaxed">
          {awards.map((a) => (
            <li key={a.label} className="flex items-baseline justify-between gap-4">
              <span style={{ color: "#666" }}>{a.label}</span>
              <span className="font-[family-name:var(--font-mono)] text-[0.72rem] shrink-0" style={{ color: "#999" }}>{a.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section>
        <Label>Education</Label>
        <div className="space-y-6">
          {education.map((e) => (
            <div key={e.school}>
              <div className="flex flex-col gap-0.5 text-[1.25rem] leading-tight">
                <span style={{ color: "#111" }}>{e.school}</span>
                <span style={{ color: "#666" }}>{e.degree}</span>
                <span className="font-[family-name:var(--font-mono)] text-[0.72rem] mt-1" style={{ color: "#999" }}>
                  {e.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certification */}
      <section>
        <Label>Certification</Label>
        <div className="flex flex-col gap-0.5 text-[1.25rem] leading-tight">
          <span style={{ color: "#111" }}>User Experience Career Accelerator</span>
          <span style={{ color: "#666" }}>CuriousCore</span>
          <span className="font-[family-name:var(--font-mono)] text-[0.72rem] mt-1" style={{ color: "#999" }}>Dec 2025 – Mar 2026</span>
        </div>
      </section>
      </div>
      </div>
    </main>
  );
}
