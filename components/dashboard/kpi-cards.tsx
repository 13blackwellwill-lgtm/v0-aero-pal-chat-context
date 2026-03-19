"use client"

import { cn } from "@/lib/utils"
import {
  Plane,
  PlaneTakeoff,
  Users,
  ClipboardList,
  Activity,
} from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
  }
  status?: "default" | "success" | "warning" | "critical"
}

// Compact inner card for the consolidated operations overview - matches reference design exactly
function CompactKpiCard({ title, value, subtitle, icon: Icon, trend, status = "default" }: KpiCardProps) {
  const statusColors = {
    default: "text-neutral-300",
    success: "text-emerald-400",
    warning: "text-amber-400",
    critical: "text-rose-400",
  }

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-white/[0.015] p-7 ring-1 ring-white/[0.04] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.02] hover:ring-white/[0.08] hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.5)] min-h-[200px]">
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Inset shadow highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />

      {/* Header section */}
      <div className="relative z-10 mb-6">
        <h3 className="mb-1.5 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">{title}</h3>
        {subtitle && (
          <p className="text-sm leading-relaxed text-neutral-400">{subtitle}</p>
        )}
      </div>

      {/* Center visualization area with icon */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Decorative crosshair lines */}
          <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Decorative dots */}
          <div className="absolute left-[20%] top-[20%] size-1.5 rounded-full bg-white/20 ring-1 ring-white/10" />
          <div className="absolute bottom-[30%] right-[15%] size-2 rounded-full bg-white/10 ring-1 ring-white/5" />
          <div className="absolute right-[25%] top-[35%] size-1 rounded-full bg-white/30" />

          {/* Central icon container */}
          <div
            className={cn(
              "z-10 flex size-12 items-center justify-center rounded-full bg-[#0a0a0a] ring-1 ring-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-110",
              statusColors[status]
            )}
          >
            <Icon className="size-5" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Value display at bottom */}
      <div className="relative z-10 mt-6 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight text-white">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.direction === "up" && "text-emerald-400",
              trend.direction === "down" && "text-rose-400",
              trend.direction === "neutral" && "text-neutral-500"
            )}
          >
            {trend.value}
          </span>
        )}
      </div>
    </div>
  )
}

// Alert card for critical metrics (AOG, Defects)
function AlertKpiCard({ title, value, subtitle, icon: Icon, trend, status = "default" }: KpiCardProps) {
  const statusColors = {
    default: "text-neutral-400",
    success: "text-emerald-400",
    warning: "text-amber-400",
    critical: "text-rose-400",
  }

  const statusGlow = {
    default: "",
    success: "shadow-[0_0_20px_-5px_rgba(52,211,153,0.3)]",
    warning: "shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)]",
    critical: "shadow-[0_0_20px_-5px_rgba(251,113,133,0.4)]",
  }

  const statusRing = {
    default: "ring-white/[0.05]",
    success: "ring-emerald-500/20",
    warning: "ring-amber-500/20",
    critical: "ring-rose-500/25",
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.018] p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.028] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_16px_40px_-12px_rgba(0,0,0,0.7)]",
        "ring-1",
        statusRing[status],
        statusGlow[status]
      )}
    >
      {/* Inner border highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]" />
      
      {/* Outer depth shadow */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[0_6px_20px_-6px_rgba(0,0,0,0.4)]" />

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="mb-5 flex items-start justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 leading-tight">
            {title}
          </p>
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-500 group-hover:scale-110",
              statusColors[status]
            )}
          >
            <Icon className="size-4.5" strokeWidth={1.5} />
          </div>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight text-white leading-none">
            {value}
          </span>
          {trend && (
            <span
              className={cn(
                "text-xs font-semibold",
                trend.direction === "up" && "text-emerald-400/90",
                trend.direction === "down" && "text-rose-400/90",
                trend.direction === "neutral" && "text-neutral-400"
              )}
            >
              {trend.value}
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-2.5 text-sm leading-relaxed text-neutral-500/90">{subtitle}</p>
        )}
      </div>

      {/* Decorative background icon */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 opacity-[0.02]">
        <Icon className="size-full" strokeWidth={0.5} />
      </div>
    </div>
  )
}

// Operations overview data (first 4 metrics)
const operationsData: KpiCardProps[] = [
  {
    title: "Total Aircraft",
    value: 47,
    subtitle: "Fleet size",
    icon: Plane,
    status: "default",
  },
  {
    title: "In Flight",
    value: 23,
    subtitle: "Currently airborne",
    icon: PlaneTakeoff,
    trend: { value: "+2", direction: "up" },
    status: "success",
  },
  {
    title: "Available Engineers",
    value: 18,
    subtitle: "On shift now",
    icon: Users,
    trend: { value: "of 24", direction: "neutral" },
    status: "default",
  },
  {
    title: "Active Tasks",
    value: 34,
    subtitle: "In progress",
    icon: ClipboardList,
    trend: { value: "-3", direction: "down" },
    status: "default",
  },
]

export function KpiCards() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/[0.015] ring-1 ring-white/[0.05]">
      {/* Multi-layer depth */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]" />
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 border-b border-white/[0.04] px-6 py-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20">
          <Activity className="size-4 text-sky-400" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/90">Operations Overview</h3>
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">Live metrics</p>
        </div>
      </div>
      
      {/* Inner 4-card grid */}
      <div className="relative z-10 grid grid-cols-2 gap-4 p-5 lg:grid-cols-4">
        {operationsData.map((kpi) => (
          <CompactKpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
    </div>
  )
}
