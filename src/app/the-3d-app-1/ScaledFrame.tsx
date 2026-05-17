'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  width: number
  height: number
  /** Multiplier applied on top of the fit-scale (1 = fill, 0.9 = 10% smaller). */
  scaleMultiplier?: number
  background?: string
  children: ReactNode
}

export default function ScaledFrame({ width, height, scaleMultiplier = 1, background, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const h = el.clientHeight
      if (h > 0) setScale((h / height) * scaleMultiplier)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width, height, scaleMultiplier])

  return (
    <div
      ref={ref}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', background }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: `${width}px`,
          height: `${height}px`,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: '50% 100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}
