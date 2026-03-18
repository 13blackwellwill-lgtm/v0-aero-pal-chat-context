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
  { icon: React.ElementType; className: string; bgClassName: string }
> = {
  critical: {
    icon: AlertOctagon,
    className: "text-critical",
    bgClassName: "bg-critical/10 border-critical/20",
  },
  warning: {
    icon: AlertTriangle,
    className: "text-warning",
    bgClassName: "bg-warning/10 border-warning/20",
  },
  info: {
    icon: Info,
    className: "text-info",
    bgClassName: "bg-info/10 border-info/20",
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
        "group relative flex gap-3 rounded-lg border p-3 transition-colors",
        alert.acknowledged
          ? "border-border bg-card hover:bg-secondary/30"
          : config.bgClassName
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md",
          config.className,
          !alert.acknowledged && "animate-pulse"
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4
            className={cn(
              "text-sm font-medium leading-tight",
              alert.acknowledged ? "text-card-foreground" : config.className
            )}
          >
            {alert.title}
          </h4>
          <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {alert.timestamp}
          </div>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {alert.description}
        </p>
        {!alert.acknowledged && alert.severity === "critical" && (
          <Button
            size="sm"
            variant="outline"
            className="mt-2 h-7 border-critical/30 text-xs text-critical hover:bg-critical/10 hover:text-critical"
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
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-card-foreground">Alerts</h2>
          {unacknowledgedCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-critical text-xs font-medium text-critical-foreground">
              {unacknowledgedCount}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
          View All
          <ChevronRight className="ml-1 size-3" />
        </Button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  )
}
