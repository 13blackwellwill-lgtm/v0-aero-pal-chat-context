"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TriangleAlert as AlertTriangle, ChevronRight, Clock, Zap } from "lucide-react"

type DefectSeverity = "critical" | "major" | "minor"

interface Defect {
  id: string
  aircraft: string
  registration: string
  defectCode: string
  description: string
  severity: DefectSeverity
  reportedTime: string
  status: "open" | "investigating" | "deferred"
  assignedEngineer?: string
  category: string
}

const severityConfig: Record<DefectSeverity, { className: string; bgClassName: string; label: string }> = {
  critical: { className: "text-rose-400", bgClassName: "bg-rose-500/10 ring-rose-500/20", label: "Critical" },
  major: { className: "text-amber-400", bgClassName: "bg-amber-500/10 ring-amber-500/20", label: "Major" },
  minor: { className: "text-sky-400", bgClassName: "bg-sky-500/10 ring-sky-500/20", label: "Minor" },
}

const statusConfig: Record<string, string> = {
  open: "text-white",
  investigating: "text-amber-400",
  deferred: "text-neutral-500",
}

const defects: Defect[] = [
  {
    id: "1",
    aircraft: "B777-200",
    registration: "G-CIVW",
    defectCode: "29-22-00",
    description: "Hydraulic pressure anomaly - systems A & B",
    severity: "critical",
    reportedTime: "2 min ago",
    status: "investigating",
    assignedEngineer: "K. Okonkwo",
    category: "Hydraulic",
  },
  {
    id: "2",
    aircraft: "A320",
    registration: "G-EUYH",
    defectCode: "27-40-00",
    description: "Electrical system intermittent fault - lights",
    severity: "major",
    reportedTime: "25 min ago",
    status: "investigating",
    assignedEngineer: "R. Patel",
    category: "Electrical",
  },
  {
    id: "3",
    aircraft: "B787-9",
    registration: "G-ZBKH",
    defectCode: "71-40-00",
    description: "Landing gear warning light - intermittent",
    severity: "major",
    reportedTime: "1h 15m ago",
    status: "open",
    category: "Landing Gear",
  },
  {
    id: "4",
    aircraft: "A321neo",
    registration: "G-TTNA",
    defectCode: "30-11-00",
    description: "Fire detection system - aft cargo",
    severity: "critical",
    reportedTime: "3h 30m ago",
    status: "deferred",
    category: "Fire Detection",
  },
  {
    id: "5",
    aircraft: "A320",
    registration: "G-EUPH",
    defectCode: "38-13-00",
    description: "APU fuel pump inlet pressure low",
    severity: "minor",
    reportedTime: "4h 20m ago",
    status: "open",
    category: "APU",
  },
  {
    id: "6",
    aircraft: "B787-9",
    registration: "G-ZBKF",
    defectCode: "21-31-00",
    description: "Air conditioning pack - cabin temperature",
    severity: "minor",
    reportedTime: "5h 10m ago",
    status: "open",
    category: "Air Conditioning",
  },
  {
    id: "7",
    aircraft: "A320",
    registration: "G-EUYH",
    defectCode: "35-42-00",
    description: "Oxygen system pressure - cabin supply",
    severity: "major",
    reportedTime: "6h 00m ago",
    status: "deferred",
    category: "Oxygen",
  },
]

function DefectRow({ defect }: { defect: Defect }) {
  const severityConfig_local = severityConfig[defect.severity]

  return (
    <div
      className={cn(
        "group relative flex gap-3 rounded-lg p-3 ring-1 transition-all duration-300 hover:bg-white/[0.03] hover:ring-white/[0.08]",
        severityConfig_local.bgClassName
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />

      <div
        className={cn(
          "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.1] transition-transform duration-300 group-hover:scale-105",
          severityConfig_local.className
        )}
      >
        <AlertTriangle className="size-3.5" strokeWidth={1.5} />
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-white">
                {defect.registration}
              </span>
              <span className="text-[10px] text-neutral-500">{defect.defectCode}</span>
            </div>
            <p className="text-xs text-neutral-300 truncate leading-tight mt-0.5">
              {defect.description}
            </p>
          </div>
          <span className={cn("text-[10px] font-semibold uppercase tracking-wide shrink-0", severityConfig_local.className)}>
            {defect.severity}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-[10px] mt-2">
          <div className="flex items-center gap-2 text-neutral-500">
            <span>{defect.category}</span>
            <span className="text-neutral-700">•</span>
            <Clock className="size-3" strokeWidth={1.5} />
            <span>{defect.reportedTime}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={cn("px-1.5 py-0.5 rounded-md bg-white/[0.05] ring-1 ring-white/[0.08]", statusConfig[defect.status])}>
              {defect.status}
            </span>
            {defect.assignedEngineer && (
              <span className="px-1.5 py-0.5 rounded-md bg-white/[0.06] text-neutral-400 ring-1 ring-white/[0.08]">
                {defect.assignedEngineer}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function DefectsPanel() {
  const criticalCount = defects.filter((d) => d.severity === "critical").length
  const majorCount = defects.filter((d) => d.severity === "major").length

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
            <AlertTriangle className="size-4 text-amber-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              Open Defects
            </h2>
            <p className="text-xs text-neutral-400">
              {defects.length} total
              {criticalCount > 0 && ` • ${criticalCount} critical`}
              {majorCount > 0 && ` • ${majorCount} major`}
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

      {/* Defects list */}
      <div className="relative z-10 flex-1 space-y-1.5 overflow-y-auto p-4">
        {defects.map((defect) => (
          <DefectRow key={defect.id} defect={defect} />
        ))}
      </div>
    </div>
  )
}
