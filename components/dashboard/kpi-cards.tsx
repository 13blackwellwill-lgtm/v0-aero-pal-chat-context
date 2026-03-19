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
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[16px] bg-white/[0.012] p-3 ring-1 ring-white/[0.05] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.025] hover:ring-white/[0.12] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_24px_-6px_rgba(0,0,0,0.4)]">
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Multi-layer depth - inset highlight + outer shadow */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[16px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_6px_14px_-4px_rgba(0,0,0,0.35)]" />

      {/* Header section - improved readability */}
      <div className="relative z-10 mb-2.5">
        <h3 className="mb-1 text-[7.5px] font-bold uppercase tracking-[0.15em] text-neutral-400/75 leading-tight">{title}</h3>
        {subtitle && (
          <p className="text-[9.5px] leading-snug text-neutral-400/85">{subtitle}</p>
        )}
      </div>

      {/* Center visualization area with icon - optimized */}
      <div className="relative z-10 flex items-center justify-center py-2">
        <div className="relative flex h-10 w-full items-center justify-center">
          {/* Decorative crosshair lines - refined */}
          <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />

          {/* Decorative dots - subtle with depth */}
          <div className="absolute left-[20%] top-[15%] size-0.75 rounded-full bg-white/18 ring-0.5 ring-white/8 shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
          <div className="absolute bottom-[25%] right-[16%] size-1 rounded-full bg-white/10 ring-0.5 ring-white/5 shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
          <div className="absolute right-[26%] top-[30%] size-0.5 rounded-full bg-white/28 shadow-[0_0.5px_1px_rgba(0,0,0,0.1)]" />

          {/* Central icon container - enhanced with depth */}
          <div
            className={cn(
              "z-10 flex size-7 items-center justify-center rounded-full bg-[#0a0a0a] ring-1 ring-white/10 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.06),0_3px_8px_-1px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.08),0_5px_12px_-2px_rgba(0,0,0,0.3)]",
              statusColors[status]
            )}
          >
            <Icon className="size-4" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Value display - improved hierarchy */}
      <div className="relative z-10 mt-2.5 flex items-baseline gap-2">
        <span className="text-xl font-bold tracking-tight text-white leading-none">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-[7.5px] font-semibold leading-none",
              trend.direction === "up" && "text-emerald-400/95",
              trend.direction === "down" && "text-rose-400/95",
              trend.direction === "neutral" && "text-neutral-500/70"
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
