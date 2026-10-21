import ProjectLayout, { PROJECT_FOOTER_H } from "@/components/ProjectLayout";

const ARCHIVE_URL = "https://sparklingyuzu.vercel.app/";

export const metadata = {
  title: "Sparkling Yuzu — Sophie Brenner",
};

/* The archive fills the whole window between the header and the case-study
   footer with no frame or chrome, so it reads as part of this site. It
   scrolls on its own; the page around it does not. */
export default function Knit() {
  return (
    <ProjectLayout slug="knit" bleed>
      <iframe
        src={ARCHIVE_URL}
        title="Sparkling Yuzu: interactive archive for a crochet label"
        className="fixed left-0 right-0 block w-full"
        style={{
          top: "var(--header-h)",
          height: `calc(100svh - var(--header-h) - ${PROJECT_FOOTER_H})`,
          border: 0,
          background: "#fff",
        }}
      />
    </ProjectLayout>
  );
}
