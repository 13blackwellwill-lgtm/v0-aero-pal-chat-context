"use client"

import { cn } from "@/lib/utils"
import { Map, Plane, ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AircraftMarker {
  id: string
  registration: string
  position: { x: number; y: number }
  heading: number
  status: "airborne" | "ground" | "aog"
  flightNumber?: string
}

const aircraftMarkers: AircraftMarker[] = [
  { id: "1", registration: "G-EUPH", position: { x: 45, y: 35 }, heading: 45, status: "airborne", flightNumber: "BA2156" },
  { id: "2", registration: "G-EUYH", position: { x: 52, y: 58 }, heading: 180, status: "ground" },
  { id: "3", registration: "G-TTNA", position: { x: 48, y: 52 }, heading: 90, status: "ground" },
  { id: "4", registration: "G-ZBKF", position: { x: 30, y: 45 }, heading: 270, status: "airborne", flightNumber: "BA2310" },
  { id: "5", registration: "G-CIVW", position: { x: 50, y: 55 }, heading: 0, status: "aog" },
  { id: "6", registration: "G-EUPT", position: { x: 62, y: 42 }, heading: 315, status: "airborne", flightNumber: "BA2156" },
]

function AircraftIcon({ marker }: { marker: AircraftMarker }) {
  const statusColors = {
    airborne: "text-emerald-400",
    ground: "text-sky-400",
    aog: "text-rose-400",
  }

  const statusGlow = {
    airborne: "drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]",
    ground: "drop-shadow-[0_0_4px_rgba(56,189,248,0.4)]",
    aog: "drop-shadow-[0_0_6px_rgba(251,113,133,0.6)]",
  }

  return (
    <div
      className={cn(
        "absolute transition-all duration-300 hover:scale-125 cursor-pointer group",
        statusColors[marker.status],
        statusGlow[marker.status]
      )}
      style={{
        left: `${marker.position.x}%`,
        top: `${marker.position.y}%`,
        transform: `translate(-50%, -50%) rotate(${marker.heading}deg)`,
      }}
    >
      <Plane className="size-3.5" strokeWidth={2} fill="currentColor" />
      
      {/* Tooltip on hover */}
      <div 
        className="absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20"
        style={{ transform: `translate(-50%, 0) rotate(-${marker.heading}deg)` }}
      >
        <div className="rounded-lg bg-neutral-900/95 px-2 py-1 text-[9px] font-medium text-white whitespace-nowrap ring-1 ring-white/[0.1] backdrop-blur-sm">
          {marker.registration}
          {marker.flightNumber && <span className="text-neutral-400 ml-1">· {marker.flightNumber}</span>}
        </div>
      </div>

      {/* AOG pulse */}
      {marker.status === "aog" && (
        <span className="absolute inset-0 animate-ping rounded-full bg-rose-400 opacity-40" />
      )}
    </div>
  )
}

export function MapPreview() {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/[0.015] ring-1 ring-white/[0.04] transition-all duration-500 ease-out hover:bg-white/[0.02] hover:ring-white/[0.08]">
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.04] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.03] ring-1 ring-white/[0.06]">
            <Map className="size-4 text-neutral-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              Live Map
            </h2>
            <p className="text-xs text-neutral-500/80">UK airspace</p>
          </div>
        </div>
        <Link href="/map">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 rounded-lg text-[10px] uppercase tracking-wider text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-300"
          >
            Full View
            <ExternalLink className="ml-1.5 size-3" strokeWidth={1.5} />
          </Button>
        </Link>
      </div>

      {/* Map area */}
      <div className="relative z-10 h-[280px] overflow-hidden">
        {/* Simplified map background */}
        <div className="absolute inset-0 bg-[#0d0d10]">
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Simplified UK outline - stylized */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20">
            <path
              d="M45 15 L50 20 L48 30 L52 35 L50 45 L55 50 L53 60 L58 65 L55 75 L50 80 L45 75 L40 80 L35 75 L38 65 L35 55 L40 50 L38 40 L42 35 L40 25 L45 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-400"
            />
          </svg>

          {/* Airport marker - LHR */}
          <div className="absolute left-[50%] top-[55%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="size-4 text-sky-400 fill-sky-400/30" strokeWidth={1.5} />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-medium text-sky-400/80 whitespace-nowrap">
                LHR
              </span>
            </div>
          </div>

          {/* Aircraft markers */}
          {aircraftMarkers.map((marker) => (
            <AircraftIcon key={marker.id} marker={marker} />
          ))}
        </div>

        {/* Status legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-4 rounded-lg bg-neutral-900/80 px-3 py-2 ring-1 ring-white/[0.06] backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-neutral-400">Airborne</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-sky-400" />
            <span className="text-[9px] text-neutral-400">Ground</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-[9px] text-neutral-400">AOG</span>
          </div>
        </div>

        {/* Aircraft count */}
        <div className="absolute top-3 right-3 rounded-lg bg-neutral-900/80 px-3 py-2 ring-1 ring-white/[0.06] backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Plane className="size-3.5 text-neutral-400" strokeWidth={1.5} />
            <span className="text-xs font-medium text-white">{aircraftMarkers.length}</span>
            <span className="text-[9px] text-neutral-500">tracked</span>
          </div>
        </div>
      </div>
    </div>
  )
}
