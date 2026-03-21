import Image from "next/image";
import ProjectLayout from "@/components/ProjectLayout";
import { cargoImg } from "@/lib/cargo";

const imgs = {
  // Trance section
  photo: cargoImg("C2723221239754055226001335938302", "IMG_4903.png"),
  still1: cargoImg("W2723221239809395458222464593150", "Untitled-1.png"),
  still2: cargoImg("K2723221239772501970075045489918", "1.png"),
  gif1: cargoImg("D2723221239790948714148755041534", "9033d7a1-7ef7-4baa-b630-f40b1838e2d6-ezgif.com-optimize.gif"),
  gif2: cargoImg("U2723221239735608481927626386686", "trimmed-ezgif.com-video-to-gif-converter.gif"),
  // Arduino section
  gif3: cargoImg("Z2723252435780828039172455820542", "ScreenRecording2025-05-25at4.32.24PM_1-ezgif.com-crop.gif"),
  gif4: cargoImg("P2723259024810237215634616642814", "dfgdfgdfgdrmp4-ezgif.com-video-to-gif-converter.gif"),
  fan: cargoImg("A2723265926677979138137063320830", "fan2.png"),
  fan2: cargoImg("X2723265983088122515540872162558", "3-1.png"),
  fan3: cargoImg("K2723266031123444083480544570622", "4erf.png"),
  fan4: cargoImg("S2723266093159844403365766655230", "sdsds-1.png"),
  fan5: cargoImg("U2723266150344751031865376664830", "cvbn.png"),
  fan6: cargoImg("R2723266218560810616443298540798", "cxvb.png"),
};

export const metadata = {
  title: "3D Animation & Arduino — Sophie Brenner",
};

function VimeoEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl mb-2" style={{ paddingBottom: "56.25%", height: 0 }}>
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

export default function Playground() {
  return (
    <ProjectLayout slug="playground">
      <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
        Playground
      </h2>

      {/* 3D Animation Trance */}
      <section className="mb-16">
        <div className="grid md:grid-cols-[auto_1fr_2fr] gap-6 items-start mb-6">
          <div className="md:w-48">
            <p className="font-medium mb-1">- 3D Animation Trance</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>2025</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Blender, Procreate, Nomad Sculpt</p>
          </div>
          <VimeoEmbed id="1078593634" title="Trance Animation" />
          <div className="grid grid-cols-3 gap-2">
            {[imgs.photo, imgs.still1, imgs.still2, imgs.gif1, imgs.gif2].map((src, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src={src} alt="" fill className="object-cover" sizes="15vw" unoptimized />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Reaction / Touch Designer */}
      <section className="mb-16">
        <p className="font-medium mb-1">- Live Reaction works</p>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Touch Designer, Visual Code</p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <VimeoEmbed id="804657175" title="Heartbeat" />
          <VimeoEmbed id="782630514" title="icoDots" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[imgs.gif3, imgs.gif4].map((src, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <Image src={src} alt="" fill className="object-cover" sizes="50vw" unoptimized />
            </div>
          ))}
        </div>
      </section>

      {/* Arduino / Physical Computing */}
      <section className="mb-16">
        <p className="font-medium mb-1">- Physical Computing</p>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Arduino, NeoPixels</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[imgs.fan, imgs.fan2, imgs.fan3, imgs.fan4, imgs.fan5, imgs.fan6].map((src, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
      </section>
    </ProjectLayout>
  );
}
