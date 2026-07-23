import { cargoImg } from "./cargo";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  blurb?: string;
  status?: string;        // badge label next to the card title, e.g. "Shipped"
  logo?: string;          // small mark rendered in front of the card title
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
    slug: "the-3d-app-dashboard",
    title: "The3DApp",
    logo: "/logo.png",
    subtitle: "B2B Real Estate Agent Dashboard",
    blurb: "The first analytics and management dashboard for The3DApp's real-estate agents — a 0→1 product built from user research. Designed the workflow connecting dashboard → tours created → views & shares into a measurable product loop.",
    status: "Shipped",
    tags: ["Shipped", "B2B", "Product", "0→1"],
    category: "ux",
    thumb: "/real%20real%20real%20real%20real_.png",
  },
  {
    slug: "holomaid",
    title: "HoloMaid: Human-AI Holographic Companionship",
    subtitle: "LLM, Arduino, Blender, Hologram",
    status: "Interactive",
    tags: ["Immersive", "AI", "Hardware"],
    category: "immersive",
    thumb: "/holomaid-1.png",
    hoverThumbs: ["/holomaid-1.png", "/holomaid-2.png", "/holomaid-3.png", "/holomaid-4.png"],
  },
  {
    slug: "the-3d-app-1",
    title: "The3DApp",
    logo: "/logo.png",
    subtitle: "3D AI Stager Tools",
    blurb: "A shipped AI-powered virtual staging tool for The3DApp. Research-driven UX for how listing agents stage, edit, and present properties inside a 3D tour.",
    status: "Shipped",
    tags: ["Shipped", "AI", "UX/UI"],
    category: "ux",
    thumb: "/the3dapp-logo.png",
    thumbWhiteBg: true,
  },
  {
    slug: "stylo-app",
    title: "STYLO",
    subtitle: "Interactive Prototype · React, TypeScript, Three.js",
    status: "Prototype",
    tags: ["UX/UI"],
    category: "ux",
    thumb: "/bannerreal.png",
  },
  {
    slug: "climate-collective",
    title: "Mosambi",
    logo: "/mosambi%20logo.png",
    subtitle: "Onboarding For Climate Startup",
    blurb: "Onboarding flow for a climate action platform. Research, wireframing, and a full design system to communicate the mission and guide new users to activation.",
    status: "Delivered",
    tags: ["Client", "Onboarding"],
    category: "ux",
    thumb: "/group-20.jpg",
    hoverThumb: "/mosambi.jpg",
    thumbWhiteBg: true,
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
    status: "Interactive",
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
    subtitle: "Domestic Knit Machine",
    status: "Interactive",
    tags: ["Textile"],
    category: "art",
    thumb: cargoImg("S2754783267564378129091610963198", "knit-ezgif.com-crop.png"),
  },
];

export const CASE_STUDY_SLUGS = ["the-3d-app-dashboard", "the-3d-app-1", "climate-collective", "stylo-app", "holomaid", "nyc", "knit"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
