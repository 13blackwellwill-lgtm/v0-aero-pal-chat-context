"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  Clock,
  ChevronRight,
  Bell,
} from "lucide-react"

type AlertSeverity = "critical" | "warning" | "info"

interface Alert {
  id: string
  severity: AlertSeverity
  title: string
  description: string
  timestamp: string
  aircraft?: string
  acknowledged: boolean
}

const severityConfig: Record<
  AlertSeverity,
  { icon: React.ElementType; className: string; bgClassName: string; ringClassName: string }
> = {
  critical: {
    icon: AlertOctagon,
    className: "text-rose-400",
    bgClassName: "bg-rose-500/[0.08]",
    ringClassName: "ring-rose-500/20",
  },
  warning: {
    icon: AlertTriangle,
    className: "text-amber-400",
    bgClassName: "bg-amber-500/[0.08]",
    ringClassName: "ring-amber-500/20",
  },
  info: {
    icon: Info,
    className: "text-sky-400",
    bgClassName: "bg-sky-500/[0.08]",
    ringClassName: "ring-sky-500/20",
  },
}

const alerts: Alert[] = [
  {
    id: "1",
    severity: "critical",
    title: "AOG - G-CIVW",
    description: "Hydraulic system fault. Aircraft grounded at E05. ETA for parts: 14:00.",
    timestamp: "2 min ago",
    aircraft: "G-CIVW",
    acknowledged: false,
  },
  {
    id: "2",
    severity: "critical",
    title: "MEL Item Expiring",
    description: "CAT A item on G-ZBKF expires in 4 hours. Action required.",
    timestamp: "15 min ago",
    aircraft: "G-ZBKF",
    acknowledged: false,
  },
  {
    id: "3",
    severity: "warning",
    title: "Delay - BA2158",
    description: "30 min delay due to maintenance. Engineer R. Patel assigned.",
    timestamp: "25 min ago",
    aircraft: "G-EUYH",
    acknowledged: true,
  },
  {
    id: "4",
    severity: "warning",
    title: "Parts Shortage",
    description: "Low stock on brake assemblies. 3 units remaining.",
    timestamp: "1 hour ago",
    acknowledged: true,
  },
  {
    id: "5",
    severity: "info",
    title: "Shift Handover",
    description: "Night shift handover complete. 6 engineers on duty.",
    timestamp: "2 hours ago",
    acknowledged: true,
  },
  {
    id: "6",
    severity: "info",
    title: "Scheduled Maintenance",
    description: "G-TTNA A-Check scheduled for 22:00 today.",
    timestamp: "3 hours ago",
    aircraft: "G-TTNA",
    acknowledged: true,
  },
]

function AlertItem({ alert }: { alert: Alert }) {
  const config = severityConfig[alert.severity]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "group relative flex gap-3 rounded-xl p-3.5 ring-1 transition-all duration-300",
        alert.acknowledged
          ? "bg-white/[0.015] ring-white/[0.04] hover:bg-white/[0.03]"
          : cn(config.bgClassName, config.ringClassName)
      )}
    >
      {/* Inset highlight for unacknowledged */}
      {!alert.acknowledged && (
        <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />
      )}

      <div
        className={cn(
          "relative z-10 mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] ring-1 ring-white/[0.06]",
          config.className,
          !alert.acknowledged && "animate-pulse"
        )}
      >
        <Icon className="size-3.5" strokeWidth={1.5} />
      </div>
      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4
            className={cn(
              "text-sm font-medium leading-tight",
              alert.acknowledged ? "text-neutral-200" : config.className
            )}
          >
            {alert.title}
          </h4>
          <div className="flex shrink-0 items-center gap-1 text-[10px] text-neutral-500">
            <Clock className="size-3" strokeWidth={1.5} />
            {alert.timestamp}
          </div>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
          {alert.description}
        </p>
        {!alert.acknowledged && alert.severity === "critical" && (
          <Button
            size="sm"
            variant="outline"
            className="mt-3 h-7 rounded-lg border-rose-500/20 bg-rose-500/10 text-[10px] font-medium uppercase tracking-wider text-rose-400 hover:bg-rose-500/20 hover:text-rose-300"
          >
            Acknowledge
          </Button>
        )}
      </div>
    </div>
  )
}

export function AlertsPanel() {
  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/[0.015] ring-1 ring-white/[0.04] transition-all duration-500 ease-out hover:bg-white/[0.02] hover:ring-white/[0.08]">
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.04] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.03] ring-1 ring-white/[0.06]">
            <Bell className="size-4 text-neutral-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              Alerts
            </h2>
            {unacknowledgedCount > 0 && (
              <p className="text-xs text-rose-400">
                {unacknowledgedCount} require attention
              </p>
            )}
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 rounded-lg text-[10px] uppercase tracking-wider text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-300"
        >
          View All
          <ChevronRight className="ml-1 size-3" strokeWidth={1.5} />
        </Button>
      </div>

      {/* Alerts list */}
      <div className="relative z-10 flex-1 space-y-2 overflow-y-auto p-4">
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  )
}
