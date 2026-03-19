// AeroPal - Live Operations Dashboard v2
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { FlightsTable } from "@/components/dashboard/flights-table"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0c]">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <QuickActions />
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-600">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Live data
              </div>
            </div>

            {/* KPI Cards */}
            <KpiCards />

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
              {/* Flights Table - Takes 3 columns */}
              <div className="xl:col-span-3">
                <FlightsTable />
              </div>

              {/* Right Sidebar - Alerts & Activity */}
              <div className="flex flex-col gap-5 xl:col-span-1">
                <div className="h-[420px]">
                  <AlertsPanel />
                </div>
                <div className="h-[420px]">
                  <ActivityFeed />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
