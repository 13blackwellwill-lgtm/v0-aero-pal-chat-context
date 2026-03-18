"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  RefreshCw,
  Search,
  ChevronDown,
  Calendar,
  Clock,
} from "lucide-react"
import { useState, useEffect } from "react"

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [currentDate, setCurrentDate] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
      setCurrentDate(
        now.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/[0.04] bg-transparent px-6">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white/90">
            Live Operations
          </h1>
          <p className="text-sm text-neutral-500">
            Heathrow Terminal 5 (LHR T5)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Time Display */}
        <div className="flex items-center gap-4 rounded-xl bg-white/[0.02] px-4 py-2 ring-1 ring-white/[0.06]">
          <div className="flex items-center gap-2 text-neutral-500">
            <Calendar className="size-4" strokeWidth={1.5} />
            <span className="text-sm">{currentDate}</span>
          </div>
          <div className="h-4 w-px bg-white/[0.06]" />
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-neutral-500" strokeWidth={1.5} />
            <span className="font-mono text-sm font-medium text-white/90">
              {currentTime}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-600">UTC</span>
          </div>
        </div>

        {/* Station Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-lg border-white/[0.06] bg-white/[0.02] text-neutral-300 hover:bg-white/[0.05] hover:text-white"
            >
              LHR T5
              <ChevronDown className="size-3" strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl border-white/[0.06] bg-neutral-900/95 backdrop-blur-xl">
            <DropdownMenuItem className="text-neutral-300 focus:bg-white/[0.05] focus:text-neutral-100">LHR T5 - Heathrow Terminal 5</DropdownMenuItem>
            <DropdownMenuItem className="text-neutral-300 focus:bg-white/[0.05] focus:text-neutral-100">LGW N - Gatwick North</DropdownMenuItem>
            <DropdownMenuItem className="text-neutral-300 focus:bg-white/[0.05] focus:text-neutral-100">LGW S - Gatwick South</DropdownMenuItem>
            <DropdownMenuItem className="text-neutral-300 focus:bg-white/[0.05] focus:text-neutral-100">MAN T1 - Manchester Terminal 1</DropdownMenuItem>
            <DropdownMenuItem className="text-neutral-300 focus:bg-white/[0.05] focus:text-neutral-100">MAN T2 - Manchester Terminal 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search */}
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 rounded-lg border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200"
        >
          <Search className="size-4" strokeWidth={1.5} />
          <span className="hidden lg:inline">Search</span>
          <kbd className="ml-2 hidden rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-neutral-500 ring-1 ring-white/[0.06] lg:inline">
            /
          </kbd>
        </Button>

        {/* Refresh */}
        <Button 
          variant="outline" 
          size="icon" 
          className="size-9 rounded-lg border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200"
        >
          <RefreshCw className="size-4" strokeWidth={1.5} />
        </Button>
      </div>
    </header>
  )
}
