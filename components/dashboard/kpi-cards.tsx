"use client"

import { cn } from "@/lib/utils"
import {
  Plane,
  PlaneTakeoff,
  Users,
  ClipboardList,
  AlertOctagon,
  AlertCircle,
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

// Compact inner card for the consolidated operations overview
function CompactKpiCard({ title, value, subtitle, icon: Icon, trend, status = "default" }: KpiCardProps) {
  const statusColors = {
    default: "text-neutral-400",
    success: "text-emerald-400",
    warning: "text-amber-400",
    critical: "text-rose-400",
  }

  return (
    <div className="group relative flex flex-col rounded-xl bg-white/[0.02] p-5 ring-1 ring-white/[0.04] transition-all duration-300 hover:bg-white/[0.04] hover:ring-white/[0.08]">
      {/* Inner highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />
      
      <div className="relative z-10">
        {/* Icon and title row */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] transition-all duration-300 group-hover:bg-white/[0.06]",
              statusColors[status]
            )}
          >
            <Icon className="size-4" strokeWidth={1.5} />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 leading-tight">
            {title}
          </p>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-white leading-none">
            {value}
          </span>
          {trend && (
            <span
              className={cn(
                "text-[11px] font-semibold",
                trend.direction === "up" && "text-emerald-400/90",
                trend.direction === "down" && "text-rose-400/90",
                trend.direction === "neutral" && "text-neutral-500"
              )}
            >
              {trend.value}
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-2 text-xs leading-relaxed text-neutral-500">{subtitle}</p>
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

// Alert data (AOG and Defects)
const alertData: KpiCardProps[] = [
  {
    title: "Active AOG",
    value: 2,
    subtitle: "Aircraft on ground",
    icon: AlertOctagon,
    status: "critical",
  },
  {
    title: "Open Defects",
    value: 12,
    subtitle: "Pending resolution",
    icon: AlertCircle,
    trend: { value: "+1", direction: "up" },
    status: "warning",
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Consolidated Operations Overview Card */}
      <div className="relative col-span-1 overflow-hidden rounded-2xl bg-white/[0.015] ring-1 ring-white/[0.05] lg:col-span-2">
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
        <div className="relative z-10 grid grid-cols-2 gap-3 p-4 lg:grid-cols-4">
          {operationsData.map((kpi) => (
            <CompactKpiCard key={kpi.title} {...kpi} />
          ))}
        </div>
      </div>

      {/* Alert Cards (AOG & Defects) */}
      <div className="col-span-1 grid grid-cols-2 gap-4 lg:grid-cols-1">
        {alertData.map((kpi) => (
          <AlertKpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
    </div>
  )
}
