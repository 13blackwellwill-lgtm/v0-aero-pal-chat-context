"use client"

import { Button } from "@/components/ui/button"
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
  { icon: ArrowRightLeft, label: "Transfer Task" },
  { icon: Wrench, label: "Request Parts" },
]

export function QuickActions() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          size="sm"
          className="gap-2 rounded-lg border-white/[0.06] bg-white/[0.02] text-neutral-400 transition-all duration-300 hover:bg-white/[0.05] hover:text-neutral-200"
        >
          <action.icon className="size-4" strokeWidth={1.5} />
          <span>{action.label}</span>
          {action.shortcut && (
            <kbd className="ml-1 rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-neutral-500 ring-1 ring-white/[0.06]">
              {action.shortcut}
            </kbd>
          )}
        </Button>
      ))}
    </div>
  )
}
