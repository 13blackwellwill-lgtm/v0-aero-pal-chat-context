"use client"

import { cn } from "@/lib/utils"
import {
  UserPlus,
  AlertTriangle,
  FileText,
  Clock,
  ArrowRightLeft,
  Wrench,
} from "lucide-react"

interface QuickAction {
  icon: React.ElementType
  label: string
  shortcut?: string
}

const actions: QuickAction[] = [
  { icon: UserPlus, label: "Assign Engineer", shortcut: "A" },
  { icon: AlertTriangle, label: "Log Defect", shortcut: "D" },
  { icon: FileText, label: "Add Note", shortcut: "N" },
  { icon: Clock, label: "Shift Handover", shortcut: "H" },
  { icon: ArrowRightLeft, label: "Transfer Task", shortcut: "T" },
  { icon: Wrench, label: "Request Parts", shortcut: "P" },
]

export function QuickActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {actions.map((action) => (
        <button
          key={action.label}
          className={cn(
            "group relative inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
            "bg-white/[0.03] text-neutral-400 ring-1 ring-white/[0.05]",
            "hover:bg-white/[0.06] hover:text-neutral-100 hover:-translate-y-0.5 hover:ring-white/[0.1]",
            "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_16px_-4px_rgba(0,0,0,0.2)]"
          )}
        >
          {/* Inner highlight on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />
          
          {/* Depth shadow */}
          <div className="pointer-events-none absolute inset-0 rounded-lg shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative z-10 flex items-center gap-2.5">
            <action.icon className="size-4.5 shrink-0 transition-colors duration-200 group-hover:text-sky-400/80" strokeWidth={1.6} />
            <span className="leading-tight">{action.label}</span>
            {action.shortcut && (
              <kbd className="ml-auto rounded-md bg-white/[0.05] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-neutral-500 ring-1 ring-white/[0.08] transition-all duration-200 group-hover:bg-white/[0.08] group-hover:text-neutral-300 group-hover:ring-white/[0.12]">
                {action.shortcut}
              </kbd>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
