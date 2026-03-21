import Image from "next/image";
import ProjectLayout from "@/components/ProjectLayout";
import { cargoImg } from "@/lib/cargo";

const images = [
  cargoImg("E2735273471940644673115746888958", "IMG_5403-1.jpg"),
  cargoImg("R2735273471922197929042037337342", "page-1.png"),
  cargoImg("X2735273471903751184968327785726", "page5.png"),
  cargoImg("V2735273471885304440894618234110", "page6.png"),
  cargoImg("G2735273471811517464599780027646", "FIasdNAL.png"),
  cargoImg("G2735273471848410952747199130878", "20191030_110735.jpg"),
  cargoImg("T2735273471719283744231232269566", "sddsfdsf.png"),
  cargoImg("Q2735273471829964208673489579262", "color.png"),
  cargoImg("X2735273471774623976452360924414", "IMG_2092.png"),
  cargoImg("N2735273471756177232378651372798", "IMG_5966.png"),
  cargoImg("A2735273471737730488304941821182", "project.png"),
  cargoImg("H2735273471866857696820908682494", "page7.png"),
  cargoImg("D2735273471793070720526070476030", "dasffgvhcsc.png"),
  cargoImg("H2735273471700837000157522717950", "skeleton-sophie-brenner.png"),
  cargoImg("F2735273471682390256083813166334", "thumbnail-process.png"),
];

export const metadata = {
  title: "Sketches — Sophie Brenner",
};

export default function Sketches() {
  return (
    <ProjectLayout slug="sketches">
      <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
        Sketches
      </h2>

      {/* Justified masonry-style grid */}
      <div className="columns-2 md:columns-3 gap-4">
        {images.map((src, i) => (
          <div key={i} className="mb-4 break-inside-avoid rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            <Image
              src={src}
              alt={`Sketch ${i + 1}`}
              width={800}
              height={600}
              className="w-full h-auto"
              sizes="33vw"
            />
          </div>
        ))}
      </div>
    </ProjectLayout>
  );
}
