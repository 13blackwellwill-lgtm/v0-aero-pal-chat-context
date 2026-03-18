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
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <action.icon className="size-4" />
          <span>{action.label}</span>
          {action.shortcut && (
            <kbd className="ml-1 rounded bg-muted px-1.5 py-0.5 text-xs">
              {action.shortcut}
            </kbd>
          )}
        </Button>
      ))}
    </div>
  )
}
