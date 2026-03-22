"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Clock, TriangleAlert as AlertTriangle, OctagonAlert as AlertOctagon, ChevronRight, CalendarCheck } from "lucide-react"

type UrgencyLevel = "critical" | "high" | "medium" | "low"

interface MaintenanceTask {
  id: string
  aircraft: string
  registration: string
  taskType: string
  dueTime: string
  dueBlock: string
  station: string
  urgency: UrgencyLevel
  assignedEngineer?: string
  estimatedDuration: string
}

const urgencyConfig: Record<UrgencyLevel, { className: string; bgClassName: string; icon: React.ElementType }> = {
  critical: { className: "text-rose-400", bgClassName: "bg-rose-500/10", icon: AlertOctagon },
  high: { className: "text-amber-400", bgClassName: "bg-amber-500/10", icon: AlertTriangle },
  medium: { className: "text-sky-400", bgClassName: "bg-sky-500/10", icon: Clock },
  low: { className: "text-emerald-400", bgClassName: "bg-emerald-500/10", icon: CalendarCheck },
}

const tasks: MaintenanceTask[] = [
  {
    id: "1",
    aircraft: "A320",
    registration: "G-CIVW",
    taskType: "Unscheduled - Hydraulic System",
    dueTime: "ASAP",
    dueBlock: "Immediate",
    station: "LHR T5",
    urgency: "critical",
    assignedEngineer: "K. Okonkwo",
    estimatedDuration: "4h",
  },
  {
    id: "2",
    aircraft: "B777-200",
    registration: "G-ZBKF",
    taskType: "MEL Item - CAT A Expiry",
    dueTime: "14:00",
    dueBlock: "Next 4h",
    station: "LHR T5",
    urgency: "critical",
    assignedEngineer: "J. Williams",
    estimatedDuration: "2.5h",
  },
  {
    id: "3",
    aircraft: "A321neo",
    registration: "G-TTNA",
    taskType: "A-Check Scheduled",
    dueTime: "22:00",
    dueBlock: "Tonight",
    station: "LHR T5",
    urgency: "high",
    assignedEngineer: "M. Chen",
    estimatedDuration: "6h",
  },
  {
    id: "4",
    aircraft: "B787-9",
    registration: "G-ZBKH",
    taskType: "Turnaround Check",
    dueTime: "14:45",
    dueBlock: "Next 4.5h",
    station: "LHR T5",
    urgency: "high",
    assignedEngineer: "T. Mitchell",
    estimatedDuration: "1.5h",
  },
  {
    id: "5",
    aircraft: "A320",
    registration: "G-EUYH",
    taskType: "Component Replacement",
    dueTime: "16:30",
    dueBlock: "Next 6.5h",
    station: "LHR T5",
    urgency: "medium",
    assignedEngineer: "R. Patel",
    estimatedDuration: "3h",
  },
]

function TaskCard({ task }: { task: MaintenanceTask }) {
  const config = urgencyConfig[task.urgency]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "group relative flex gap-3 rounded-xl p-3.5 ring-1 transition-all duration-300 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.3)]",
        config.bgClassName,
        task.urgency === "critical" && "ring-rose-500/20 hover:ring-rose-500/30 bg-rose-500/[0.08]",
        task.urgency === "high" && "ring-amber-500/20 hover:ring-amber-500/30 bg-amber-500/[0.08]",
        task.urgency === "medium" && "ring-sky-500/15 hover:ring-sky-500/25 bg-sky-500/[0.06]",
        task.urgency === "low" && "ring-emerald-500/15 hover:ring-emerald-500/25 bg-emerald-500/[0.06]"
      )}
    >
      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />

      {/* Icon */}
      <div
        className={cn(
          "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-white/[0.1] transition-transform duration-300 group-hover:scale-105",
          config.className
        )}
      >
        <Icon className="size-3.5" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-mono text-xs font-semibold text-white">
                {task.registration}
              </span>
              <span className="text-[10px] text-neutral-500">{task.aircraft}</span>
            </div>
            <h4 className="text-xs font-medium text-neutral-300 truncate leading-tight">
              {task.taskType}
            </h4>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-[10px]">
            <Clock className="size-3 text-neutral-500" strokeWidth={1.5} />
            <span className={cn("font-medium", config.className)}>
              {task.dueTime}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-[10px]">
          <div className="flex items-center gap-2 text-neutral-500">
            <span>{task.station}</span>
            <span className="text-neutral-600">•</span>
            <span>{task.estimatedDuration}</span>
          </div>
          {task.assignedEngineer && (
            <span className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-neutral-400 ring-1 ring-white/[0.08]">
              {task.assignedEngineer}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function UpcomingMaintenance() {
  const criticalCount = tasks.filter((t) => t.urgency === "critical").length
  const highCount = tasks.filter((t) => t.urgency === "high").length

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
            <CalendarCheck className="size-4 text-neutral-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              Upcoming Maintenance
            </h2>
            {criticalCount > 0 && (
              <p className="text-xs text-rose-400">
                {criticalCount} critical, {highCount} high priority
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

      {/* Tasks list */}
      <div className="relative z-10 flex-1 space-y-2 overflow-y-auto p-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
