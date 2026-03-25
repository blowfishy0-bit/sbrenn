import Link from "next/link";
import { projects, CASE_STUDY_SLUGS } from "@/lib/projects";

interface Props {
  slug: string;
  children: React.ReactNode;
}

export default function ProjectLayout({ slug, children }: Props) {
  const caseStudies = CASE_STUDY_SLUGS.map((s) => projects.find((p) => p.slug === s)!);
  const idx = caseStudies.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? caseStudies[idx - 1] : null;
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null;

  return (
    <main
      className="min-h-screen project-body"
      style={{ paddingTop: "calc(var(--header-h) + 3rem)" }}
    >
      <div className="max-w-[1100px] mx-auto px-6 pb-32">
        {children}
      </div>

      {/* Case study footer */}
      <footer
        className="px-6 md:px-[120px]"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          paddingTop: "10px",
          paddingBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #111",
          background: "#fff",
          fontSize: "15px",
          color: "#111",
        }}
      >
        <span style={{ color: "#111" }}>Sophie Brenner</span>

        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {prev ? (
            <Link
              href={`/${prev.slug}`}
              className="relative inline-block group w-fit"
              style={{ color: "#111" }}
            >
              ← Previous
              <span
                className="absolute left-0 bottom-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: "#111", transitionTimingFunction: "cubic-bezier(0.25,1,0.5,1)" }}
              />
            </Link>
          ) : (
            <span style={{ color: "#111" }}>← Previous</span>
          )}
          {next ? (
            <Link
              href={`/${next.slug}`}
              className="relative inline-block group w-fit"
              style={{ color: "#111" }}
            >
              Next →
              <span
                className="absolute left-0 bottom-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: "#111", transitionTimingFunction: "cubic-bezier(0.25,1,0.5,1)" }}
              />
            </Link>
          ) : (
            <span style={{ color: "#111" }}>Next →</span>
          )}
        </div>
      </footer>
    </main>
  );
}
