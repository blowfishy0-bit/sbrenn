import ProjectLayout, { PROJECT_FOOTER_H } from "@/components/ProjectLayout";

const BEADLE_URL = "https://beadle-tan.vercel.app/";

export const metadata = {
  title: "Bead Clover — Sophie Brenner",
};

/* Same full-window embed as /knit: the site fills the space between the
   header and the case-study footer and scrolls on its own. */
export default function Beadle() {
  return (
    <ProjectLayout slug="beadle" bleed>
      <iframe
        src={BEADLE_URL}
        title="Beadle: fuse-bead pattern app prototype and final screen"
        className="fixed left-0 right-0 block w-full"
        style={{
          top: "var(--header-h)",
          height: `calc(100svh - var(--header-h) - ${PROJECT_FOOTER_H})`,
          border: 0,
          background: "#F5FAD6",
        }}
      />
    </ProjectLayout>
  );
}
