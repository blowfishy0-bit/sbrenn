import Image from "next/image";
import ProjectLayout from "@/components/ProjectLayout";
import { cargoImg } from "@/lib/cargo";

const images = [
  cargoImg("M2754779711179694670479735811326", "png.png"),
  cargoImg("L2754779711161247926406026259710", "final.png"),
  cargoImg("N2754779711142801182332316708094", "IMG_3515.png"),
  cargoImg("P2754779711124354438258607156478", "hbjbjhbbj.png"),
  cargoImg("F2754779711105907694184897604862", "IMG_3562.png"),
  cargoImg("F2754779711087460950111188053246", "IMG_3553.png"),
  cargoImg("G2754779711069014206037478501630", "IMG_3502.png"),
  cargoImg("F2754779711050567461963768950014", "IMG_3591.png"),
  cargoImg("M2754779711032120717890059398398", "IMG_3590.png"),
  cargoImg("J2754779711013673973816349846782", "IMG_3560.png"),
  cargoImg("Z2754779710995227229742640295166", "IMG_3559.png"),
  cargoImg("Y2754779710976780485668930743550", "knit.png"),
  cargoImg("G2754779710958333741595221191934", "page7-1.png"),
  cargoImg("S2754779710939886997521511640318", "pic5.png"),
  cargoImg("H2754779710921440253447802088702", "pic4.png"),
  cargoImg("J2754779710902993509374092537086", "hghgjjkljk.png"),
  cargoImg("Y2754779710884546765300382985470", "jhgcfghgj.png"),
  cargoImg("H2754779710866100021226673433854", "swatch.png"),
  cargoImg("K2754779710847653277152963882238", "IMG_3599.png"),
  cargoImg("W2754779710829206533079254330622", "lkjhgfd.png"),
  cargoImg("G2754779710810759789005544779006", "IMG_3490.png"),
  cargoImg("V2754779710792313044931835227390", "ughjg.png"),
  cargoImg("R2754779710773866300858125675774", "IMG_3473.png"),
  cargoImg("T2754779710755419556784416124158", "knjbhvgc.png"),
  cargoImg("I2754779710736972812710706572542", "ikujyhtfgdr.png"),
  cargoImg("H2754779710718526068636997020926", "huyftdryu.png"),
  cargoImg("J2754779710700079324563287469310", "jhvngcnh-min.png"),
  cargoImg("N2754779710681632580489577917694", "njbhvg.png"),
];

export const metadata = {
  title: "Knit Design — Sophie Brenner",
};

export default function Knit() {
  return (
    <ProjectLayout slug="knit">
      <h2 className="font-light tracking-tight mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
        Knit Design
      </h2>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        Domestic knit machine
      </p>

      <div className="columns-2 md:columns-4 gap-4">
        {images.map((src, i) => (
          <div key={i} className="mb-4 break-inside-avoid rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            <Image
              src={src}
              alt={`Knit ${i + 1}`}
              width={600}
              height={600}
              className="w-full h-auto"
              sizes="25vw"
            />
          </div>
        ))}
      </div>
    </ProjectLayout>
  );
}
