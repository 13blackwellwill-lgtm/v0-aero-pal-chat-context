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
  "on-time": { label: "On Time", className: "bg-success/10 text-success border-success/20" },
  delayed: { label: "Delayed", className: "bg-warning/10 text-warning border-warning/20" },
  boarding: { label: "Boarding", className: "bg-info/10 text-info border-info/20" },
  departed: { label: "Departed", className: "bg-muted text-muted-foreground border-muted" },
  arrived: { label: "Arrived", className: "bg-success/10 text-success border-success/20" },
  aog: { label: "AOG", className: "bg-critical/10 text-critical border-critical/20" },
}

const maintenanceStatusConfig: Record<MaintenanceStatus, { label: string; className: string }> = {
  clear: { label: "Clear", className: "bg-success/10 text-success border-success/20" },
  scheduled: { label: "Scheduled", className: "bg-info/10 text-info border-info/20" },
  "in-progress": { label: "In Progress", className: "bg-warning/10 text-warning border-warning/20" },
  deferred: { label: "Deferred", className: "bg-muted text-muted-foreground border-muted" },
  critical: { label: "Critical", className: "bg-critical/10 text-critical border-critical/20" },
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
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-card-foreground">
            Flight Operations
          </h2>
          <p className="text-sm text-muted-foreground">
            Live departures and arrivals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">Flight</TableHead>
              <TableHead className="w-[90px]">Reg</TableHead>
              <TableHead className="w-[80px]">Type</TableHead>
              <TableHead className="w-[140px]">Route</TableHead>
              <TableHead className="w-[70px]">STD</TableHead>
              <TableHead className="w-[70px]">ETD</TableHead>
              <TableHead className="w-[70px]">Gate</TableHead>
              <TableHead className="w-[100px]">Flight Status</TableHead>
              <TableHead className="w-[100px]">Maint. Status</TableHead>
              <TableHead className="w-[120px]">Engineer</TableHead>
              <TableHead className="w-[70px]">Defects</TableHead>
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
                    "cursor-pointer transition-colors",
                    flight.flightStatus === "aog" && "bg-critical/5"
                  )}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Plane className="size-3.5 text-muted-foreground" />
                      {flight.flightNumber}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {flight.registration}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {flight.aircraftType}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="font-medium">{flight.origin}</span>
                      <ArrowRight className="size-3 text-muted-foreground" />
                      <span className="font-medium">{flight.destination}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {flight.std}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "font-mono text-xs",
                      flight.etd !== flight.std && flight.etd !== "—" && "text-warning"
                    )}
                  >
                    {flight.etd}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {flight.gate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("font-normal", flightStatus.className)}
                    >
                      {flightStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("font-normal", maintenanceStatus.className)}
                    >
                      {maintenanceStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {flight.assignedEngineer || "—"}
                  </TableCell>
                  <TableCell>
                    {flight.defects > 0 ? (
                      <span
                        className={cn(
                          "inline-flex size-6 items-center justify-center rounded-full text-xs font-medium",
                          flight.defects >= 3
                            ? "bg-critical/10 text-critical"
                            : "bg-warning/10 text-warning"
                        )}
                      >
                        {flight.defects}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="size-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign Engineer</DropdownMenuItem>
                        <DropdownMenuItem>View Defects</DropdownMenuItem>
                        <DropdownMenuItem>Add Note</DropdownMenuItem>
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
