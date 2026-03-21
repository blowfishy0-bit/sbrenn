export const metadata = {
  title: "About — Sophie Brenner",
};

export default function About() {
  return (
    <main
      className="max-w-[800px] mx-auto px-10"
      style={{ paddingTop: "calc(var(--header-h) + 5rem)", paddingBottom: "6rem" }}
    >
      <h1
        className="font-light tracking-tight mb-10"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        Hi, I'm Sophie,
      </h1>

      <div
        className="text-base leading-relaxed space-y-4"
        style={{ color: "#333", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}
      >
        <p>
          I'm a multidisciplinary user experience designer with experience in interaction design.
          I shape data-driven and visually intuitive digital experiences.
        </p>
        <p>
          My journey (so far) has been:
          <br />
          <strong>Fine Art → Interaction Design → User Experience Design</strong>
        </p>
      </div>

      <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <h2 className="font-semibold text-base mb-4">Contact</h2>
        <div className="flex flex-col gap-2 text-sm">
          <a
            href="mailto:sbren156@pratt.edu"
            className="transition-colors"
            style={{ color: "var(--teal)" }}
          >
            sbren156@pratt.edu
          </a>
          <a
            href="https://www.linkedin.com/in/sophiebrenner000/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "var(--teal)" }}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </main>
  );
}
