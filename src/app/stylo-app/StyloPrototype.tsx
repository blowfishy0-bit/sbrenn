"use client";
import { useState, Suspense, useMemo, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Center } from "@react-three/drei";
import { Box3, Vector3 } from "three";

type Screen = "splash" | "home" | "media" | "room" | "product" | "cart";
type Tab = "style" | "shop";

interface Product {
  id: string; name: string; brand: string; size: string; price: number; image: string; category: string;
}
interface CartItem extends Product { uid: string; }

const SERIF = '"Playfair Display", Georgia, "Times New Roman", serif';
const SANS  = '-apple-system, BlinkMacSystemFont, "DM Sans", "Helvetica Neue", sans-serif';

// Palette matching Lovable
const C = {
  bg:      "#faf9f7",
  fg:      "#141414",
  muted:   "#888880",
  border:  "#e8e3de",
  cream:   "#f5f0eb",
  white:   "#ffffff",
};

const STYLES = [
  { id: "custom",   label: "Custom",       thumb: null },
  { id: "boho",     label: "Boho",         thumb: "/stylo/modern-boho-style.jpg" },
  { id: "industrial",label:"Industrial",   thumb: "/stylo/industrial-image.webp" },
  { id: "scandi",   label: "Scandinavian", thumb: "/stylo/scandi.jpg" },
];

const STYLE_IMG: Record<string, Record<string, string>> = {
  master: {
    boho:       "/stylo/boho-hero.jpg",
    industrial: "/stylo/industrial-hero.jpg",
    scandi:     "/stylo/scandi-hero.jpg",
  },
  kitchen: {
    boho:       "/stylo/aviv-boho.jpg",
    industrial: "/stylo/aviv-industrial.jpg",
    scandi:     "/stylo/aviv-scandi.jpg",
  },
  living: {
    boho:       "/stylo/living-boho.jpg",
    industrial: "/stylo/living-industrial.jpg",
    scandi:     "/stylo/living-scandi.jpg",
  },
  gallery: {
    boho:       "/stylo/gallery-boho.jpg",
    industrial: "/stylo/gallery-scandi.jpg",
    scandi:     "/stylo/gallery-industrial.jpg",
  },
};

const ROOM_PRODUCTS: Record<string, Product[]> = {
  master: [
    { id:"p1", name:"Walnut Platform Bed",   brand:"B&B Italia",  size:"200 x 100 cm", price:1299, image:"/stylo/bedframe1.jpg",     category:"BEDS" },
    { id:"p2", name:"Oak Platform Bed",      brand:"Artefacto",   size:"200 x 100 cm", price:1149, image:"/stylo/bedframe2.jpg",     category:"BEDS" },
    { id:"p3", name:"Linen Upholstered Bed", brand:"Restoration Hardware", size:"200 x 100 cm", price:1899, image:"/stylo/bedframe3.jpg", category:"BEDS" },
    { id:"p4", name:"Maple Sleigh Bed",      brand:"Ethan Allen", size:"180 x 90 cm",  price:1399, image:"/stylo/bedframe4.jpg", category:"BEDS" },
  ],
  kitchen: [
    { id:"p1", name:"Rattan Bar Stool",      brand:"CB2",         size:"45 x 45 x 75 cm", price:349, image:"/stylo/rattan-stool.jpg",  category:"STOOLS" },
    { id:"p2", name:"Woven Counter Stool",   brand:"West Elm",    size:"42 x 42 x 65 cm", price:299, image:"/stylo/woven-stool2.jpg",  category:"STOOLS" },
    { id:"p3", name:"Teak Bar Stool",        brand:"Article",     size:"44 x 44 x 76 cm", price:379, image:"/stylo/teak-stool.jpg",    category:"STOOLS" },
    { id:"p4", name:"Bamboo Counter Stool",  brand:"Anthropologie", size:"40 x 40 x 66 cm", price:259, image:"/stylo/bamboo-stool2.jpg", category:"STOOLS" },
  ],
  living: [
    { id:"p1", name:"Velvet Sectional Sofa", brand:"Article",     size:"280 x 160 cm", price:2199, image:"/stylo/velvet-sofa.jpg",    category:"SOFAS" },
    { id:"p2", name:"Leather Modular Sofa",  brand:"B&B Italia",  size:"260 x 150 cm", price:3499, image:"/stylo/leather-sofa.jpg",   category:"SOFAS" },
    { id:"p3", name:"Linen Loveseat",        brand:"Crate & Barrel", size:"180 x 90 cm", price:1299, image:"/stylo/linen-loveseat2.jpg", category:"SOFAS" },
    { id:"p4", name:"Boucle Cloud Sofa",     brand:"Restoration Hardware", size:"240 x 140 cm", price:2899, image:"/stylo/cloud-sofa.jpg", category:"SOFAS" },
  ],
  industrial: [
    { id:"p1", name:"Iron Frame Bed",        brand:"West Elm",    size:"200 x 100 cm", price:899,  image:"/stylo/bedframe1.jpg",      category:"BEDS" },
    { id:"p2", name:"Steel Platform Bed",    brand:"CB2",         size:"200 x 100 cm", price:1049, image:"/stylo/bedframe2.jpg",      category:"BEDS" },
    { id:"p3", name:"Reclaimed Wood Bed",    brand:"Pottery Barn", size:"200 x 100 cm", price:1299, image:"/stylo/bedframe3.jpg",     category:"BEDS" },
    { id:"p4", name:"Metal Pipe Bed Frame",  brand:"Article",     size:"180 x 90 cm",  price:749,  image:"/stylo/bedframe4.jpg",      category:"BEDS" },
  ],
};

