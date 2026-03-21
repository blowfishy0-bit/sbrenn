export const metadata = {
  title: "Contact — Sophie Brenner",
};

export default function Contact() {
  return (
    <main
      className="max-w-[800px] mx-auto px-10 text-center"
      style={{ paddingTop: "calc(var(--header-h) + 5rem)", paddingBottom: "6rem" }}
    >
      <h1
        className="font-light tracking-tight mb-4"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        Let's make something{" "}
        <strong className="font-semibold">interesting together.</strong>
      </h1>
      <p className="text-base mb-10" style={{ color: "var(--text-muted)" }}>
        Open to full-time roles, freelance projects, and collaborations.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="mailto:sbren156@pratt.edu"
          className="px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200"
          style={{ background: "var(--teal)", color: "#fff" }}
        >
          sbren156@pratt.edu
        </a>
        <a
          href="https://www.linkedin.com/in/sophiebrenner000/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full text-sm font-medium border transition-colors duration-200"
          style={{ borderColor: "var(--border)" }}
        >
          LinkedIn ↗
        </a>
        <a
          href="https://docs.google.com/document/d/1ZUdzM9K5UaB-CbIz_skjjc0Nzps1hlC4IlxyfHoKMx4/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full text-sm font-medium border transition-colors duration-200"
          style={{ borderColor: "var(--border)" }}
        >
          Resume ↗
        </a>
      </div>
    </main>
  );
}
