"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Clock, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle, ChevronRight, ClipboardCheck } from "lucide-react"

interface HandoverItem {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "open" | "acknowledged"
}

interface HandoverSummary {
  currentShift: string
  nextShift: string
  lastHandoverTime: string
  completionPercentage: number
  outstandingItems: number
  criticalNotes: string[]
}

const handoverData: HandoverSummary = {
  currentShift: "Day Shift (06:00 - 14:00)",
  nextShift: "Afternoon Shift (14:00 - 22:00)",
  lastHandoverTime: "06:15 UTC",
  completionPercentage: 78,
  outstandingItems: 5,
  criticalNotes: [
    "G-CIVW AOG - Parts ETA 14:00. K. Okonkwo leading repair.",
    "G-ZBKF MEL item expiring 18:00 - MEL clearance required today.",
    "Brake assembly stock critical - 3 units remaining.",
  ],
}

const handoverItems: HandoverItem[] = [
  {
    id: "1",
    title: "AOG Status Update",
    description: "Hydraulic system repair on G-CIVW progressing. Waiting on parts.",
    priority: "high",
    status: "acknowledged",
  },
  {
    id: "2",
    title: "Engineer Schedule",
    description: "2 engineers finishing early (12:00). 4 new engineers starting shift.",
    priority: "medium",
    status: "acknowledged",
  },
  {
    id: "3",
    title: "Unresolved Defects",
    description: "7 defects deferred to afternoon shift. Handover notes provided.",
    priority: "medium",
    status: "open",
  },
  {
    id: "4",
    title: "Parts & Materials",
    description: "Brake assemblies low. Emergency order placed, ETA 18:00.",
    priority: "high",
    status: "open",
  },
  {
    id: "5",
    title: "Maintenance Schedule",
    description: "G-TTNA A-Check scheduled for 22:00. Confirm crew assignment.",
    priority: "low",
    status: "open",
  },
]

function HandoverItemCard({ item }: { item: HandoverItem }) {
  const priorityConfig = {
    high: { className: "text-rose-400", bgClassName: "bg-rose-500/10 ring-rose-500/15" },
    medium: { className: "text-amber-400", bgClassName: "bg-amber-500/10 ring-amber-500/15" },
    low: { className: "text-neutral-400", bgClassName: "bg-white/[0.04] ring-white/[0.06]" },
  }

  const config = priorityConfig[item.priority]

  return (
    <div
      className={cn(
        "relative flex gap-2.5 rounded-lg p-2.5 ring-1 transition-all duration-300 hover:bg-white/[0.03]",
        config.bgClassName
      )}
    >
      <div className={cn("flex size-5 shrink-0 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-white/[0.1]", config.className)}>
        {item.status === "acknowledged" ? (
          <CheckCircle2 className="size-3" strokeWidth={2} />
        ) : (
          <AlertTriangle className="size-3" strokeWidth={2} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-neutral-300 leading-tight">{item.title}</p>
        <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">{item.description}</p>
      </div>
    </div>
  )
}

export function ShiftHandover() {
  const acknowledgedCount = handoverItems.filter((i) => i.status === "acknowledged").length

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
            <ClipboardCheck className="size-4 text-neutral-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              Shift Handover
            </h2>
            <p className="text-xs text-neutral-500/80">
              {handoverData.completionPercentage}% complete
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

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Shift info */}
        <div className="border-b border-white/[0.04] px-6 py-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">Current Shift</span>
            <span className="text-neutral-300 font-medium">{handoverData.currentShift}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">Next Shift</span>
            <span className="text-neutral-300 font-medium">{handoverData.nextShift}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">Last Handover</span>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Clock className="size-3" strokeWidth={1.5} />
              <span>{handoverData.lastHandoverTime}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4 pb-3 border-b border-white/[0.04]">
          <div className="flex items-center justify-between text-[10px] mb-2">
            <span className="text-neutral-500">Handover Completion</span>
            <span className="text-sky-400 font-medium">{handoverData.completionPercentage}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400 transition-all duration-500"
              style={{ width: `${handoverData.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Critical notes */}
        <div className="px-6 py-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-2 mb-2.5">
            <AlertTriangle className="size-3.5 text-amber-400" strokeWidth={1.5} />
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-500">
              Critical Notes
            </p>
          </div>
          <div className="space-y-1.5">
            {handoverData.criticalNotes.map((note, idx) => (
              <div key={idx} className="text-[10px] text-neutral-400 leading-tight pl-5">
                <span className="text-amber-400/60">•</span> {note}
              </div>
            ))}
          </div>
        </div>

        {/* Handover items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-1.5">
          {handoverItems.map((item) => (
            <HandoverItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
