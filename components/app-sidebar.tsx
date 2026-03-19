"use client"

// AeroPal sidebar navigation - modern premium design
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
    <aside className="flex h-screen w-64 flex-col border-r border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-black/20 backdrop-blur-sm">
      {/* Logo Section */}
      <div className="flex h-20 items-center gap-4 border-b border-white/[0.06] px-6 shadow-[inset_0_-1px_0_rgba(255,255,255,0.03)]">
        <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 shadow-[0_0_24px_-4px_rgba(14,165,233,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <Plane className="size-5 text-white" strokeWidth={1.8} />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white leading-none">
            AeroPal
          </span>
          <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium mt-1">
            Operations
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
        {navigation.map((group) => (
          <div key={group.name}>
            <h3 className="mb-4 px-4 text-[9px] font-bold uppercase tracking-wider text-neutral-500/80 leading-tight">
              {group.name}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ease-out",
                      pathname === item.href
                        ? "bg-white/[0.08] text-white ring-1 ring-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_16px_-4px_rgba(0,0,0,0.3)]"
                        : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-100 hover:ring-1 hover:ring-white/[0.08]"
                    )}
                  >
                    {pathname === item.href && (
                      <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-white/[0.08] to-transparent" />
                    )}
                    <item.icon className="relative size-4.5 shrink-0 text-neutral-400 group-hover:text-neutral-200 transition-colors" strokeWidth={1.6} />
                    <span className="relative flex-1">{item.name}</span>
                    {pathname === item.href && (
                      <ChevronRight className="relative ml-auto size-4 text-sky-400/60" strokeWidth={2} />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-white/[0.06] bg-gradient-to-t from-white/[0.02] to-transparent px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="group flex items-center gap-3 rounded-lg bg-white/[0.03] px-4 py-3.5 ring-1 ring-white/[0.06] transition-all duration-300 hover:bg-white/[0.06] hover:ring-white/[0.1] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_16px_-4px_rgba(0,0,0,0.2)]">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-600 to-neutral-800 ring-1 ring-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
            <span className="text-xs font-bold text-white/90">JD</span>
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-semibold text-neutral-100 leading-tight">
              J. Davidson
            </p>
            <p className="truncate text-[9px] uppercase tracking-wider text-neutral-500/80 font-medium mt-1">
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
