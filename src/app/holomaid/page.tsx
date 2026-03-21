import Image from "next/image";
import ProjectLayout from "@/components/ProjectLayout";
import { cargoImg, cargoOriginal } from "@/lib/cargo";

const imgs = {
  img1: cargoImg("N2722610668887477433223218621694", "UG_25SP_BrennerS_4.png"),
  img2: cargoImg("C2722610668850583945075799518462", "UG_25SP_BrennerS_5.png"),
  img3: cargoImg("H2722610668869030689149509070078", "UG_25SP_BrennerS_1.png"),
  img4: cargoImg("B2722610668905924177296928173310", "UG_25SP_BrennerS_3.png"),
  video: cargoOriginal("R2722649913616071231419609148670", "Timeline-1.mov"),
  diagram: cargoImg("N2722657644830979963829786930430", "efsjsgdjfsdhf.png"),
};

export const metadata = {
  title: "HoloMaid — Sophie Brenner",
};

export default function HoloMaid() {
  return (
    <ProjectLayout slug="holomaid">
      <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
        HoloMaid: Human-AI Holographic Companionship
      </h2>

      {/* YouTube + description */}
      <div className="grid md:grid-cols-[1fr_auto] gap-10 mb-14">
        <div>
          <div
            className="relative overflow-hidden rounded-xl"
            style={{ paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              frameBorder="0"
              src="https://www.youtube.com/embed/WsQl2L97S0Q?autoplay=1&mute=1&start=21&controls=1&rel=0"
              className="absolute top-0 left-0 w-full h-full"
              title="HoloMaid Demo"
            />
          </div>
        </div>
        <div className="md:w-80 text-sm leading-relaxed" style={{ color: "#333" }}>
          <p className="mb-4">
            HoloMaid is an interactive anime-style holographic maid (green-haired, cat-eared)
            confined in a wooden box, powered by a Raspberry Pi 4 and locally-run Gemma 3. Using
            distance sensors she senses and greets users with a voice and dance, and invites typing
            on a keyboard so viewers can explore her trapped-in-a-box backstory.
          </p>
          <p className="mb-4">
            This project employs low-tech. Unlike most cloud-based AI, she exists only when you
            plug her in and computes entirely inside her box. She is a sustainable AI character
            locally hosted and a deliberately slow token rate (2–3 tokens/sec).
          </p>
          <p>
            Talk to her any way you want. She's an AI companion, custom-tailored to your messages
            and moods. Ask her about her backstory, choose to be her friend or not, ask her to tell
            you her story, vent if you need to, or just sit with her in silence. She might glitch,
            tease, or tell you something strange.
          </p>
        </div>
      </div>

      {/* 4-image grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[imgs.img1, imgs.img2, imgs.img3, imgs.img4].map((src, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
          </div>
        ))}
      </div>

      {/* Exhibitions */}
      <div className="grid md:grid-cols-2 gap-10 mb-14 items-start">
        <div>
          <h3 className="font-semibold text-base mb-4">Presented</h3>
          <ul className="text-sm leading-relaxed list-disc pl-5" style={{ color: "#333" }}>
            <li>
              <em>DIGITAL SPRINGBOARD Vol.4</em>, TOKYO NODE Lab &amp; NEORT Toranomon Hills
              Station Tower
            </li>
            <li>
              <em>Pratt Shows BFA Art &amp; Tech Senior Capstones</em>, Pratt Institute NYC
            </li>
            <li>
              <em>Afterlives</em>, Steuben Gallery
            </li>
          </ul>
        </div>
        <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={imgs.video} />
          </video>
        </div>
      </div>

      {/* Diagram */}
      <div className="mb-14 flex justify-center">
        <div className="relative w-full max-w-2xl rounded-xl overflow-hidden">
          <Image src={imgs.diagram} alt="HoloMaid system diagram" width={727} height={385} className="w-full" />
        </div>
      </div>

      {/* Tech specs */}
      <div className="grid md:grid-cols-2 gap-10 text-sm leading-loose" style={{ color: "#333" }}>
        <div>
          <h3 className="font-semibold text-base mb-3">Hardware</h3>
          <ul className="list-disc pl-5">
            {[
              "Raspberry Pi 4",
              "Arduino Nano 33 IoT",
              "Distance Sensor",
              "Stereo USB speakers",
              "Jumper wire cables",
              "LCD screen",
              "2mm acrylic sheet",
              "Wood box",
              "Keyboard",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-3">Software</h3>
          <ul className="list-disc pl-5">
            {[
              "Pi OS Lite",
              "Ollama",
              "Gemma 3 1B",
              "Python",
              "Flite TTS",
              "MPV player",
              "Nomad Sculpt",
              "Blender",
              "Gemini 2.5",
              "Hunyuan3D-2",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </ProjectLayout>
  );
}
