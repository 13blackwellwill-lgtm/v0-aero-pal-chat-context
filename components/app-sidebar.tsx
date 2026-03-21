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

const NAV_GROUPS = [
  {
    title: "Operations",
    links: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Live Map", href: "/map", icon: Map },
      { name: "Schedule", href: "/schedule", icon: Calendar },
    ],
  },
  {
    title: "Fleet",
    links: [
      { name: "Aircraft", href: "/aircraft", icon: Plane },
      { name: "Defects", href: "/defects", icon: AlertTriangle },
      { name: "Maintenance", href: "/maintenance", icon: Wrench },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Engineers", href: "/engineers", icon: Users },
      { name: "Reports", href: "/reports", icon: FileText },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-black/20 backdrop-blur-sm">
      {/* Logo Header */}
      <div className="flex h-20 items-center gap-4 border-b border-white/[0.08] px-6 shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 shadow-[0_4px_12px_rgba(14,165,233,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <Plane className="size-5 text-white" strokeWidth={1.8} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold tracking-tight text-white leading-tight">
            AeroPal
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500/90">
            Operations
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3.5 px-4 text-[10px] font-semibold uppercase tracking-widest text-neutral-500/85 leading-relaxed">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link) => {
                const isActive = pathname === link.href
                const LinkIcon = link.icon

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group relative flex items-center gap-3.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-out",
                        isActive
                          ? "bg-white/[0.1] text-white ring-1 ring-white/[0.15] shadow-[0_4px_12px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.08)]"
                          : "text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200 hover:ring-1 hover:ring-white/[0.1] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                      )}
                    >
                      {isActive && (
                        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-white/[0.08] to-transparent" />
                      )}
                      <LinkIcon
                        className="relative size-4.5 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-200"
                        strokeWidth={1.6}
                      />
                      <span className="relative flex-1">{link.name}</span>
                      {isActive && (
                        <ChevronRight className="relative ml-auto size-4 text-sky-400/60" strokeWidth={2} />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="border-t border-white/[0.08] bg-gradient-to-t from-white/[0.02] to-transparent px-4 py-4 shadow-[0_-2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="group flex items-center gap-3 rounded-lg bg-white/[0.04] px-4 py-3 ring-1 ring-white/[0.08] transition-all duration-200 hover:bg-white/[0.07] hover:ring-white/[0.12] hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-600 to-neutral-800 ring-1 ring-white/[0.1] shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.04)]">
            <span className="text-xs font-semibold text-white/95">JD</span>
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-semibold leading-snug text-white">
              J. Davidson
            </p>
            <p className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-wider text-neutral-500/80">
              Duty Engineer
            </p>
          </div>
          <div className="flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button className="rounded-md p-2 text-neutral-500 transition-all duration-200 hover:bg-white/[0.08] hover:text-neutral-200 hover:ring-1 hover:ring-white/[0.1]">
              <Bell className="size-4" strokeWidth={1.6} />
            </button>
            <button className="rounded-md p-2 text-neutral-500 transition-all duration-200 hover:bg-white/[0.08] hover:text-neutral-200 hover:ring-1 hover:ring-white/[0.1]">
              <Settings className="size-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
