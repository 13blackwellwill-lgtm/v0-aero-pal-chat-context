"use client"

import { cn } from "@/lib/utils"
import {
  Plane,
  PlaneTakeoff,
  Users,
  ClipboardList,
  AlertOctagon,
  AlertCircle,
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

function KpiCard({ title, value, subtitle, icon: Icon, trend, status = "default" }: KpiCardProps) {
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

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.018] p-7 ring-1 ring-white/[0.05] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-white/[0.028] hover:ring-white/[0.09] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_50px_-12px_rgba(0,0,0,0.8)]",
        status === "critical" && "ring-rose-500/25 hover:ring-rose-500/40",
        statusGlow[status]
      )}
    >
      {/* Multi-layer background depth */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Inner border highlight for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)]" />
      
      {/* Outer depth shadow */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]" />

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="mb-6 flex items-start justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 leading-tight">
            {title}
          </p>
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),0_4px_12px_-4px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:scale-115 group-hover:bg-white/[0.06] group-hover:ring-white/[0.12]",
              statusColors[status]
            )}
          >
            <Icon className="size-5" strokeWidth={1.4} />
          </div>
        </div>

        {/* Value with improved hierarchy */}
        <div className="flex items-baseline gap-2.5">
          <span className="text-5xl font-bold tracking-tight text-white leading-none">
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

        {/* Subtitle with improved readability */}
        {subtitle && (
          <p className="mt-3 text-sm leading-relaxed text-neutral-500/90">{subtitle}</p>
        )}
      </div>

      {/* Subtle decorative elements */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 opacity-[0.015]">
        <Icon className="size-full" strokeWidth={0.4} />
      </div>
    </div>
  )
}

const kpiData: KpiCardProps[] = [
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
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {kpiData.map((kpi) => (
        <KpiCard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
}
