"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Search,
  FileText,
  CreditCard,
  Bell,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Plus,
  Command,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const MAIN_NAV = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    subItems: [
      { name: "Project", href: "/project" },
      { name: "Revenue", href: "/revenue" },
      { name: "Insights", href: "/insights" },
    ],
  },
  { name: "Contracts", href: "/contracts", icon: FileText },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Notification", href: "/notifications", icon: Bell },
]

const MESSAGES = [
  { name: "Esther Howard", avatar: "EH", color: "bg-amber-600" },
  { name: "Jacob Jones", avatar: "JJ", color: "bg-rose-600" },
  { name: "Cody Fisher", avatar: "CF", color: "bg-emerald-600" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>("Dashboard")

  return (
    <aside
      className={cn(
        "group/sidebar relative flex h-screen shrink-0 flex-col overflow-hidden rounded-r-[24px] bg-white/[0.015] ring-1 ring-white/[0.04] transition-all duration-500 ease-out",
        isCollapsed ? "w-24" : "w-72"
      )}
    >
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-50" />
      {/* Inset shadow */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-r-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />

      {/* Logo Header */}
      <div className="relative z-10 flex h-24 items-center justify-between px-6">
        <div className="flex size-14 items-center justify-center rounded-[20px] bg-white/[0.03] ring-1 ring-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] transition-all duration-500 hover:bg-white/[0.05] hover:ring-white/[0.1]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-7 text-neutral-300"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="flex size-9 items-center justify-center rounded-xl bg-white/[0.03] text-neutral-500 ring-1 ring-white/[0.06] transition-all duration-500 hover:bg-white/[0.06] hover:text-neutral-300 hover:ring-white/[0.1]"
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </button>
        )}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute -right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.06] text-neutral-400 ring-1 ring-white/[0.1] transition-all duration-500 hover:bg-white/[0.1] hover:text-white"
          >
            <ChevronRight className="size-3" strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative z-10 px-5 py-3">
        {isCollapsed ? (
          <div className="flex size-14 items-center justify-center rounded-[18px] bg-white/[0.03] text-neutral-500 ring-1 ring-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] transition-all duration-500 hover:bg-white/[0.05] hover:text-neutral-300 hover:ring-white/[0.1]">
            <Search className="size-5" strokeWidth={1.8} />
          </div>
        ) : (
          <div className="flex h-12 items-center gap-3.5 rounded-[18px] bg-white/[0.03] px-4 ring-1 ring-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] transition-all duration-500 hover:bg-white/[0.05] hover:ring-white/[0.1]">
            <Search className="size-4 text-neutral-500" strokeWidth={2} />
            <span className="flex-1 text-sm text-neutral-500">Search</span>
            <div className="flex items-center gap-1.5">
              <kbd className="flex size-6 items-center justify-center rounded-lg bg-white/[0.06] text-[10px] font-medium text-neutral-400 ring-1 ring-white/[0.08]">
                <Command className="size-3" />
              </kbd>
              <kbd className="flex size-6 items-center justify-center rounded-lg bg-white/[0.06] text-[10px] font-medium text-neutral-400 ring-1 ring-white/[0.08]">
                S
              </kbd>
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-5 py-5">
        <div className="mb-6">
          <h3 className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500/90 leading-relaxed">
            {isCollapsed ? "" : "Main"}
          </h3>
          <ul className="space-y-1.5">
            {MAIN_NAV.map((item) => {
              const isActive = pathname === item.href || item.subItems?.some(sub => pathname === sub.href)
              const isExpanded = expandedItem === item.name
              const LinkIcon = item.icon

              return (
                <li key={item.href}>
                  {isCollapsed ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex size-14 items-center justify-center rounded-[18px] transition-all duration-500",
                        isActive
                          ? "bg-white/[0.06] text-white ring-1 ring-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                          : "text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-300 hover:ring-1 hover:ring-white/[0.08]"
                      )}
                    >
                      <LinkIcon className="size-5" strokeWidth={1.8} />
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          if (item.subItems) {
                            setExpandedItem(isExpanded ? null : item.name)
                          }
                        }}
                        className={cn(
                          "group flex w-full items-center gap-3.5 rounded-[16px] px-4 py-3 text-sm font-semibold transition-all duration-500",
                          isActive
                            ? "bg-white/[0.08] text-white ring-1 ring-white/[0.12] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.06)]"
                            : "text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-100 hover:ring-1 hover:ring-white/[0.1] hover:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1)]"
                        )}
                      >
                        <LinkIcon className="size-5 shrink-0" strokeWidth={2} />
                        <span className="flex-1 text-left leading-snug">{item.name}</span>
                        {item.subItems && (
                          <ChevronDown
                            className={cn(
                              "size-4 text-neutral-500 transition-transform duration-500",
                              isExpanded && "rotate-180"
                            )}
                            strokeWidth={2}
                          />
                        )}
                      </button>

                      {/* Sub Items */}
                      {item.subItems && isExpanded && (
                        <ul className="relative ml-7 mt-2 space-y-1 border-l border-white/[0.06] pl-5">
                          {item.subItems.map((subItem) => {
                            const isSubActive = pathname === subItem.href

                            return (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    "block rounded-[12px] px-4 py-2.5 text-sm font-medium leading-snug transition-all duration-500",
                                    isSubActive
                                      ? "bg-white/[0.08] font-semibold text-white ring-1 ring-white/[0.12] shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1)]"
                                      : "text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-300 hover:ring-1 hover:ring-white/[0.08]"
                                  )}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Messages Section */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between px-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500/90 leading-relaxed">
              {isCollapsed ? "" : "Messages"}
            </h3>
            {!isCollapsed && (
              <button className="flex size-6 items-center justify-center rounded-lg bg-white/[0.03] text-neutral-500 ring-1 ring-white/[0.06] transition-all duration-500 hover:bg-white/[0.06] hover:text-white hover:ring-white/[0.1]">
                <Plus className="size-3.5" strokeWidth={2} />
              </button>
            )}
          </div>
          <ul className="space-y-1.5">
            {MESSAGES.map((message) => (
              <li key={message.name}>
                {isCollapsed ? (
                  <div className="flex size-14 items-center justify-center">
                    <div
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full text-[10px] font-semibold text-white ring-1 ring-white/[0.1] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]",
                        message.color
                      )}
                    >
                      {message.avatar}
                    </div>
                  </div>
                ) : (
                  <Link
                    href="#"
                    className="flex items-center gap-3.5 rounded-[16px] px-4 py-2.5 text-sm font-medium text-neutral-400 transition-all duration-500 hover:bg-white/[0.05] hover:text-neutral-100 hover:ring-1 hover:ring-white/[0.1] hover:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1)]"
                  >
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ring-1 ring-white/[0.15] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]",
                        message.color
                      )}
                    >
                      {message.avatar}
                    </div>
                    <span className="leading-snug">{message.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="relative z-10 px-5 py-5">
        {isCollapsed ? (
          <div className="flex size-14 items-center justify-center">
            <div className="size-11 overflow-hidden rounded-full bg-neutral-700 ring-1 ring-white/[0.1] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)]">
              <div className="flex size-full items-center justify-center text-xs font-semibold text-white">
                JD
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 rounded-[20px] bg-white/[0.04] px-5 py-4 ring-1 ring-white/[0.08] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.04)] transition-all duration-500 hover:bg-white/[0.07] hover:ring-white/[0.12] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)]">
            <div className="size-11 overflow-hidden rounded-full bg-gradient-to-br from-neutral-600 to-neutral-800 ring-1 ring-white/[0.12] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <div className="flex size-full items-center justify-center text-xs font-bold text-white">
                JD
              </div>
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-semibold leading-snug text-white">John Doe</p>
              <p className="truncate text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500/90">
                Designer
              </p>
            </div>
            <ChevronDown className="size-4 text-neutral-500/80 transition-transform duration-500 group-hover:text-neutral-400" strokeWidth={2} />
          </div>
        )}
      </div>
    </aside>
  )
}
