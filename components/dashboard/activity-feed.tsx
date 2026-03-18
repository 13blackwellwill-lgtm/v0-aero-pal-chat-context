"use client"

import { cn } from "@/lib/utils"
import {
  UserCheck,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Plane,
} from "lucide-react"

type ActivityType =
  | "assignment"
  | "maintenance"
  | "defect"
  | "completed"
  | "handover"
  | "note"
  | "arrival"

interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  user?: string
}

const activityConfig: Record<
  ActivityType,
  { icon: React.ElementType; className: string }
> = {
  assignment: { icon: UserCheck, className: "text-sky-400" },
  maintenance: { icon: Wrench, className: "text-amber-400" },
  defect: { icon: AlertTriangle, className: "text-rose-400" },
  completed: { icon: CheckCircle, className: "text-emerald-400" },
  handover: { icon: Clock, className: "text-neutral-400" },
  note: { icon: FileText, className: "text-neutral-400" },
  arrival: { icon: Plane, className: "text-emerald-400" },
}

const activities: Activity[] = [
  {
    id: "1",
    type: "defect",
    title: "Defect Logged",
    description: "Hydraulic pressure anomaly on G-CIVW",
    timestamp: "2 min ago",
    user: "K. Okonkwo",
  },
  {
    id: "2",
    type: "assignment",
    title: "Engineer Assigned",
    description: "R. Patel assigned to BA2158 at B08",
    timestamp: "10 min ago",
  },
  {
    id: "3",
    type: "completed",
    title: "Task Completed",
    description: "Pre-flight check complete on G-EUPH",
    timestamp: "15 min ago",
    user: "T. Mitchell",
  },
  {
    id: "4",
    type: "maintenance",
    title: "Maintenance Started",
    description: "Component replacement on G-EUYH",
    timestamp: "25 min ago",
    user: "R. Patel",
  },
  {
    id: "5",
    type: "arrival",
    title: "Aircraft Arrived",
    description: "G-EUPT arrived at Stand 324 from CDG",
    timestamp: "30 min ago",
  },
  {
    id: "6",
    type: "handover",
    title: "Shift Handover",
    description: "Night shift handover completed",
    timestamp: "2 hours ago",
    user: "J. Davidson",
  },
  {
    id: "7",
    type: "note",
    title: "Note Added",
    description: "Parts ETA confirmed for G-CIVW repair",
    timestamp: "2 hours ago",
    user: "M. Chen",
  },
]

function ActivityItem({ activity }: { activity: Activity }) {
  const config = activityConfig[activity.type]
  const Icon = config.icon

  return (
    <div className="group flex gap-3 py-3.5 transition-colors duration-200">
      <div className="relative">
        {/* Timeline connector */}
        <div className="absolute left-1/2 top-9 h-[calc(100%+14px)] w-px -translate-x-1/2 bg-gradient-to-b from-white/[0.06] to-transparent" />
        
        <div
          className={cn(
            "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.03] ring-1 ring-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-transform duration-300 group-hover:scale-110",
            config.className
          )}
        >
          <Icon className="size-3.5" strokeWidth={1.5} />
        </div>
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-200">
            {activity.title}
          </span>
          <span className="text-[10px] text-neutral-600">
            {activity.timestamp}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          {activity.description}
        </p>
        {activity.user && (
          <p className="mt-1.5 text-[10px] text-neutral-600">
            by {activity.user}
          </p>
        )}
      </div>
    </div>
  )
}

export function ActivityFeed() {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/[0.015] ring-1 ring-white/[0.04] transition-all duration-500 ease-out hover:bg-white/[0.02] hover:ring-white/[0.08]">
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.04] px-5 py-4">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
          Recent Activity
        </h2>
        <span className="text-[10px] text-neutral-600">Last 24 hours</span>
      </div>

      {/* Activity list */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5">
        {activities.map((activity, index) => (
          <div key={activity.id}>
            <ActivityItem activity={activity} />
            {index === activities.length - 1 && (
              <div className="h-4" /> 
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
