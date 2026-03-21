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
import Image from "next/image"

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
        "flex h-screen shrink-0 flex-col bg-[#1a1a1a] transition-all duration-300 ease-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Header */}
      <div className="relative flex h-20 items-center justify-between px-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-[#2a2a2a]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-6 text-white"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="flex size-8 items-center justify-center rounded-lg bg-[#2a2a2a] text-neutral-400 transition-colors hover:text-white"
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </button>
        )}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute -right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#2a2a2a] text-neutral-400 transition-colors hover:text-white"
          >
            <ChevronRight className="size-3" strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2">
        {isCollapsed ? (
          <div className="flex size-12 items-center justify-center rounded-xl bg-[#252525] text-neutral-500">
            <Search className="size-4" strokeWidth={2} />
          </div>
        ) : (
          <div className="flex h-11 items-center gap-3 rounded-xl bg-[#252525] px-4">
            <Search className="size-4 text-neutral-500" strokeWidth={2} />
            <span className="flex-1 text-sm text-neutral-500">Search</span>
            <div className="flex items-center gap-1">
              <kbd className="flex size-6 items-center justify-center rounded bg-[#333] text-[10px] font-medium text-neutral-400">
                <Command className="size-3" />
              </kbd>
              <kbd className="flex size-6 items-center justify-center rounded bg-[#333] text-[10px] font-medium text-neutral-400">
                S
              </kbd>
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4">
          <h3 className="mb-3 px-3 text-[11px] font-medium uppercase tracking-wider text-neutral-500">
            {isCollapsed ? "" : "Main"}
          </h3>
          <ul className="space-y-1">
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
                        "flex size-12 items-center justify-center rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-[#252525] text-white"
                          : "text-neutral-500 hover:bg-[#252525] hover:text-white"
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
                          "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-[#252525] text-white"
                            : "text-neutral-400 hover:bg-[#252525] hover:text-white"
                        )}
                      >
                        <LinkIcon className="size-5 shrink-0" strokeWidth={1.8} />
                        <span className="flex-1 text-left">{item.name}</span>
                        {item.subItems && (
                          <ChevronDown
                            className={cn(
                              "size-4 text-neutral-500 transition-transform duration-200",
                              isExpanded && "rotate-180"
                            )}
                            strokeWidth={2}
                          />
                        )}
                      </button>

                      {/* Sub Items */}
                      {item.subItems && isExpanded && (
                        <ul className="relative ml-6 mt-1 space-y-0.5 border-l border-neutral-700/50 pl-4">
                          {item.subItems.map((subItem) => {
                            const isSubActive = pathname === subItem.href

                            return (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    "block rounded-lg px-3 py-2 text-sm transition-all duration-200",
                                    isSubActive
                                      ? "bg-[#252525] font-medium text-white"
                                      : "text-neutral-500 hover:bg-[#252525]/50 hover:text-neutral-300"
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
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between px-3">
            <h3 className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
              {isCollapsed ? "" : "Messages"}
            </h3>
            {!isCollapsed && (
              <button className="flex size-5 items-center justify-center rounded text-neutral-500 transition-colors hover:text-white">
                <Plus className="size-3.5" strokeWidth={2} />
              </button>
            )}
          </div>
          <ul className="space-y-1">
            {MESSAGES.map((message) => (
              <li key={message.name}>
                {isCollapsed ? (
                  <div className="flex size-12 items-center justify-center">
                    <div
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-[10px] font-semibold text-white",
                        message.color
                      )}
                    >
                      {message.avatar}
                    </div>
                  </div>
                ) : (
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-neutral-400 transition-all duration-200 hover:bg-[#252525] hover:text-white"
                  >
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white",
                        message.color
                      )}
                    >
                      {message.avatar}
                    </div>
                    <span>{message.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="px-4 py-4">
        {isCollapsed ? (
          <div className="flex size-12 items-center justify-center">
            <div className="size-10 overflow-hidden rounded-full bg-neutral-700">
              <div className="flex size-full items-center justify-center text-xs font-semibold text-white">
                JD
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl bg-[#252525] px-4 py-3">
            <div className="size-10 overflow-hidden rounded-full bg-neutral-600">
              <div className="flex size-full items-center justify-center text-xs font-semibold text-white">
                JD
              </div>
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-white">John Doe</p>
              <p className="truncate text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                Designer
              </p>
            </div>
            <ChevronDown className="size-4 text-neutral-500" strokeWidth={2} />
          </div>
        )}
      </div>
    </aside>
  )
}
