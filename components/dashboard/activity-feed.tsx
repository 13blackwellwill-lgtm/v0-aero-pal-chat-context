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
  assignment: { icon: UserCheck, className: "text-info" },
  maintenance: { icon: Wrench, className: "text-warning" },
  defect: { icon: AlertTriangle, className: "text-critical" },
  completed: { icon: CheckCircle, className: "text-success" },
  handover: { icon: Clock, className: "text-muted-foreground" },
  note: { icon: FileText, className: "text-muted-foreground" },
  arrival: { icon: Plane, className: "text-success" },
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
    <div className="group flex gap-3 py-3">
      <div
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary/50",
          config.className
        )}
      >
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-card-foreground">
            {activity.title}
          </span>
          <span className="text-xs text-muted-foreground">
            {activity.timestamp}
          </span>
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {activity.description}
        </p>
        {activity.user && (
          <p className="mt-1 text-xs text-muted-foreground/70">
            by {activity.user}
          </p>
        )}
      </div>
    </div>
  )
}

export function ActivityFeed() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-card-foreground">
          Recent Activity
        </h2>
        <span className="text-xs text-muted-foreground">Last 24 hours</span>
      </div>
      <div className="flex-1 divide-y divide-border overflow-y-auto px-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}
