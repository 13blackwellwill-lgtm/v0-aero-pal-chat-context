"use client"

// AeroPal sidebar navigation
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
import { useState, useEffect } from "react"

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-white/[0.04] bg-[#08080a]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/[0.04] px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-[0_0_20px_-3px_rgba(14,165,233,0.4)]">
          <Plane className="size-4 text-white" strokeWidth={1.5} />
        </div>
        <span className="text-lg font-semibold tracking-tight text-white/90">
          AeroPal
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navigation.map((group) => (
          <div key={group.name}>
            <h3 className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-600">
              {group.name}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = mounted && pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-white/[0.06] text-white ring-1 ring-white/[0.08]"
                          : "text-neutral-500 hover:bg-white/[0.03] hover:text-neutral-300"
                      )}
                    >
                      {isActive && (
                        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent" />
                      )}
                      <item.icon className="relative size-4 shrink-0" strokeWidth={1.5} />
                      <span className="relative">{item.name}</span>
                      {isActive && (
                        <ChevronRight className="relative ml-auto size-4 text-neutral-500" strokeWidth={1.5} />
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
      <div className="border-t border-white/[0.04] p-3">
        <div className="group flex items-center gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5 ring-1 ring-white/[0.04] transition-all duration-300 hover:bg-white/[0.04] hover:ring-white/[0.08]">
          <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 ring-1 ring-white/[0.06]">
            <span className="text-xs font-medium text-white/80">JD</span>
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium text-neutral-200">
              J. Davidson
            </p>
            <p className="truncate text-[10px] uppercase tracking-wider text-neutral-600">
              Duty Engineer
            </p>
          </div>
          <div className="flex gap-0.5">
            <button className="rounded-lg p-2 text-neutral-600 transition-all duration-200 hover:bg-white/[0.05] hover:text-neutral-300">
              <Bell className="size-4" strokeWidth={1.5} />
            </button>
            <button className="rounded-lg p-2 text-neutral-600 transition-all duration-200 hover:bg-white/[0.05] hover:text-neutral-300">
              <Settings className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
