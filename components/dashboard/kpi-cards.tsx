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
        "group relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-white/[0.02] p-6 ring-1 ring-white/[0.06] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.04] hover:ring-white/[0.1] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]",
        status === "critical" && "ring-rose-500/20 hover:ring-rose-500/30",
        statusGlow[status]
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[20px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="mb-5 flex items-start justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
            {title}
          </p>
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-full bg-white/[0.03] ring-1 ring-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-110",
              statusColors[status]
            )}
          >
            <Icon className="size-[18px]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight text-white/90">
            {value}
          </span>
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

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
        )}
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 opacity-[0.03]">
        <Icon className="size-full" strokeWidth={0.5} />
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
