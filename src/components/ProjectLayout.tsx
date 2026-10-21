import Link from "next/link";
import { projects, CASE_STUDY_SLUGS } from "@/lib/projects";

interface Props {
  slug: string;
  children: React.ReactNode;
  /* Children fill the viewport between header and footer themselves; skip
     the padded content column and the page scroll. */
  bleed?: boolean;
}

/* Height of the fixed case-study footer: 10px padding top and bottom
   around one 15px line, plus its 1px top border. */
export const PROJECT_FOOTER_H = "45px";

export default function ProjectLayout({ slug, children, bleed = false }: Props) {
  const caseStudies = CASE_STUDY_SLUGS.map((s) => projects.find((p) => p.slug === s)!);
  const idx = caseStudies.findIndex((p) => p.slug === slug);
  // Wrap around so the first and last case studies still link somewhere.
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <main
      className={bleed ? "project-body" : "min-h-screen project-body"}
      style={bleed ? undefined : { paddingTop: "calc(var(--header-h) + 3rem)" }}
    >
      {bleed ? children : (
        <div className="max-w-[1100px] mx-auto px-6 pb-32">
          {children}
        </div>
      )}

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
          height: PROJECT_FOOTER_H,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #111",
          background: "#fff",
          fontSize: "15px",
          color: "#111",
        }}
      >
        <Link href="/" style={{ color: "#111" }}>Sophie Brenner</Link>

        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
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
        </div>
      </footer>
    </main>
  );
}
