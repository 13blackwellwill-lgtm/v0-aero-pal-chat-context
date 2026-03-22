"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { OctagonAlert as AlertOctagon, ChevronRight, Clock, MapPin, CircleAlert as AlertCircle } from "lucide-react"

type AOGSeverity = "critical" | "high" | "medium"

interface AOGEvent {
  id: string
  aircraft: string
  registration: string
  location: string
  issue: string
  severity: AOGSeverity
  elapsedTime: string
  assignedEngineer?: string
  escalationLevel: number
  partsExpected?: string
}

const severityConfig: Record<AOGSeverity, { className: string; bgClassName: string }> = {
  critical: { className: "text-rose-400", bgClassName: "bg-rose-500/10 ring-rose-500/20" },
  high: { className: "text-amber-400", bgClassName: "bg-amber-500/10 ring-amber-500/20" },
  medium: { className: "text-yellow-400", bgClassName: "bg-yellow-500/10 ring-yellow-500/20" },
}

const aogEvents: AOGEvent[] = [
  {
    id: "1",
    aircraft: "B777-200",
    registration: "G-CIVW",
    location: "LHR T5 - Stand E05",
    issue: "Hydraulic system fault - multiple warnings",
    severity: "critical",
    elapsedTime: "2h 15m",
    assignedEngineer: "K. Okonkwo",
    escalationLevel: 2,
    partsExpected: "14:00 UTC",
  },
  {
    id: "2",
    aircraft: "A321neo",
    registration: "G-TTNC",
    location: "LGW S - Stand 412",
    issue: "Electrical system intermittent fault",
    severity: "high",
    elapsedTime: "45m",
    assignedEngineer: "S. Kumar",
    escalationLevel: 1,
  },
]

function AOGCard({ event }: { event: AOGEvent }) {
  const config = severityConfig[event.severity]

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl p-4 ring-1 transition-all duration-300 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.4)]",
        config.bgClassName
      )}
    >
      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />

      {/* Header with severity indicator */}
      <div className="relative z-10 flex items-start gap-3">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-white/[0.1] transition-transform duration-300 group-hover:scale-105",
            config.className
          )}
        >
          <AlertOctagon className="size-4" strokeWidth={1.5} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-white">
                  {event.registration}
                </span>
                <span className="text-xs text-neutral-500">{event.aircraft}</span>
              </div>
            </div>
            <span className={cn("text-xs font-semibold uppercase tracking-wide", config.className)}>
              {event.severity}
            </span>
          </div>

          <p className="text-xs font-medium text-neutral-300 leading-snug mb-2">
            {event.issue}
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mb-2.5">
            <MapPin className="size-3" strokeWidth={1.5} />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center justify-between gap-2 text-[10px]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3 text-neutral-500" strokeWidth={1.5} />
                <span className="text-neutral-400 font-medium">{event.elapsedTime}</span>
              </div>

              {event.partsExpected && (
                <div className="flex items-center gap-1">
                  <span className="text-neutral-600">Parts ETA:</span>
                  <span className="text-amber-400 font-medium">{event.partsExpected}</span>
                </div>
              )}
            </div>

            {event.escalationLevel > 0 && (
              <div className="flex items-center gap-1.5 rounded-md bg-white/[0.06] px-2 py-1">
                <AlertCircle className="size-3 text-amber-400" strokeWidth={1.5} />
                <span className="text-neutral-300">L{event.escalationLevel}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Engineer assignment */}
      {event.assignedEngineer && (
        <div className="relative z-10 flex items-center gap-2 -mt-1 pt-2.5 border-t border-white/[0.06]">
          <span className="text-[10px] text-neutral-500">Assigned:</span>
          <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-medium text-neutral-300 ring-1 ring-white/[0.08]">
            {event.assignedEngineer}
          </span>
        </div>
      )}
    </div>
  )
}

export function AOGPanel() {
  const criticalCount = aogEvents.filter((e) => e.severity === "critical").length

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white/[0.015] ring-1 ring-white/[0.04] transition-all duration-500 ease-out hover:bg-white/[0.02] hover:ring-white/[0.08]">
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.04] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-rose-500/10 ring-1 ring-rose-500/20">
            <AlertOctagon className="size-4 text-rose-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              AOG Events
            </h2>
            <p className="text-xs text-rose-400">
              {aogEvents.length} active
              {criticalCount > 0 && ` • ${criticalCount} critical`}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 rounded-lg text-[10px] uppercase tracking-wider text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-300"
        >
          Details
          <ChevronRight className="ml-1 size-3" strokeWidth={1.5} />
        </Button>
      </div>

      {/* AOG Events list */}
      <div className="relative z-10 flex-1 space-y-2 overflow-y-auto p-5">
        {aogEvents.length > 0 ? (
          aogEvents.map((event) => (
            <AOGCard key={event.id} event={event} />
          ))
        ) : (
          <div className="flex items-center justify-center h-32 text-center">
            <div>
              <p className="text-sm text-neutral-400">No active AOG events</p>
              <p className="text-xs text-neutral-600 mt-1">All aircraft operational</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
