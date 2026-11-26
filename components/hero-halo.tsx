'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

type HaloEffect = { destroy: () => void }
type HaloOptions = {
  el: HTMLDivElement
  THREE: typeof import('three')
  mouseControls: boolean
  touchControls: boolean
  gyroControls: boolean
  minHeight: number
  minWidth: number
  backgroundColor: number
  baseColor: number
  amplitudeFactor: number
  ringFactor: number
  rotationFactor: number
  size: number
  speed: number
  scale: number
  scaleMobile: number
}
type HaloFactory = (options: HaloOptions) => HaloEffect

type ThreeWindow = Window & { THREE?: typeof import('three') }

export function HeroHalo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<HaloEffect | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || !containerRef.current) return

    let cancelled = false

    async function start() {
      try {
        const THREE = await import('three')
        ;(window as ThreeWindow).THREE = THREE

        // Vanta's distributed effect bundle does not ship TypeScript declarations.
        // @ts-expect-error The package exposes this effect as a JavaScript-only bundle.
        const { default: haloModule } = await import('vanta/dist/vanta.halo.min.js')
        if (cancelled || !containerRef.current) return

        const createHalo = haloModule as HaloFactory
        effectRef.current = createHalo({
          el: containerRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          backgroundColor: 0x08090d,
          baseColor: 0x9b5de5,
          amplitudeFactor: 0.65,
          ringFactor: 0.75,
          rotationFactor: 0.45,
          size: 0.8,
          speed: 0.45,
          scale: 0.8,
          scaleMobile: 0.65,
        })
      } catch {
        // The existing CSS background remains as a fallback if WebGL is unavailable.
      }
    }

    void start()

    return () => {
      cancelled = true
      effectRef.current?.destroy()
      effectRef.current = null
    }
  }, [reduceMotion])

  return <div ref={containerRef} className="hero-halo" aria-hidden="true" />
}
