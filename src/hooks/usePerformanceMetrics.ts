import { useEffect, useRef, useState } from "react"

type MemoryInfo = {
  usedMB: number
  totalMB: number
}

type Metrics = {
  fps: number
  frameTime: number
  samples: number[]
  avgFps: number
  minFps: number
  maxFps: number
  longFrames: number
  droppedPercent: number
  memory?: MemoryInfo
  cores?: number
  dpr: number
}

export function usePerformanceMetrics({ isActive = true }: { isActive?: boolean }) {
  const [metrics, setMetrics] = useState<Metrics>({
    fps: 0,
    frameTime: 0,
    samples: [],
    avgFps: 0,
    minFps: Infinity,
    maxFps: 0,
    longFrames: 0,
    droppedPercent: 0,
    memory: undefined,
    cores: navigator?.hardwareConcurrency,
    dpr: typeof window !== "undefined" ? window.devicePixelRatio : 1,
  })

  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const samplesRef = useRef<number[]>([])

  useEffect(() => {
    let mounted = true

    const updateMemory = () => {
      const perf: any = (window as any).performance
      if (perf && perf.memory) {
        const usedMB = perf.memory.usedJSHeapSize / (1024 * 1024)
        const totalMB = perf.memory.totalJSHeapSize / (1024 * 1024)
        return { usedMB: Math.round(usedMB * 10) / 10, totalMB: Math.round(totalMB * 10) / 10 }
      }
      return undefined
    }

    const tick = (now: number) => {
      if (!mounted) return

      if (lastTimeRef.current == null) {
        lastTimeRef.current = now
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const delta = now - lastTimeRef.current
      lastTimeRef.current = now

      const fps = 1000 / (delta || 1)
      const samples = samplesRef.current
      const MAX = 120
      samples.push(fps)
      if (samples.length > MAX) samples.shift()

      const avgFps = samples.reduce((a, b) => a + b, 0) / samples.length
      const minFps = Math.min(...samples)
      const maxFps = Math.max(...samples)
      const longFrames = samples.filter((s) => 1000 / s > 50).length
      const droppedPercent = Math.round((samples.filter((s) => 1000 / s > 16.7).length / samples.length) * 100)

      setMetrics((prev) => ({
        ...prev,
        fps,
        frameTime: delta,
        samples: [...samples],
        avgFps,
        minFps,
        maxFps,
        longFrames,
        droppedPercent,
        memory: updateMemory(),
        dpr: window.devicePixelRatio,
      }))

      rafRef.current = requestAnimationFrame(tick)
    }

    if (isActive) {
      rafRef.current = requestAnimationFrame(tick)
    }

    return () => {
      mounted = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastTimeRef.current = null
    }
  }, [isActive])

  return metrics
}
