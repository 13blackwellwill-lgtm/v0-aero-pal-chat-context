"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plane, ArrowRight } from "lucide-react"

type FlightStatus = "on-time" | "delayed" | "boarding" | "departed" | "arrived" | "aog"
type MaintenanceStatus = "clear" | "scheduled" | "in-progress" | "deferred" | "critical"

interface Flight {
  id: string
  flightNumber: string
  registration: string
  aircraftType: string
  origin: string
  destination: string
  std: string
  sta: string
  etd: string
  eta: string
  gate: string
  stand: string
  flightStatus: FlightStatus
  maintenanceStatus: MaintenanceStatus
  assignedEngineer?: string
  defects: number
}

const flightStatusConfig: Record<FlightStatus, { label: string; className: string }> = {
  "on-time": { label: "On Time", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  delayed: { label: "Delayed", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  boarding: { label: "Boarding", className: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  departed: { label: "Departed", className: "bg-white/[0.04] text-neutral-400 border-white/[0.06]" },
  arrived: { label: "Arrived", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  aog: { label: "AOG", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
}

const maintenanceStatusConfig: Record<MaintenanceStatus, { label: string; className: string }> = {
  clear: { label: "Clear", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  scheduled: { label: "Scheduled", className: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  "in-progress": { label: "In Progress", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  deferred: { label: "Deferred", className: "bg-white/[0.04] text-neutral-400 border-white/[0.06]" },
  critical: { label: "Critical", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
}

const flights: Flight[] = [
  {
    id: "1",
    flightNumber: "BA2156",
    registration: "G-EUPH",
    aircraftType: "A320",
    origin: "LHR",
    destination: "CDG",
    std: "06:30",
    sta: "08:45",
    etd: "06:30",
    eta: "08:45",
    gate: "A12",
    stand: "501",
    flightStatus: "boarding",
    maintenanceStatus: "clear",
    assignedEngineer: "T. Mitchell",
    defects: 0,
  },
  {
    id: "2",
    flightNumber: "BA2158",
    registration: "G-EUYH",
    aircraftType: "A320",
    origin: "LHR",
    destination: "AMS",
    std: "07:15",
    sta: "09:30",
    etd: "07:45",
    eta: "10:00",
    gate: "B08",
    stand: "324",
    flightStatus: "delayed",
    maintenanceStatus: "in-progress",
    assignedEngineer: "R. Patel",
    defects: 1,
  },
  {
    id: "3",
    flightNumber: "BA2204",
    registration: "G-TTNA",
    aircraftType: "A321neo",
    origin: "LHR",
    destination: "BCN",
    std: "08:00",
    sta: "11:15",
    etd: "08:00",
    eta: "11:15",
    gate: "C15",
    stand: "412",
    flightStatus: "on-time",
    maintenanceStatus: "scheduled",
    assignedEngineer: "M. Chen",
    defects: 0,
  },
  {
    id: "4",
    flightNumber: "BA2310",
    registration: "G-ZBKF",
    aircraftType: "B787-9",
    origin: "LHR",
    destination: "JFK",
    std: "09:30",
    sta: "12:45",
    etd: "09:30",
    eta: "12:45",
    gate: "D22",
    stand: "556",
    flightStatus: "on-time",
    maintenanceStatus: "clear",
    assignedEngineer: "J. Williams",
    defects: 0,
  },
  {
    id: "5",
    flightNumber: "BA2412",
    registration: "G-CIVW",
    aircraftType: "B777-200",
    origin: "LHR",
    destination: "DXB",
    std: "10:15",
    sta: "19:30",
    etd: "—",
    eta: "—",
    gate: "E05",
    stand: "601",
    flightStatus: "aog",
    maintenanceStatus: "critical",
    assignedEngineer: "K. Okonkwo",
    defects: 3,
  },
  {
    id: "6",
    flightNumber: "BA2156",
    registration: "G-EUPT",
    aircraftType: "A320",
    origin: "CDG",
    destination: "LHR",
    std: "11:30",
    sta: "11:45",
    etd: "11:30",
    eta: "11:45",
    gate: "—",
    stand: "—",
    flightStatus: "departed",
    maintenanceStatus: "deferred",
    defects: 1,
  },
  {
    id: "7",
    flightNumber: "BA2234",
    registration: "G-TTNB",
    aircraftType: "A321neo",
    origin: "MUC",
    destination: "LHR",
    std: "12:00",
    sta: "13:15",
    etd: "12:00",
    eta: "13:15",
    gate: "—",
    stand: "—",
    flightStatus: "on-time",
    maintenanceStatus: "clear",
    defects: 0,
  },
  {
    id: "8",
    flightNumber: "BA2508",
    registration: "G-ZBKH",
    aircraftType: "B787-9",
    origin: "SIN",
    destination: "LHR",
    std: "06:00",
    sta: "14:30",
    etd: "06:15",
    eta: "14:45",
    gate: "—",
    stand: "—",
    flightStatus: "delayed",
    maintenanceStatus: "scheduled",
    defects: 0,
  },
]

export function FlightsTable() {
  return (
    <div className="group relative overflow-hidden rounded-[24px] bg-white/[0.015] ring-1 ring-white/[0.04] transition-all duration-500 ease-out hover:bg-white/[0.02] hover:ring-white/[0.08]">
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Inset highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.04] px-7 py-5">
        <div>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
            Flight Operations
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Live departures and arrivals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 rounded-lg border-white/[0.06] bg-white/[0.02] text-xs text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-300"
          >
            Filter
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 rounded-lg border-white/[0.06] bg-white/[0.02] text-xs text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-300"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="relative z-10 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.04] hover:bg-transparent">
              <TableHead className="w-[100px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">Flight</TableHead>
              <TableHead className="w-[90px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">Reg</TableHead>
              <TableHead className="w-[80px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">Type</TableHead>
              <TableHead className="w-[140px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">Route</TableHead>
              <TableHead className="w-[70px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">STD</TableHead>
              <TableHead className="w-[70px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">ETD</TableHead>
              <TableHead className="w-[70px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">Gate</TableHead>
              <TableHead className="w-[100px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">Flight Status</TableHead>
              <TableHead className="w-[100px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">Maint. Status</TableHead>
              <TableHead className="w-[120px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">Engineer</TableHead>
              <TableHead className="w-[70px] text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">Defects</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight) => {
              const flightStatus = flightStatusConfig[flight.flightStatus]
              const maintenanceStatus = maintenanceStatusConfig[flight.maintenanceStatus]
              
              return (
                <TableRow
                  key={flight.id}
                  className={cn(
                    "cursor-pointer border-white/[0.03] transition-colors duration-200 hover:bg-white/[0.03]",
                    flight.flightStatus === "aog" && "bg-rose-500/[0.03]"
                  )}
                >
                  <TableCell className="font-medium text-neutral-200">
                    <div className="flex items-center gap-2">
                      <Plane className="size-3.5 text-neutral-500" strokeWidth={1.5} />
                      {flight.flightNumber}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-neutral-500">
                    {flight.registration}
                  </TableCell>
                  <TableCell className="text-neutral-400">
                    {flight.aircraftType}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="font-medium text-neutral-300">{flight.origin}</span>
                      <ArrowRight className="size-3 text-neutral-600" strokeWidth={1.5} />
                      <span className="font-medium text-neutral-300">{flight.destination}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-neutral-400">
                    {flight.std}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "font-mono text-xs",
                      flight.etd !== flight.std && flight.etd !== "—" 
                        ? "text-amber-400" 
                        : "text-neutral-400"
                    )}
                  >
                    {flight.etd}
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {flight.gate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("rounded-md font-normal text-[10px] uppercase tracking-wide", flightStatus.className)}
                    >
                      {flightStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("rounded-md font-normal text-[10px] uppercase tracking-wide", maintenanceStatus.className)}
                    >
                      {maintenanceStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {flight.assignedEngineer || "—"}
                  </TableCell>
                  <TableCell>
                    {flight.defects > 0 ? (
                      <span
                        className={cn(
                          "inline-flex size-6 items-center justify-center rounded-full text-xs font-medium ring-1",
                          flight.defects >= 3
                            ? "bg-rose-500/10 text-rose-400 ring-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 ring-amber-500/20"
                        )}
                      >
                        {flight.defects}
                      </span>
                    ) : (
                      <span className="text-neutral-600">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="size-8 p-0 text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-300"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl border-white/[0.06] bg-neutral-900/95 backdrop-blur-xl">
                        <DropdownMenuItem className="text-neutral-300 focus:bg-white/[0.05] focus:text-neutral-100">View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-neutral-300 focus:bg-white/[0.05] focus:text-neutral-100">Assign Engineer</DropdownMenuItem>
                        <DropdownMenuItem className="text-neutral-300 focus:bg-white/[0.05] focus:text-neutral-100">View Defects</DropdownMenuItem>
                        <DropdownMenuItem className="text-neutral-300 focus:bg-white/[0.05] focus:text-neutral-100">Add Note</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
