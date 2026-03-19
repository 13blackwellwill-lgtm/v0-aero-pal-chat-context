"use client"

import { cn } from "@/lib/utils"
import {
  AlertOctagon,
  AlertCircle,
  Wrench,
} from "lucide-react"

interface EventCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
  }
  status?: "default" | "critical" | "warning"
}

function EventCard({ title, value, description, icon: Icon, trend, status = "default" }: EventCardProps) {
  const statusColors = {
    default: "text-neutral-400",
    critical: "text-rose-400",
    warning: "text-amber-400",
  }

  const statusGlow = {
    default: "",
    critical: "shadow-[0_0_24px_-5px_rgba(251,113,133,0.35)]",
    warning: "shadow-[0_0_24px_-5px_rgba(251,191,36,0.3)]",
  }

  const statusRing = {
    default: "ring-white/[0.06]",
    critical: "ring-rose-500/30 hover:ring-rose-500/40",
    warning: "ring-amber-500/25 hover:ring-amber-500/35",
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white/[0.015] p-6 ring-1 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.028] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_48px_-12px_rgba(0,0,0,0.8)]",
        statusRing[status],
        statusGlow[status]
      )}
    >
      {/* Inner border highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)]" />
      
      {/* Outer depth shadow */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[0_8px_28px_-8px_rgba(0,0,0,0.5)]" />

      <div className="relative z-10">
        {/* Header row with title and icon */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 leading-tight">
              {title}
            </p>
          </div>
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)] transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.06]",
              statusColors[status]
            )}
          >
            <Icon className="size-5" strokeWidth={1.6} />
          </div>
        </div>

        {/* Value section */}
        <div className="mb-4 flex items-baseline gap-3">
          <span className="text-5xl font-bold tracking-tight text-white leading-none">
            {value}
          </span>
          {trend && (
            <span
              className={cn(
                "text-xs font-semibold",
                trend.direction === "up" && "text-emerald-400/90",
                trend.direction === "down" && "text-rose-400/90",
                trend.direction === "neutral" && "text-neutral-500"
              )}
            >
              {trend.value}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-neutral-400">
          {description}
        </p>
      </div>

      {/* Decorative background icon */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 opacity-[0.015]">
        <Icon className="size-full" strokeWidth={0.4} />
      </div>
    </div>
  )
}

const eventCardsData: EventCardProps[] = [
  {
    title: "Active AOG",
    value: 2,
    description: "Aircraft on ground awaiting resolution",
    icon: AlertOctagon,
    status: "critical",
  },
  {
    title: "Open Defects",
    value: 12,
    description: "Pending technical resolution",
    icon: AlertCircle,
    trend: { value: "+1", direction: "up" },
    status: "warning",
  },
  {
    title: "Turnaround Checks",
    value: 7,
    description: "In-progress turnaround maintenance",
    icon: Wrench,
    trend: { value: "-1", direction: "down" },
    status: "default",
  },
]

export function EventCards() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {eventCardsData.map((event) => (
        <EventCard key={event.title} {...event} />
      ))}
    </div>
  )
}