const ROOMS = [
  { id:"master",     name:"Master Bedroom",         img:"/stylo/splash-bedroom.jpg" },
  { id:"kitchen",    name:"Kitchen",               img:"/stylo/aviv.png" },
  { id:"living",     name:"Living Room",            img:"/stylo/living-room.png" },
];

// Hotspot positions (% x, % y) for shop overlay
const HOTSPOTS = [{ x:52, y:48 }, { x:28, y:62 }, { x:72, y:55 }];

const IcoBack = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M14 17l-5-6 5-6" stroke={C.fg} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoBookmark = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 2h12v16l-6-3.5L4 18V2z" stroke={C.fg} strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "#fff" : C.fg;
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"50px 22px 0", fontFamily:SANS, fontSize:13, fontWeight:600, color:c, flexShrink:0 }}>
      <span>9:41</span>
      <div style={{ display:"flex", gap:5, alignItems:"center" }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill={c}><rect x="0" y="8" width="3" height="3" rx="0.5"/><rect x="4.5" y="5.5" width="3" height="5.5" rx="0.5"/><rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/><rect x="13.5" y="0" width="3" height="11" rx="0.5" opacity="0.3"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.5" r="1.2" fill={c}/><path d="M4.8 7.3a4.5 4.5 0 016.4 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/><path d="M2 4.5a8 8 0 0112 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3.5" stroke={c} strokeOpacity="0.4"/><rect x="2" y="2" width="16" height="8" rx="2" fill={c}/><path d="M22 4v4c.8-.3 1-1 1-2s-.2-1.7-1-2z" fill={c} fillOpacity="0.4"/></svg>
      </div>
    </div>
  );
}

