"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Wrench, ChevronRight, Clock, CircleCheck as CheckCircle2 } from "lucide-react"

type CheckStatus = "pending" | "in-progress" | "completed"

interface TurnaroundCheck {
  id: string
  flightNumber: string
  aircraft: string
  registration: string
  gate: string
  stand: string
  status: CheckStatus
  engineer: string
  arrivalTime: string
  departureTime: string
  checklistItems: number
  itemsCompleted: number
}

const statusConfig: Record<CheckStatus, { className: string; bgClassName: string; label: string }> = {
  pending: { className: "text-neutral-400", bgClassName: "bg-white/[0.04] ring-white/[0.06]", label: "Pending" },
  "in-progress": { className: "text-amber-400", bgClassName: "bg-amber-500/10 ring-amber-500/20", label: "In Progress" },
  completed: { className: "text-emerald-400", bgClassName: "bg-emerald-500/10 ring-emerald-500/20", label: "Completed" },
}

const checks: TurnaroundCheck[] = [
  {
    id: "1",
    flightNumber: "BA2156",
    aircraft: "A320",
    registration: "G-EUPH",
    gate: "A12",
    stand: "501",
    status: "in-progress",
    engineer: "T. Mitchell",
    arrivalTime: "06:15",
    departureTime: "07:00",
    checklistItems: 12,
    itemsCompleted: 8,
  },
  {
    id: "2",
    flightNumber: "BA2204",
    aircraft: "A321neo",
    registration: "G-TTNA",
    gate: "C15",
    stand: "412",
    status: "pending",
    engineer: "M. Chen",
    arrivalTime: "08:30",
    departureTime: "09:15",
    checklistItems: 14,
    itemsCompleted: 0,
  },
  {
    id: "3",
    flightNumber: "BA2310",
    aircraft: "B787-9",
    registration: "G-ZBKF",
    gate: "D22",
    stand: "556",
    status: "pending",
    engineer: "J. Williams",
    arrivalTime: "12:45",
    departureTime: "13:30",
    checklistItems: 18,
    itemsCompleted: 0,
  },
  {
    id: "4",
    flightNumber: "BA2156",
    aircraft: "A320",
    registration: "G-EUPT",
    gate: "—",
    stand: "324",
    status: "completed",
    engineer: "T. Mitchell",
    arrivalTime: "11:30",
    departureTime: "12:15",
    checklistItems: 12,
    itemsCompleted: 12,
  },
]

function CheckCard({ check }: { check: TurnaroundCheck }) {
  const config = statusConfig[check.status]
  const progress = Math.round((check.itemsCompleted / check.checklistItems) * 100)

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2.5 rounded-xl p-3.5 ring-1 transition-all duration-300 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.3)]",
        config.bgClassName
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-white text-sm">{check.flightNumber}</span>
            <span className="text-xs text-neutral-500">{check.aircraft}</span>
            <span className="font-mono text-xs font-medium text-neutral-400">{check.registration}</span>
          </div>
        </div>
        <span className={cn("text-[10px] font-semibold uppercase tracking-wide shrink-0", config.className)}>
          {config.label}
        </span>
      </div>

      {/* Location & Time */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-neutral-500 px-0">
        <span>{check.gate} / {check.stand}</span>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Clock className="size-3" strokeWidth={1.5} />
          <span>{check.arrivalTime} → {check.departureTime}</span>
        </div>
      </div>

      {/* Progress bar */}
      {check.status === "in-progress" && (
        <div className="relative z-10">
          <div className="flex items-center justify-between text-[9px] mb-1">
            <span className="text-neutral-500">Checklist Progress</span>
            <span className="text-amber-400 font-medium">{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Checklist items */}
      <div className="relative z-10 flex items-center justify-between text-[10px]">
        <span className="text-neutral-500">
          {check.itemsCompleted} / {check.checklistItems} items
        </span>
        <span className="text-neutral-600">{check.engineer}</span>
      </div>
    </div>
  )
}

export function TurnaroundChecks() {
  const inProgressCount = checks.filter((c) => c.status === "in-progress").length
  const completedCount = checks.filter((c) => c.status === "completed").length

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
            <Wrench className="size-4 text-neutral-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              Turnaround Checks
            </h2>
            <p className="text-xs text-neutral-400">
              {checks.length} total
              {inProgressCount > 0 && ` • ${inProgressCount} in progress`}
              {completedCount > 0 && ` • ${completedCount} completed`}
            </p>
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

      {/* Checks list */}
      <div className="relative z-10 flex-1 space-y-2 overflow-y-auto p-5">
        {checks.map((check) => (
          <CheckCard key={check.id} check={check} />
        ))}
      </div>
    </div>
  )
}
