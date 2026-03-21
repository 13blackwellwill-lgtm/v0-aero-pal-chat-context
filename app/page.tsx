// AeroPal - Live Operations Dashboard
// Premium aircraft line maintenance engineering and operations platform

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { FlightsTable } from "@/components/dashboard/flights-table"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { MapPreview } from "@/components/dashboard/map-preview"

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
            {/* Quick Actions Row */}
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

            {/* KPI Metrics */}
            <KpiCards />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
              {/* Left Column - Flights Table */}
              <div className="xl:col-span-8">
                <FlightsTable />
              </div>

              {/* Right Column - Map & Alerts */}
              <div className="flex flex-col gap-5 xl:col-span-4">
                {/* Compact Map Preview */}
                <MapPreview />
                
                {/* Alerts Panel */}
                <div className="h-[380px]">
                  <AlertsPanel />
                </div>
              </div>
            </div>

            {/* Activity Feed - Full Width */}
            <div className="h-[320px]">
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
