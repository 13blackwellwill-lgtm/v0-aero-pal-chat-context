"use client"

import { cn } from "@/lib/utils"
import {
  Plane,
  Users,
  AlertOctagon,
  AlertCircle,
  Wrench,
  Clock,
  CheckCircle2,
  TrendingUp,
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

// Compact KPI card for the grid
function KpiCard({ title, value, subtitle, icon: Icon, trend, status = "default" }: KpiCardProps) {
  const statusColors = {
    default: "text-neutral-400",
    success: "text-emerald-400",
    warning: "text-amber-400",
    critical: "text-rose-400",
  }

  const statusGlow = {
    default: "",
    success: "",
    warning: "shadow-[0_0_20px_-8px_rgba(251,191,36,0.25)]",
    critical: "shadow-[0_0_20px_-8px_rgba(251,113,133,0.35)]",
  }

  const statusRing = {
    default: "ring-white/[0.05]",
    success: "ring-emerald-500/15",
    warning: "ring-amber-500/20",
    critical: "ring-rose-500/25",
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.015] p-5 ring-1 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.025] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]",
        statusRing[status],
        statusGlow[status]
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />

      {/* Header with icon */}
      <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-xs text-neutral-500/80 leading-snug">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] transition-all duration-500 group-hover:scale-105 group-hover:bg-white/[0.06]",
            statusColors[status]
          )}
        >
          <Icon className="size-4" strokeWidth={1.6} />
        </div>
      </div>

      {/* Value */}
      <div className="relative z-10 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-white leading-none">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.direction === "up" && status === "critical" && "text-rose-400/80",
              trend.direction === "up" && status !== "critical" && "text-emerald-400/80",
              trend.direction === "down" && "text-emerald-400/80",
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

// Critical metric card with larger emphasis
function CriticalKpiCard({ title, value, subtitle, icon: Icon, trend, status = "critical" }: KpiCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.015] p-6 ring-1 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.025]",
        status === "critical" 
          ? "ring-rose-500/25 shadow-[0_0_24px_-8px_rgba(251,113,133,0.3)] hover:ring-rose-500/35" 
          : "ring-amber-500/20 shadow-[0_0_24px_-8px_rgba(251,191,36,0.25)] hover:ring-amber-500/30"
      )}
    >
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-3 mb-5">
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1.5 text-xs text-neutral-500/80 leading-snug">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.1] transition-all duration-500 group-hover:scale-110",
            status === "critical" ? "text-rose-400" : "text-amber-400"
          )}
        >
          <Icon className="size-5" strokeWidth={1.6} />
        </div>
      </div>

      {/* Value */}
      <div className="relative z-10 flex items-baseline gap-3">
        <span className={cn(
          "text-4xl font-bold tracking-tight leading-none",
          status === "critical" ? "text-rose-400" : "text-amber-400"
        )}>
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.direction === "up" && "text-rose-400/70",
              trend.direction === "down" && "text-emerald-400/70",
              trend.direction === "neutral" && "text-neutral-500"
            )}
          >
            {trend.value}
          </span>
        )}
      </div>

      {/* Decorative background icon */}
      <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 opacity-[0.03]">
        <Icon className="size-full" strokeWidth={0.5} />
      </div>
    </div>
  )
}

// Engineer utilisation mini-bar
function UtilisationBar({ available, total }: { available: number; total: number }) {
  const percentage = Math.round((available / total) * 100)
  
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1.5">
        <span>Utilisation</span>
        <span className="font-medium text-neutral-400">{100 - percentage}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400 transition-all duration-500"
          style={{ width: `${100 - percentage}%` }}
        />
      </div>
    </div>
  )
}

export function KpiCards() {
  return (
    <div className="space-y-5">
      {/* Top row: Fleet Status, Engineers, Scheduled Today, Turnaround Checks, Avg Response */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
        {/* Fleet Status */}
        <KpiCard
          title="Fleet Status"
          value={47}
          subtitle="Total aircraft"
          icon={Plane}
          status="default"
        />

        {/* Engineers Available */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.015] p-5 ring-1 ring-white/[0.05] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.025] hover:ring-white/[0.08]">
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />
          
          <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 leading-tight">
                Engineers
              </h3>
              <p className="mt-1 text-xs text-neutral-500/80 leading-snug">On shift now</p>
            </div>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-sky-400 ring-1 ring-white/[0.08] transition-all duration-500 group-hover:scale-105 group-hover:bg-white/[0.06]">
              <Users className="size-4" strokeWidth={1.6} />
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-white leading-none">18</span>
              <span className="text-xs font-medium text-neutral-500">/ 24</span>
            </div>
            <UtilisationBar available={18} total={24} />
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <KpiCard
          title="Scheduled Today"
          value={15}
          subtitle="Tasks remaining"
          icon={Clock}
          status="default"
        />

        {/* Turnaround Checks */}
        <KpiCard
          title="Turnaround Checks"
          value={7}
          subtitle="In progress"
          icon={Wrench}
          trend={{ value: "-1", direction: "down" }}
          status="default"
        />

        {/* Average Response */}
        <KpiCard
          title="Avg Response"
          value="12m"
          subtitle="Task assignment"
          icon={Clock}
          status="default"
        />
      </div>

      {/* Bottom row: Colored bordered cards - Active AOG, Open Defects, In Flight, Completed Today */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <CriticalKpiCard
          title="Active AOG"
          value={2}
          subtitle="Requires immediate attention"
          icon={AlertOctagon}
          status="critical"
        />
        <CriticalKpiCard
          title="Open Defects"
          value={12}
          subtitle="Pending resolution"
          icon={AlertCircle}
          trend={{ value: "+1 today", direction: "up" }}
          status="warning"
        />

        {/* In Flight */}
        <KpiCard
          title="In Flight"
          value={23}
          subtitle="Currently airborne"
          icon={TrendingUp}
          trend={{ value: "+2", direction: "up" }}
          status="success"
        />

        {/* Tasks Completed */}
        <KpiCard
          title="Completed Today"
          value={34}
          subtitle="Tasks finished"
          icon={CheckCircle2}
          trend={{ value: "+8", direction: "up" }}
          status="success"
        />
      </div>
    </div>
  )
}