export default function StyloPrototype() {
  const [screen, setScreen]               = useState<Screen>("splash");
  const [isReturning, setIsReturning]     = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string|null>(null);
  const [tab, setTab]                     = useState<Tab>("style");
  const [tabDir, setTabDir]               = useState<"left"|"right">("right");
  const [tabMoved, setTabMoved]           = useState(false);
  const [tabAnimating, setTabAnimating]   = useState(false);
  const [product, setProduct]             = useState<Product|null>(null);
  const [cart, setCart]                   = useState<CartItem[]>([]);
  const [loading, setLoading]             = useState(false);
  const [prev, setPrev]                   = useState<Screen>("home");
  const [showMedia, setShowMedia]         = useState(false);
  const [showCamera, setShowCamera]       = useState(false);
  const [showGallery, setShowGallery]     = useState(false);
  const [selectedRoom, setSelectedRoom]   = useState(ROOMS[0]);
  const [activeHotspot, setActiveHotspot] = useState(2);
  const [uploadedRoom, setUploadedRoom]   = useState<{ id:string; name:string; img:string }|null>(null);
  const [menuRoom, setMenuRoom]           = useState<string|null>(null);

  const n = cart.length;
  const roomImg = selectedStyle && STYLE_IMG[selectedRoom.id]?.[selectedStyle] ? STYLE_IMG[selectedRoom.id][selectedStyle] : selectedRoom.img;

  function go(s: Screen) { setPrev(screen); setScreen(s); setShowRoomAR(false); }
  function back() { setScreen(prev); setShowRoomAR(false); }
  function addToCart(p: Product) { setCart(c => [...c, { ...p, uid: Date.now()+Math.random()+"" }]); }
  function removeFromCart(uid: string) { setCart(c => c.filter(i => i.uid !== uid)); }

  function pickStyle(id: string) {
    setSelectedStyle(id);
  }
  function enterRoom(returning: boolean, room?: typeof ROOMS[number]) {
    if (room) setSelectedRoom(room);
    setIsReturning(returning);
    setSelectedStyle(null);
    if (!returning) { setLoading(false); }
    setTab("style");
    setTabMoved(false);
    setPrev("home");
    setScreen("room");
  }

  function CartBtn({ light = false }: { light?: boolean }) {
    const col = light ? "#fff" : C.fg;
    return (
      <button onClick={() => go("cart")} style={{ background:"none", border:"none", cursor:"pointer", position:"relative", padding:0, lineHeight:0 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={col} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="3" y1="6" x2="21" y2="6" stroke={col} strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M16 10a4 4 0 01-8 0" stroke={col} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {n > 0 && <span style={{ position:"absolute", top:-5, right:-5, background:light?"#fff":C.fg, color:light?C.fg:"#fff", borderRadius:"50%", width:15, height:15, fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:SANS }}>{n}</span>}
      </button>
    );
  }

  /* ── SPLASH ── */
  function Splash() {
    return (
      <div style={{ position:"relative", height:"100%", overflow:"hidden", background:"#0a0a0a" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
          @keyframes sspin { to { transform: rotate(360deg); } }
          @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.15);opacity:1} }
        `}</style>
        <img src="/stylo/living-scandi.jpg" alt="bedroom" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", opacity:0.8 }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,1) 100%)" }}/>
        <StatusBar light />
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"0 28px 52px", paddingTop:"calc(50px + 22px)" }}>
          {/* logo */}
          <div style={{ paddingTop:8 }}>
            <span style={{ fontFamily:SANS, fontSize:32, fontWeight:700, color:"#fff", letterSpacing:"-0.01em" }}>Stylo</span>
          </div>
          {/* bottom */}
          <div style={{ marginTop:"auto", width:"100%" }}>
            <p style={{ fontFamily:SANS, fontSize:30, fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:10, letterSpacing:"-0.01em" }}>
              Your room,<br/>reimagined.
            </p>
            <p style={{ fontFamily:SANS, fontSize:14, color:"rgba(255,255,255,0.75)", marginBottom:28, lineHeight:1.5, fontWeight:300 }}>
              Upload. Style. Shop.
            </p>
            <style>{`@keyframes breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.025)} }`}</style>
            <button
              onClick={() => setScreen("home")}
              style={{ width:"100%", padding:"17px", background:"rgba(255,255,255,0.18)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", color:"#fff", border:"1px solid rgba(255,255,255,0.4)", borderRadius:100, fontFamily:SANS, fontSize:16, fontWeight:600, cursor:"pointer", letterSpacing:"0.01em", boxShadow:"0 4px 24px rgba(0,0,0,0.15)", animation:"breathe 3s ease-in-out infinite" }}
            >
              Elevate your space
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── HOME ── */
  function Home() {
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100%", background:C.bg }}>
        <StatusBar/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 14px" }}>
          <div style={{ width:22 }}/>
          <span style={{ fontFamily:SANS, fontSize:17, fontWeight:600, color:C.fg }}>Stylo</span>
          <CartBtn/>
        </div>
        {/* grid */}
        <div style={{ flex:1, overflowY:"auto", padding:"0 20px 28px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, alignContent:"start" }}>
          {/* add room card */}
          <div onClick={() => setShowMedia(true)} style={{ position:"relative", borderRadius:20, overflow:"hidden", aspectRatio:"1/1", cursor:"pointer", background:"rgba(255,255,255,0.4)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:"1.5px solid rgba(180,175,170,0.45)", boxShadow:"0 2px 16px rgba(0,0,0,0.05)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(0,0,0,0.25)", border:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <span style={{ fontFamily:SANS, fontSize:12, color:C.muted, fontWeight:500 }}>Add Room</span>
          </div>
          {uploadedRoom && (
            <div key={uploadedRoom.id} onClick={() => enterRoom(true, uploadedRoom)} style={{ position:"relative", borderRadius:20, overflow:"hidden", aspectRatio:"1/1", cursor:"pointer", boxShadow:"0 2px 16px rgba(0,0,0,0.1)" }}>
              <img src={uploadedRoom.img} alt={uploadedRoom.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 30%)" }}/>
              <span style={{ position:"absolute", bottom:11, left:12, color:"#fff", fontFamily:SANS, fontSize:12, fontWeight:700, lineHeight:1.3 }}>{uploadedRoom.name}</span>
              <button onClick={e => { e.stopPropagation(); setMenuRoom(menuRoom === uploadedRoom.id ? null : uploadedRoom.id); }} style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius:"50%", background:"rgba(0,0,0,0.3)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:3 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="3" cy="7" r="1.2" fill="#fff"/><circle cx="7" cy="7" r="1.2" fill="#fff"/><circle cx="11" cy="7" r="1.2" fill="#fff"/></svg>
              </button>
              {menuRoom === uploadedRoom.id && (
                <div onClick={e => e.stopPropagation()} style={{ position:"absolute", top:40, right:8, background:"#fff", borderRadius:12, boxShadow:"0 4px 16px rgba(0,0,0,0.15)", overflow:"hidden", zIndex:4, minWidth:120 }}>
                  <button onClick={() => setMenuRoom(null)} style={{ display:"block", width:"100%", padding:"10px 16px", border:"none", background:"none", fontFamily:SANS, fontSize:13, fontWeight:500, color:C.fg, cursor:"pointer", textAlign:"left" }}>Rename</button>
                  <div style={{ height:1, background:C.border }}/>
                  <button onClick={() => { setMenuRoom(null); setUploadedRoom(null); }} style={{ display:"block", width:"100%", padding:"10px 16px", border:"none", background:"none", fontFamily:SANS, fontSize:13, fontWeight:500, color:"#e53e3e", cursor:"pointer", textAlign:"left" }}>Delete</button>
                </div>
              )}
            </div>
          )}
          {ROOMS.map((r) => (
            <div key={r.id} onClick={() => enterRoom(true, r)} style={{ position:"relative", borderRadius:20, overflow:"hidden", aspectRatio:"1/1", cursor:"pointer", boxShadow:"0 2px 16px rgba(0,0,0,0.1)" }}>
              <img src={r.img} alt={r.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 30%)" }}/>
              <span style={{ position:"absolute", bottom:11, left:12, color:"#fff", fontFamily:SANS, fontSize:12, fontWeight:700, lineHeight:1.3 }}>{r.name}</span>
              <button onClick={e => { e.stopPropagation(); setMenuRoom(menuRoom === r.id ? null : r.id); }} style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius:"50%", background:"rgba(0,0,0,0.3)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:3 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="3" cy="7" r="1.2" fill="#fff"/><circle cx="7" cy="7" r="1.2" fill="#fff"/><circle cx="11" cy="7" r="1.2" fill="#fff"/></svg>
              </button>
              {menuRoom === r.id && (
                <div onClick={e => e.stopPropagation()} style={{ position:"absolute", top:40, right:8, background:"#fff", borderRadius:12, boxShadow:"0 4px 16px rgba(0,0,0,0.15)", overflow:"hidden", zIndex:4, minWidth:120 }}>
                  <button onClick={() => setMenuRoom(null)} style={{ display:"block", width:"100%", padding:"10px 16px", border:"none", background:"none", fontFamily:SANS, fontSize:13, fontWeight:500, color:C.fg, cursor:"pointer", textAlign:"left" }}>Rename</button>
                  <div style={{ height:1, background:C.border }}/>
                  <button onClick={() => setMenuRoom(null)} style={{ display:"block", width:"100%", padding:"10px 16px", border:"none", background:"none", fontFamily:SANS, fontSize:13, fontWeight:500, color:"#e53e3e", cursor:"pointer", textAlign:"left" }}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── MEDIA PICKER ── */
  function Media() {
    const [closing, setClosing] = useState(false);

    function dismiss() {
      setClosing(true);
      setTimeout(() => setShowMedia(false), 300);
    }

    return (
      <div onClick={dismiss} style={{ display:"flex", flexDirection:"column", height:"100%", background: closing ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.5)", justifyContent:"flex-end", animation: closing ? "none" : "media-bg-in 0.3s ease forwards", transition:"background 0.3s ease" }}>
        <style>{`@keyframes media-bg-in { from { background:rgba(0,0,0,0); } to { background:rgba(0,0,0,0.5); } } @keyframes media-slide-in { from { transform:translateY(100%); } to { transform:translateY(0); } } @keyframes media-slide-out { from { transform:translateY(0); } to { transform:translateY(100%); } }`}</style>
        <div
          onClick={e => e.stopPropagation()}
          style={{ background:C.white, borderRadius:"24px 24px 0 0", padding:"10px 22px 44px", animation: closing ? "media-slide-out 0.28s cubic-bezier(0.4,0,0.2,1) forwards" : "media-slide-in 0.32s cubic-bezier(0.4,0,0.2,1) forwards" }}>
          <div style={{ width:36, height:4, background:C.border, borderRadius:2, margin:"0 auto 20px" }}/>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <span style={{ fontFamily:SANS, fontSize:17, fontWeight:600, color:C.fg }}>Select Media Source</span>
            <button onClick={dismiss} style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke={C.fg} strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          </div>
          {[{ icon:"cam", label:"Take photo from camera" }, { icon:"gal", label:"Choose from gallery" }].map(o => (
            <button key={o.icon} onClick={(e) => { e.stopPropagation(); dismiss(); setTimeout(() => { if (o.icon === "cam") setShowCamera(true); else setShowGallery(true); }, 300); }} style={{ display:"flex", alignItems:"center", gap:14, width:"100%", background:"rgba(255,255,255,0.4)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:"1.5px solid rgba(180,175,170,0.45)", borderRadius:20, padding:"14px 16px", cursor:"pointer", marginBottom:10, fontFamily:SANS, fontSize:15, color:C.fg, textAlign:"left", boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
              <div style={{ width:42, height:42, background:"rgba(0,0,0,0.25)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {o.icon === "cam"
                  ? <svg width="20" height="18" viewBox="0 0 20 18" fill="none"><rect x="2" y="5" width="16" height="11" rx="2.5" stroke="#fff" strokeWidth="1.3"/><circle cx="10" cy="10.5" r="3" stroke="#fff" strokeWidth="1.3"/><path d="M7 5l1-2h4l1 2" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                  : <svg width="20" height="18" viewBox="0 0 20 18" fill="none"><rect x="2" y="2" width="16" height="14" rx="2.5" stroke="#fff" strokeWidth="1.3"/><path d="M2 12l4-4 3 3 3-3 6 5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="7" r="1.5" fill="#fff"/></svg>
                }
              </div>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ── CAMERA ── */
  function Camera() {
    const [closing, setClosing] = useState(false);
    function dismiss() { setClosing(true); setTimeout(() => setShowCamera(false), 280); }
    return (
      <div style={{ position:"absolute", inset:0, zIndex:25, background:"#000", display:"flex", flexDirection:"column", animation: closing ? "media-slide-out 0.28s cubic-bezier(0.4,0,0.2,1) forwards" : "media-slide-in 0.28s cubic-bezier(0.4,0,0.2,1) forwards" }}>
        {/* top black bar with status + close */}
        <div style={{ background:"#000", flexShrink:0, paddingBottom:12 }}>
          <StatusBar light/>
          <div style={{ padding:"8px 20px 0", display:"flex", justifyContent:"flex-end" }}>
            <button onClick={dismiss} style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:0 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5l12 12M17 5L5 17" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        {/* viewfinder */}
        <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
          <img src="/stylo/aviv.png" alt="viewfinder" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
        </div>
        {/* bottom black bar with shutter + home indicator */}
        <div style={{ background:"#000", flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", padding:"28px 0 20px" }}>
          <button onClick={() => { setClosing(true); setTimeout(() => { setShowCamera(false); const kitchen = ROOMS.find(r => r.id === "kitchen")!; setSelectedRoom(kitchen); setSelectedStyle(null); setIsReturning(false); setTab("style"); setTabMoved(false); setPrev("home"); setScreen("room"); }, 280); }} style={{ width:61, height:61, borderRadius:"50%", background:"#fff", border:"none", cursor:"pointer", padding:0 }}/>
        </div>
      </div>
    );
  }

  /* ── GALLERY ── */
  function Gallery() {
    const [closing, setClosing] = useState(false);
    const [galTab, setGalTab] = useState<"photos"|"albums">("photos");
    const [selected, setSelected] = useState(false);
    function dismiss() { setClosing(true); setTimeout(() => setShowGallery(false), 280); }
    function confirm() {
      setClosing(true);
      setTimeout(() => {
        setShowGallery(false);
        const newRoom = { id:"gallery", name:"My Room", img:"/stylo/gallery-room.png" };
        setUploadedRoom(newRoom);
        setSelectedRoom(newRoom);
        setSelectedStyle(null);
        setIsReturning(false);
        setTab("style");
        setTabMoved(false);
        setPrev("home");
        setScreen("room");
      }, 280);
    }
    return (
      <div style={{ position:"absolute", inset:0, zIndex:25, background:"#1C1C1E", display:"flex", flexDirection:"column", animation: closing ? "media-slide-out 0.28s cubic-bezier(0.4,0,0.2,1) forwards" : "media-slide-in 0.28s cubic-bezier(0.4,0,0.2,1) forwards" }}>
        {/* header */}
        <div style={{ padding:"50px 16px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={dismiss} style={{ width:42, height:42, borderRadius:21, background:"rgba(70,70,72,0.2)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          {/* tabs */}
          <div style={{ display:"flex", background:"rgba(74,74,82,0.2)", borderRadius:23, padding:2 }}>
            <button onClick={() => setGalTab("photos")} style={{ padding:"8px 20px", borderRadius:21, border:"none", cursor:"pointer", fontFamily:SANS, fontSize:14, fontWeight:600, background: galTab==="photos" ? "#464648" : "transparent", color:"#fff", transition:"background 0.2s" }}>Photos</button>
            <button onClick={() => setGalTab("albums")} style={{ padding:"8px 20px", borderRadius:21, border:"none", cursor:"pointer", fontFamily:SANS, fontSize:14, fontWeight:600, background: galTab==="albums" ? "#464648" : "transparent", color:"#fff", transition:"background 0.2s" }}>Albums</button>
          </div>
          <button onClick={() => { if (selected) confirm(); }} style={{ width:42, height:42, borderRadius:21, background: selected ? "#0097FF" : "rgba(70,70,72,0.2)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 6 9-12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        {/* single image */}
        <div style={{ flex:1, overflow:"auto", background:"#000300", padding:1.5 }}>
          <button onClick={() => setSelected(!selected)} style={{ position:"relative", width:"calc(33.33% - 1px)", aspectRatio:"1/1", border:"none", padding:0, cursor:"pointer", background:"#2a2a2e", overflow:"hidden", display:"block" }}>
            <img src="/stylo/gallery-room.png" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            {selected && (
              <div style={{ position:"absolute", bottom:6, right:6, width:23, height:23, borderRadius:12, background:"#0094FF", border:"2px solid #fff", boxSizing:"border-box", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:SANS, fontSize:11, fontWeight:700, color:"#fff", lineHeight:1 }}>1</div>
            )}
          </button>
        </div>
      </div>
    );
  }

  /* ── ROOM ── */
  const [showRoomAR, setShowRoomAR] = useState(false);

  function Room() {
    if (loading) return (
      <div style={{ display:"flex", flexDirection:"column", height:"100%", background:C.bg }}>
        <StatusBar/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 12px" }}>
          <button onClick={() => setScreen("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:0 }}><IcoBack/></button>
          <span style={{ fontFamily:SANS, fontSize:17, fontWeight:600, color:C.fg }}>{selectedRoom.name}</span>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}><CartBtn/></div>
        </div>
        <div style={{ height:260, flexShrink:0, position:"relative", overflow:"hidden" }}>
          <img src={selectedRoom.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"blur(4px)", transform:"scale(1.08)" }}/>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ width:42, height:42, border:"3px solid rgba(255,255,255,0.2)", borderTop:"3px solid #fff", borderRadius:"50%", animation:"sspin 0.85s linear infinite" }}/>
            <span style={{ fontFamily:SANS, fontSize:14, color:"#fff", fontWeight:500 }}>Generating style…</span>
          </div>
        </div>
      </div>
    );

    const hasStyle = isReturning;

    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100%", background:C.bg }}>
        <StatusBar/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 10px", flexShrink:0 }}>
          <button onClick={() => setScreen("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:0 }}><IcoBack/></button>
          <span style={{ fontFamily:SANS, fontSize:17, fontWeight:600, color:C.fg }}>{selectedRoom.name}</span>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}><CartBtn/></div>
        </div>

        {/* room image with optional hotspots */}
        <div style={{ height: 210, flexShrink:0, overflow:"hidden", position:"relative" }}>
          {(() => {
            const prods = ROOM_PRODUCTS[selectedRoom.id] ?? ROOM_PRODUCTS.master;
            const cat = prods[activeHotspot]?.category;
            const camPos: [number,number,number] = cat === "STOOLS" ? [0,3,8] : cat === "SOFAS" ? [0,3,7] : [0,2,5];
            return showRoomAR && tab === "shop" ? (
              <div className="ar-canvas-wrap" style={{ position:"absolute", top:0, left:0, right:0, bottom:0, background:"#e0e0e0" }}>
                <Canvas camera={{ position:camPos, fov:45 }}>
                  <ambientLight intensity={1}/>
                  <directionalLight position={[5,5,5]} intensity={1}/>
                  <directionalLight position={[-5,3,-5]} intensity={0.4}/>
                  <Suspense fallback={null}>
                    <Stage adjustCamera={false} intensity={0.5} environment="city" center={{ disable: true }}>
                      <Center>
                        {cat === "STOOLS" ? <StoolModel/> : cat === "SOFAS" ? <CouchModel/> : <BedModel/>}
                      </Center>
                    </Stage>
                  </Suspense>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} enableDamping={false} target={[0,0,0]}/>
                </Canvas>
              </div>
            ) : (
          <>
          <img src={roomImg} alt="room" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          {tab === "shop" && HOTSPOTS.map((h, i) => {
            const dark = i === activeHotspot;
            return (
            <div key={i} onClick={(e) => { e.stopPropagation(); setActiveHotspot(i); }} style={{ position:"absolute", left:`${h.x}%`, top:`${h.y}%`, transform:"translate(-50%,-50%)", cursor:"pointer", zIndex:5 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background: dark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.25)", border: dark ? "2px solid rgba(0,0,0,0.6)" : "2px solid rgba(255,255,255,0.7)", display:"flex", alignItems:"center", justifyContent:"center", animation:`pulse-dot 3s ease-in-out infinite`, animationDelay:`${i*0.5}s`, transition:"background 0.3s ease, border 0.3s ease" }}>
                <div style={{ width:12, height:12, borderRadius:"50%", background: dark ? "#111" : "#fff", transition:"background 0.3s ease" }}/>
              </div>
            </div>
            );
          })}
          </>
          );
          })()}
        </div>
        <div style={{ position:"relative", zIndex:10, marginTop:-40, marginBottom:16, paddingLeft:12, visibility: tab === "shop" ? "visible" : "hidden" }}>
          <button onClick={() => setShowRoomAR(!showRoomAR)} style={{ background:"rgba(0,0,0,0.4)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:100, padding:"6px 14px", fontFamily:SANS, fontSize:11, fontWeight:600, color:"#fff", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, boxShadow:"0 2px 10px rgba(0,0,0,0.15)" }}>
            {showRoomAR ? "View Photo" : "View in AR"}
          </button>
        </div>

        {/* tabs */}
        <div style={{ padding:"12px 20px 0", flexShrink:0, display:"flex", justifyContent:"center" }}>
          <div style={{ position:"relative", display:"inline-flex", background:C.cream, borderRadius:999, padding:3 }}>
            <style>{`
              @keyframes slide-right { 0%{transform:translateX(0) scaleX(1)} 40%{transform:translateX(35%) scaleX(1.3)} 100%{transform:translateX(100%) scaleX(1)} }
              @keyframes slide-left { 0%{transform:translateX(100%) scaleX(1)} 40%{transform:translateX(65%) scaleX(1.3)} 100%{transform:translateX(0) scaleX(1)} }
            `}</style>
            <div key={tabMoved ? tab : "init"} onAnimationEnd={() => setTabAnimating(false)} style={{ position:"absolute", top:3, left:3, width:"calc(50% - 3px)", height:"calc(100% - 6px)", borderRadius:999, background:C.fg, transform: tab==="shop" ? "translateX(100%)" : "translateX(0)", animation: tabAnimating ? (tab==="shop" ? "slide-right 0.18s cubic-bezier(0.25,1,0.5,1) forwards" : "slide-left 0.18s cubic-bezier(0.25,1,0.5,1) forwards") : "none" }}/>
            <button onClick={() => { setTabMoved(true); setTabAnimating(true); setTab("style"); setShowRoomAR(false); }} style={{ position:"relative", zIndex:1, padding:"7px 28px", borderRadius:999, border:"none", cursor:"pointer", fontFamily:SANS, fontSize:14, fontWeight:600, background:"transparent", color:tab==="style"?"#fff":C.muted, transition:"color 0.2s" }}>Style</button>
            <button onClick={() => { setTabMoved(true); setTabAnimating(true); setTab("shop"); setShowRoomAR(false); }} style={{ position:"relative", zIndex:1, padding:"7px 28px", borderRadius:999, border:"none", cursor:"pointer", fontFamily:SANS, fontSize:14, fontWeight:600, background:"transparent", color:tab==="shop"?"#fff":C.muted, transition:"color 0.2s" }}>Shop</button>
          </div>
        </div>

        {/* content */}
        <div style={{ flex:1, overflowY:"auto", padding:"14px 16px 24px" }}>
          {tab === "style" ? (
          <>
          <p style={{ fontFamily:SANS, fontSize:13, color:C.muted, marginBottom:14, paddingLeft:2 }}>Choose a style for this room</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
            {STYLES.map(s => (
              <button key={s.id} onClick={() => pickStyle(s.id)} style={{ background:"none", border:"none", padding:0, cursor:"pointer", textAlign:"center" }}>
                {(s.id === "custom") ? (
                  <div style={{ borderRadius:14, overflow:"hidden", aspectRatio:"1/1", background:"rgba(255,255,255,0.4)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", outline: selectedStyle===s.id ? `2.5px solid ${C.fg}` : "1.5px solid rgba(180,175,170,0.45)", outlineOffset:"1px", boxShadow:"0 2px 16px rgba(0,0,0,0.05)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative" }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:"rgba(0,0,0,0.25)", border:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ position:"absolute", bottom:7, left:0, right:0, fontFamily:SANS, fontSize:10, fontWeight:700, color:"rgba(180,175,170,1)", lineHeight:1.3, textAlign:"center" }}>{s.label}</span>
                  </div>
                ) : (
                  <div style={{ borderRadius:14, overflow:"hidden", aspectRatio:"1/1", outline: selectedStyle===s.id ? `2.5px solid ${C.fg}` : `2px solid ${C.border}`, outlineOffset:"1px", background:C.cream, position:"relative" }}>
                    <img src={s.thumb!} alt={s.label} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 30%)", borderRadius:14 }}/>
                    <span style={{ position:"absolute", bottom:7, left:0, right:0, color:"#fff", fontFamily:SANS, fontSize:10, fontWeight:700, lineHeight:1.3, textAlign:"center" }}>{s.label}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          </>
          ) : (
          <>
          <p style={{ fontFamily:SANS, fontSize:11, fontWeight:600, letterSpacing:"0.07em", color:C.muted, marginBottom:14, paddingLeft:2 }}>{(ROOM_PRODUCTS[selectedRoom.id] ?? ROOM_PRODUCTS.master).length} ITEMS</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {(ROOM_PRODUCTS[selectedRoom.id] ?? ROOM_PRODUCTS.master).map(p => (
              <div key={p.id} onClick={() => { go("product"); setProduct(p); }} style={{ background:C.white, borderRadius:18, overflow:"hidden", cursor:"pointer", border:`1px solid ${C.border}`, boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ height:110, background:C.cream, overflow:"hidden" }}>
                  <img src={p.image} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                </div>
                <div style={{ padding:"10px 10px 12px" }}>
                  <p style={{ fontFamily:SANS, fontSize:11, color:C.muted, marginBottom:1, fontWeight:400 }}>{p.brand}</p>
                  <p style={{ fontFamily:SANS, fontSize:11, fontWeight:600, color:C.fg, lineHeight:1.3, marginBottom:2 }}>{p.name}</p>
                  <p style={{ fontFamily:SANS, fontSize:10, color:C.muted, marginBottom:7 }}>{p.size}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:SANS, fontSize:13, fontWeight:700, color:C.fg }}>${p.price.toLocaleString()}</span>
                    <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                      <button onClick={e => e.stopPropagation()} style={{ width:28, height:28, borderRadius:"50%", background:"#fff", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, lineHeight:0, boxShadow:"0 2px 8px rgba(0,0,0,0.12)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z" fill={C.fg} stroke={C.fg} strokeWidth="1" strokeLinejoin="round"/></svg>
                      </button>
                      <button onClick={e => { e.stopPropagation(); addToCart(p); }} style={{ width:28, height:28, borderRadius:"50%", background:C.fg, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:1, padding:0, lineHeight:0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/><path d="M16 10a4 4 0 01-8 0" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </>
          )}
        </div>
      </div>
    );
  }

  /* ── 3D MODEL ── */
  function BedModel() {
    const { scene } = useGLTF("/stylo/bedframe.glb");
    return <primitive object={scene} scale={1.8} />;
  }

  function StoolModel() {
    const { scene } = useGLTF("/stylo/wooden_stool/scene.gltf");
    return <primitive object={scene} scale={0.08} />;
  }

  function CouchModel() {
    const { scene } = useGLTF("/stylo/couch.glb");
    return <primitive object={scene} scale={1.8} />;
  }

  /* ── PRODUCT ── */
  function ProductDetail() {
    const p = product;
    const [showAR, setShowAR] = useState(true);
    if (!p) return null;
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100%", background:C.bg }}>
        <StatusBar/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 10px", flexShrink:0 }}>
          <button onClick={() => { go("room"); setShowAR(false); }} style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:0 }}><IcoBack/></button>
          <div/>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}><CartBtn/></div>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          <div style={{ height:250, position:"relative" }}>
            {showAR ? (
              <div className="ar-canvas-wrap" style={{ position:"absolute", top:0, left:0, right:0, bottom:0, background:"#e0e0e0" }}>
                <Canvas camera={{ position: p.category === "STOOLS" ? [0,3,8] : p.category === "SOFAS" ? [0,3,7] : [0,2,5], fov:45 }}>
                  <ambientLight intensity={1}/>
                  <directionalLight position={[5,5,5]} intensity={1}/>
                  <directionalLight position={[-5,3,-5]} intensity={0.4}/>
                  <Suspense fallback={null}>
                    <Stage adjustCamera={false} intensity={0.5} environment="city" center={{ disable: true }}>
                      <Center>
                        {p.category === "STOOLS" ? <StoolModel/> : p.category === "SOFAS" ? <CouchModel/> : <BedModel/>}
                      </Center>
                    </Stage>
                  </Suspense>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} enableDamping={false} target={[0,0,0]}/>
                </Canvas>
              </div>
            ) : (
              <img src={p.image} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", background:C.cream }}/>
            )}
          </div>
          <div style={{ position:"relative", zIndex:10, marginTop:-40, marginBottom:16, paddingLeft:12 }}>
            <button onClick={() => setShowAR(!showAR)} style={{ background:"rgba(0,0,0,0.4)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:100, padding:"6px 14px", fontFamily:SANS, fontSize:11, fontWeight:600, color:"#fff", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, boxShadow:"0 2px 10px rgba(0,0,0,0.15)" }}>
              {showAR ? "View Photo" : "View in AR"}
            </button>
          </div>
          <div style={{ padding:"16px 22px 36px" }}>
            <p style={{ fontFamily:SANS, fontSize:10, fontWeight:700, letterSpacing:"0.1em", color:C.muted, marginBottom:3 }}>{p.category}</p>
            <p style={{ fontFamily:SANS, fontSize:12, color:C.muted, marginBottom:4 }}>{p.brand}</p>
            <h2 style={{ fontFamily:SERIF, fontSize:22, fontWeight:700, color:C.fg, lineHeight:1.2, marginBottom:4 }}>{p.name}</h2>
            <p style={{ fontFamily:SANS, fontSize:14, color:C.muted, marginBottom:10 }}>{p.size}</p>
            <p style={{ fontFamily:SANS, fontSize:26, fontWeight:700, color:C.fg, marginBottom:22 }}>${p.price.toLocaleString()}</p>
            <button style={{ width:"100%", padding:"14px", border:`1.5px solid ${C.fg}`, background:C.white, borderRadius:14, fontFamily:SANS, fontSize:15, color:C.fg, cursor:"pointer", marginBottom:10, fontWeight:500 }}>View in Room</button>
            <button onClick={() => { addToCart(p); back(); }} style={{ width:"100%", padding:"14px", background:C.fg, color:"#fff", border:"none", borderRadius:14, fontFamily:SANS, fontSize:15, fontWeight:700, cursor:"pointer" }}>Add to Cart</button>
            <h3 style={{ fontFamily:SERIF, fontSize:16, fontWeight:600, color:C.fg, marginTop:26, marginBottom:14 }}>More like this</h3>
            <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:4, scrollbarWidth:"none" }}>
              {(ROOM_PRODUCTS[selectedRoom.id] ?? ROOM_PRODUCTS.master).filter(q => q.id !== p.id).map(q => (
                <div key={q.id} onClick={() => setProduct(q)} style={{ flexShrink:0, width:105, cursor:"pointer" }}>
                  <div style={{ borderRadius:12, overflow:"hidden", height:78, background:C.cream }}>
                    <img src={q.image} alt={q.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                  </div>
                  <p style={{ fontFamily:SANS, fontSize:10, color:C.muted, marginTop:5, marginBottom:1 }}>{q.brand}</p>
                  <p style={{ fontFamily:SANS, fontSize:11, color:C.fg, lineHeight:1.3, marginBottom:2 }}>{q.name}</p>
                  <p style={{ fontFamily:SANS, fontSize:12, fontWeight:700, color:C.fg }}>${q.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── CART ── */
  function Cart() {
    const total = cart.reduce((s, i) => s + i.price, 0);
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100%", background:C.bg }}>
        <StatusBar/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 14px", flexShrink:0 }}>
          <button onClick={back} style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:0 }}><IcoBack/></button>
          <span style={{ fontFamily:SANS, fontSize:17, fontWeight:700, color:C.fg }}>Cart ({n})</span>
          <div style={{ width:24 }}/>
        </div>
        {n === 0 ? (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:"0 24px" }}>
            <p style={{ fontFamily:SANS, fontSize:15, color:C.muted }}>Your cart is empty</p>
            <button onClick={back} style={{ width:"100%", padding:"16px", background:C.fg, color:"#fff", border:"none", borderRadius:16, fontFamily:SANS, fontSize:16, fontWeight:700, cursor:"pointer" }}>Browse Products</button>
          </div>
        ) : (
          <>
            <div style={{ flex:1, overflowY:"auto", padding:"4px 16px 12px" }}>
              {cart.map(item => (
                <div key={item.uid} style={{ display:"flex", alignItems:"center", gap:12, background:C.white, borderRadius:18, padding:"12px 14px", marginBottom:10, border:`1px solid ${C.border}`, boxShadow:"0 1px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ width:68, height:58, borderRadius:12, overflow:"hidden", flexShrink:0, background:C.cream }}>
                    <img src={item.image} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontFamily:SANS, fontSize:10, color:C.muted, marginBottom:1 }}>{item.brand}</p>
                    <p style={{ fontFamily:SANS, fontSize:13, fontWeight:600, color:C.fg, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</p>
                    <p style={{ fontFamily:SANS, fontSize:11, color:C.muted, marginBottom:3 }}>{item.size}</p>
                    <p style={{ fontFamily:SANS, fontSize:14, fontWeight:700, color:C.fg }}>${item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.uid)} style={{ width:34, height:34, borderRadius:"50%", background:C.cream, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 4h11M6 4V3a1 1 0 012 0v1M4 4l.5 8a1 1 0 001 1h4a1 1 0 001-1L11 4" stroke={C.muted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              ))}
            </div>
            <div style={{ padding:"14px 20px 28px", borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <span style={{ fontFamily:SANS, fontSize:15, color:C.muted }}>Total</span>
                <span style={{ fontFamily:SANS, fontSize:18, fontWeight:700, color:C.fg }}>${total.toLocaleString()}</span>
              </div>
              <button style={{ width:"100%", padding:"16px", background:C.fg, color:"#fff", border:"none", borderRadius:16, fontFamily:SANS, fontSize:16, fontWeight:700, cursor:"pointer" }}>Pay</button>
            </div>
          </>
        )}
      </div>
    );
  }

  const SCALE = 0.62;
  const PW = 450, PH = 920;

  return (
    <div className="stylo-proto-wrap" style={{ display:"flex", justifyContent:"center", alignItems:"flex-start", gap:20, padding:"0 0 16px", fontFamily:SANS }}>
      <style>{`
        @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.15);opacity:1} }
        @keyframes sspin { to { transform: rotate(360deg); } }
        .ar-canvas-wrap div, .ar-canvas-wrap canvas { width:100%!important; height:100%!important; }
      `}</style>
      {/* Left label */}
      <div className="stylo-proto-label" style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:6, paddingTop: PH*SCALE*0.4, flexShrink:0, maxWidth:100 }}>
        <span style={{ fontFamily:SANS, fontSize:10, color:"#999", fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase" }}>Interactive prototype</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation:"cursor-float 2s ease-in-out infinite" }}>
          <style>{`@keyframes cursor-float { 0%,100%{transform:translate(0,0)} 30%{transform:translate(4px,-4px)} 60%{transform:translate(2px,3px)} }`}</style>
          <path d="M4 2v13l3.5-3.5H14L4 2z" fill="#bbb" stroke="#999" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily:SANS, fontSize:10, color:"#bbb", fontWeight:400, lineHeight:1.6 }}>Designed in Figma,<br/>prototyped with Claude</span>
      </div>

      {/* Phone */}
      <div style={{ width:PW*SCALE, height:PH*SCALE, flexShrink:0, overflow:"hidden" }}>
        <div style={{ position:"relative", width:PW, height:PH, transformOrigin:"top left", transform:`scale(${SCALE})` }}>
          <div style={{ position:"absolute", top:16, left:20, width:410, height:884, borderRadius:44, overflow:"hidden", background:C.bg, display:"flex", flexDirection:"column" }}>
            {screen==="splash"  && <Splash/>}
            {screen==="home"    && <Home/>}
            {screen==="room"    && <Room/>}
            {screen==="product" && <ProductDetail/>}
            {screen==="cart"    && <Cart/>}
            {showMedia && (
              <div style={{ position:"absolute", inset:0, zIndex:20 }}>
                <Media/>
              </div>
            )}
            {showCamera && <Camera/>}
            {showGallery && <Gallery/>}
          </div>
          <img src="/stylo/iphone.svg" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:10, display:"block" }}/>
        </div>
      </div>
    </div>
  );
}
