"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Users,
  ChevronRight,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react"

interface EngineerMetric {
  label: string
  value: string | number
  trend?: string
  trendDirection?: "up" | "down" | "neutral"
}

interface AircraftQualification {
  aircraft: string
  available: number
  onShift: number
}

const metrics: EngineerMetric[] = [
  {
    label: "On Shift",
    value: "18 / 24",
    trend: "+3 next 2h",
    trendDirection: "up",
  },
  {
    label: "Utilisation",
    value: "75%",
    trend: "-5% vs avg",
    trendDirection: "down",
  },
  {
    label: "Avg Response",
    value: "12m",
    trend: "-2m today",
    trendDirection: "down",
  },
  {
    label: "Tasks Active",
    value: "24",
    trend: "+3 pending",
    trendDirection: "up",
  },
]

const qualifications: AircraftQualification[] = [
  { aircraft: "A320 / A321", available: 14, onShift: 9 },
  { aircraft: "B777 / B787", available: 7, onShift: 5 },
  { aircraft: "A350", available: 3, onShift: 2 },
  { aircraft: "Embraer", available: 8, onShift: 2 },
]

export function EngineerOperations() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white/[0.015] ring-1 ring-white/[0.04] transition-all duration-500 ease-out hover:bg-white/[0.02] hover:ring-white/[0.08]">
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.04] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.03] ring-1 ring-white/[0.06]">
            <Users className="size-4 text-neutral-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              Engineer Operations
            </h2>
            <p className="text-xs text-neutral-500/80">Resource & utilisation</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 rounded-lg text-[10px] uppercase tracking-wider text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-300"
        >
          View Team
          <ChevronRight className="ml-1 size-3" strokeWidth={1.5} />
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3 p-5 border-b border-white/[0.04]">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-white/[0.02] p-3 ring-1 ring-white/[0.04] transition-all duration-300 hover:bg-white/[0.03] hover:ring-white/[0.06]"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500 mb-2">
                {metric.label}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white leading-none">
                  {metric.value}
                </span>
                {metric.trend && (
                  <span
                    className={cn(
                      "text-xs font-medium",
                      metric.trendDirection === "up" && "text-emerald-400",
                      metric.trendDirection === "down" && "text-emerald-400",
                      metric.trendDirection === "neutral" && "text-neutral-500"
                    )}
                  >
                    {metric.trend}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Aircraft qualifications */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="size-3.5 text-amber-400" strokeWidth={1.5} />
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-500">
                Qualifications
              </p>
            </div>

            {qualifications.map((qual, idx) => {
              const utilisation = Math.round((qual.onShift / qual.available) * 100)

              return (
                <div key={idx} className="rounded-lg bg-white/[0.02] p-3 ring-1 ring-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-neutral-300">
                      {qual.aircraft}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      {qual.onShift} / {qual.available}
                    </span>
                  </div>

                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        utilisation > 75
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                          : utilisation > 50
                          ? "bg-gradient-to-r from-sky-500 to-sky-400"
                          : "bg-gradient-to-r from-neutral-600 to-neutral-500"
                      )}
                      style={{ width: `${utilisation}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
