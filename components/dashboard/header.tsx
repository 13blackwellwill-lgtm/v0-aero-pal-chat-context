"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  RefreshCw,
  Search,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Bell,
  Settings,
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
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/[0.04] bg-transparent px-6">
      {/* Left section - Title & Location */}
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Live Operations
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <MapPin className="size-3 text-neutral-500" strokeWidth={1.5} />
            <span className="text-xs text-neutral-500">Heathrow Terminal 5</span>
          </div>
        </div>

        {/* Station Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-2 rounded-lg border-white/[0.06] bg-white/[0.02] text-xs font-medium text-neutral-300 hover:bg-white/[0.05] hover:text-white"
            >
              <span className="flex size-2 rounded-full bg-emerald-500" />
              LHR T5
              <ChevronDown className="size-3 text-neutral-500" strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 rounded-xl border-white/[0.06] bg-neutral-900/95 backdrop-blur-xl">
            <div className="px-2 py-1.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">Active Stations</p>
            </div>
            <DropdownMenuItem className="gap-3 text-neutral-300 focus:bg-white/[0.05] focus:text-white">
              <span className="flex size-2 rounded-full bg-emerald-500" />
              LHR T5 - Heathrow Terminal 5
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-neutral-400 focus:bg-white/[0.05] focus:text-white">
              <span className="flex size-2 rounded-full bg-neutral-600" />
              LGW N - Gatwick North
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-neutral-400 focus:bg-white/[0.05] focus:text-white">
              <span className="flex size-2 rounded-full bg-neutral-600" />
              LGW S - Gatwick South
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/[0.04]" />
            <div className="px-2 py-1.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">Regional</p>
            </div>
            <DropdownMenuItem className="gap-3 text-neutral-400 focus:bg-white/[0.05] focus:text-white">
              <span className="flex size-2 rounded-full bg-neutral-600" />
              MAN T1 - Manchester Terminal 1
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-neutral-400 focus:bg-white/[0.05] focus:text-white">
              <span className="flex size-2 rounded-full bg-neutral-600" />
              MAN T2 - Manchester Terminal 2
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right section - Time, Search, Actions */}
      <div className="flex items-center gap-3">
        {/* Time Display */}
        <div className="flex items-center gap-4 rounded-xl bg-white/[0.02] px-4 py-2 ring-1 ring-white/[0.06]">
          <div className="flex items-center gap-2 text-neutral-500">
            <Calendar className="size-3.5" strokeWidth={1.5} />
            <span className="text-xs">{currentDate}</span>
          </div>
          <div className="h-4 w-px bg-white/[0.06]" />
          <div className="flex items-center gap-2">
            <Clock className="size-3.5 text-neutral-500" strokeWidth={1.5} />
            <span className="font-mono text-xs font-medium text-white">
              {currentTime}
            </span>
            <span className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-neutral-500 ring-1 ring-white/[0.06]">
              UTC
            </span>
          </div>
        </div>

        {/* Notifications */}
        <Button 
          variant="outline" 
          size="icon" 
          className="relative size-9 rounded-lg border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:bg-white/[0.05] hover:text-white"
        >
          <Bell className="size-4" strokeWidth={1.5} />
          {/* Notification badge */}
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-[#0a0a0c]">
            3
          </span>
        </Button>

        {/* Search */}
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 gap-2 rounded-lg border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200"
        >
          <Search className="size-4" strokeWidth={1.5} />
          <span className="hidden text-xs lg:inline">Search</span>
          <kbd className="ml-1 hidden rounded bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-medium text-neutral-500 ring-1 ring-white/[0.06] lg:inline">
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

        {/* Settings */}
        <Button 
          variant="outline" 
          size="icon" 
          className="size-9 rounded-lg border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200"
        >
          <Settings className="size-4" strokeWidth={1.5} />
        </Button>
      </div>
    </header>
  )
}
