import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export type PerformanceMetrics = {
  fps: number
  frameTime: number
  samples: number[]
  avgFps: number
  minFps: number
  maxFps: number
  longFrames: number
  droppedPercent: number
  memory?: { usedMB: number; totalMB: number }
  cores?: number
  dpr: number
}

export function PerformancePanel({ metrics }: { metrics: PerformanceMetrics }) {
  const bars = metrics.samples.slice(-80)
  const maxBar = 120 // target max fps for normalization

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-xs">FPS</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{Math.round(metrics.fps)}</span>
              <Badge variant="outline">avg {Math.round(metrics.avgFps)}</Badge>
            </div>
            <div className="flex items-end gap-0.5 h-16 mt-3">
              {bars.map((v, i) => {
                const h = Math.max(2, Math.min(64, (v / maxBar) * 64))
                const slow = 1000 / v > 16.7
                return (
                  <div
                    key={i}
                    className={
                      "w-1 rounded-sm " + (slow ? "bg-destructive/70" : "bg-primary/70")
                    }
                    style={{ height: h }}
                    title={`${v.toFixed(0)} fps`}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-xs">Frame Time</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{metrics.frameTime.toFixed(1)}ms</span>
              <Badge variant="outline">long {metrics.longFrames}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Dropped frames: {metrics.droppedPercent}% • DPR: {metrics.dpr}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-xs">System</CardTitle>
          </CardHeader>
          <CardContent className="py-3 space-y-2">
            <div className="text-sm">Cores: {metrics.cores ?? "—"}</div>
            <div className="text-sm">
              Memory: {metrics.memory ? `${metrics.memory.usedMB}/${metrics.memory.totalMB} MB` : "—"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-xs">Diagnostics</CardTitle>
          </CardHeader>
          <CardContent className="py-3 text-xs text-muted-foreground space-y-1">
            <p>
              If FPS is below 30 and frame times exceed 33ms, reduce particle counts or disable post-processing.
            </p>
            <p>
              Spikes above 50ms indicate GC or heavy CPU work on the main thread.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
