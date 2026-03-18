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
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Live Operations
          </h1>
          <p className="text-sm text-muted-foreground">
            Heathrow Terminal 5 (LHR T5)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Time Display */}
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="size-4" />
            <span className="text-sm">{currentDate}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <span className="font-mono text-sm font-medium text-foreground">
              {currentTime}
            </span>
            <span className="text-xs text-muted-foreground">UTC</span>
          </div>
        </div>

        {/* Station Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              LHR T5
              <ChevronDown className="size-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>LHR T5 - Heathrow Terminal 5</DropdownMenuItem>
            <DropdownMenuItem>LGW N - Gatwick North</DropdownMenuItem>
            <DropdownMenuItem>LGW S - Gatwick South</DropdownMenuItem>
            <DropdownMenuItem>MAN T1 - Manchester Terminal 1</DropdownMenuItem>
            <DropdownMenuItem>MAN T2 - Manchester Terminal 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search */}
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="size-4" />
          <span className="hidden lg:inline">Search</span>
          <kbd className="ml-2 hidden rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground lg:inline">
            /
          </kbd>
        </Button>

        {/* Refresh */}
        <Button variant="outline" size="icon" className="size-9">
          <RefreshCw className="size-4" />
        </Button>
      </div>
    </header>
  )
}
