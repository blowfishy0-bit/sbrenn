import { cargoImg } from "./cargo";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  blurb?: string;
  tags: string[];
  category: "ux" | "immersive" | "3d" | "art";
  thumb: string;          // URL for homepage card thumbnail
  hoverThumb?: string;    // optional alternate image shown on hover
  hoverThumbs?: string[]; // optional array of images to cycle through on hover
  thumbIsGif?: boolean;
  thumbWhiteBg?: boolean;
  thumbContain?: boolean;
}

export const projects: Project[] = [
  {
    slug: "the-3d-app-1",
    title: "The3DApp",
    subtitle: "Figma, UX Research (Ongoing)",
    blurb: "An ongoing product redesign for a 3D marketplace platform. Research-driven UX improvements to core browsing, discovery, and onboarding flows.",
    tags: ["Client", "UX/UI"],
    category: "ux",
    thumb: "/the3dapp-logo.png",
    thumbWhiteBg: true,
  },
  {
    slug: "stylo-app",
    title: "STYLO app",
    subtitle: "Placeholder subtitle",
    tags: ["UX/UI"],
    category: "ux",
    thumb: "/banner.png",
  },
  {
    slug: "holomaid",
    title: "HoloMaid: Human-AI Holographic Companionship",
    subtitle: "LLM, Arduino, Blender, Hologram",
    tags: ["Immersive", "AI", "Hardware"],
    category: "immersive",
    thumb: "/holomaid-1.png",
    hoverThumbs: ["/holomaid-1.png", "/holomaid-2.png", "/holomaid-3.png", "/holomaid-4.png"],
  },
  {
    slug: "ui-redesign-1",
    title: "SpareRoom Redesign",
    subtitle: "Figma, UX Research, Design System, UI",
    blurb: "End-to-end UX and UI redesign of the UK's largest flat-sharing platform, addressing key usability issues in search, filtering, and listing creation.",
    tags: ["UX/UI", "Figma"],
    category: "ux",
    thumb: cargoImg("P2735223558685189797589855661310", "MacBookPro14_-3-ezgif.com-crop.png"),
  },
  {
    slug: "climate-collective",
    title: "Climate Collective Mosambi",
    subtitle: "Figma, UX Research, UI Design System",
    blurb: "Onboarding flow for a climate action platform. Research, wireframing, and a full design system to communicate the mission and guide new users to activation.",
    tags: ["Client", "Onboarding"],
    category: "ux",
    thumb: "/group-20.svg",
    hoverThumb: "/mosambi.svg",
  },
  {
    slug: "playground",
    title: "3D Animation & Arduino",
    subtitle: "Blender, TouchDesigner, Audio Reactive, Arduino",
    tags: ["3D", "Arduino", "Audio"],
    category: "3d",
    thumb: cargoImg("D2729863995618941016484302187774", "ScreenRecording2025-05-25at4.32.24PM_1-ezgif.com-crop-2.gif"),
    thumbIsGif: true,
  },
  {
    slug: "nyc",
    title: "NYC Spatial Design",
    subtitle: "Interactive Environment Design, Unity (C#)",
    tags: ["Spatial", "Unity"],
    category: "immersive",
    thumb: cargoImg("K2721659513700584660664435764478", "3_sophie_interaction.jpg"),
    hoverThumbs: [cargoImg("K2721659513700584660664435764478", "3_sophie_interaction.jpg"), "/nyc-hover.png"],
  },
  {
    slug: "sketches",
    title: "Sketches",
    subtitle: "Pencil, Charcoal",
    tags: ["Art"],
    category: "art",
    thumb: cargoImg("O2735285959353364906354456030462", "page6-ezgif.com-crop.png"),
  },
  {
    slug: "knit",
    title: "Knit Design",
    subtitle: "Domestic knit machine",
    tags: ["Textile"],
    category: "art",
    thumb: cargoImg("S2754783267564378129091610963198", "knit-ezgif.com-crop.png"),
  },
];

export const CASE_STUDY_SLUGS = ["stylo-app", "the-3d-app-1", "climate-collective", "holomaid", "nyc"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
