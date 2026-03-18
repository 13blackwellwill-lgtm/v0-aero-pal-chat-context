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
    default: "text-info",
    success: "text-success",
    warning: "text-warning",
    critical: "text-critical",
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-colors hover:border-border/80">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-card-foreground">
              {value}
            </span>
            {trend && (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.direction === "up" && "text-success",
                  trend.direction === "down" && "text-critical",
                  trend.direction === "neutral" && "text-muted-foreground"
                )}
              >
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-lg bg-secondary/50",
            statusColors[status]
          )}
        >
          <Icon className="size-5" />
        </div>
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
