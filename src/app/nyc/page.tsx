import ProjectLayout from "@/components/ProjectLayout";

export const metadata = {
  title: "NYC Spatial Design — Sophie Brenner",
};

function VimeoEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{ paddingBottom: "56.25%", height: 0 }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${id}?autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0`}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title={title}
      />
    </div>
  );
}

export default function NYC() {
  return (
    <ProjectLayout slug="nyc">
      <h2
        className="font-light tracking-tight mb-10"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
      >
        NYC Spatial Design
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <VimeoEmbed id="895105632" title="Bushwick 3D Unity Scene" />
        <VimeoEmbed id="1081031942" title="After Hours 2024" />
      </div>

      <div className="max-w-2xl text-sm leading-relaxed" style={{ color: "#333" }}>
        <p>
          Over two months, I collected 3D scans with Polycam and ambient audio recordings in New
          York City, then built an interactive virtual environment in Unity. Users can navigate
          the space using mouse, WASD, and Q/E for vertical movement, immersing themselves in a
          fragmented cityscape that reflects the chaos of modern urban life—where personal spaces
          are invaded by digital noise, notifications, and ads.
        </p>
        <p className="mt-4">
          Presented: <em>After Hours</em> — Pratt Shows: Art + Technology, Myrtle Hall
        </p>
      </div>
    </ProjectLayout>
  );
}
