"use client";

import { useEffect, useRef } from "react";

/* A silent, looping clip that plays on its own while it's on screen and pauses
   when scrolled away, so a page of clips only decodes the ones in view. iOS only
   autoplays a video that is muted at the DOM-property level, so set that
   directly; if playback is refused anyway (Low Power Mode) the poster frame stays. */
export default function AutoVideo({
  src, poster, label, className = "block w-full h-auto rounded-2xl", style = { aspectRatio: "16 / 9", background: "#fff" },
}: {
  src: string; poster?: string; label?: string; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { rootMargin: "100px" });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      className={className}
      style={style}
    />
  );
}
