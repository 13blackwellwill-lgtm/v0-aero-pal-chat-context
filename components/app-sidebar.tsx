"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  Calendar,
  Plane,
  Users,
  AlertTriangle,
  Wrench,
  FileText,
  Settings,
  Bell,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  {
    name: "Operations",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Live Map", href: "/map", icon: Map },
      { name: "Schedule", href: "/schedule", icon: Calendar },
    ],
  },
  {
    name: "Fleet",
    items: [
      { name: "Aircraft", href: "/aircraft", icon: Plane },
      { name: "Defects", href: "/defects", icon: AlertTriangle },
      { name: "Maintenance", href: "/maintenance", icon: Wrench },
    ],
  },
  {
    name: "Resources",
    items: [
      { name: "Engineers", href: "/engineers", icon: Users },
      { name: "Reports", href: "/reports", icon: FileText },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-info">
          <Plane className="size-4 text-info-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-sidebar-foreground">
          AeroPal
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navigation.map((group) => (
          <div key={group.name}>
            <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {group.name}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.name}</span>
                      {isActive && (
                        <ChevronRight className="ml-auto size-4 opacity-50" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent">
            <span className="text-xs font-medium text-sidebar-foreground">JD</span>
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              J. Davidson
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Duty Engineer
            </p>
          </div>
          <div className="flex gap-1">
            <button className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">
              <Bell className="size-4" />
            </button>
            <button className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">
              <Settings className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
