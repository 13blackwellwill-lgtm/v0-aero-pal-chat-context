import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { FlightsTable } from "@/components/dashboard/flights-table"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { MapPreview } from "@/components/dashboard/map-preview"
import { UpcomingMaintenance } from "@/components/dashboard/upcoming-maintenance"
import { AOGPanel } from "@/components/dashboard/aog-panel"
import { DefectsPanel } from "@/components/dashboard/defects-panel"
import { TurnaroundChecks } from "@/components/dashboard/turnaround-checks"
import { EngineerOperations } from "@/components/dashboard/engineer-operations"
import { ShiftHandover } from "@/components/dashboard/shift-handover"

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

            {/* Primary Operations Grid - Flights & Map */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              {/* Left: Flights Table */}
              <div className="xl:col-span-2">
                <FlightsTable />
              </div>

              {/* Right: Map Preview */}
              <div className="xl:col-span-1">
                <MapPreview />
              </div>
            </div>

            {/* Maintenance & Operations Grid */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
              {/* Upcoming Maintenance - spans 2 cols on xl */}
              <div className="xl:col-span-2">
                <UpcomingMaintenance />
              </div>

              {/* AOG Events */}
              <div className="xl:col-span-1">
                <AOGPanel />
              </div>

              {/* Engineer Operations */}
              <div className="xl:col-span-1">
                <EngineerOperations />
              </div>
            </div>

            {/* Defects & Turnaround Grid */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {/* Open Defects */}
              <div className="xl:col-span-1">
                <DefectsPanel />
              </div>

              {/* Turnaround Checks */}
              <div className="xl:col-span-1">
                <TurnaroundChecks />
              </div>
            </div>

            {/* Alerts & Shift Handover Grid */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              {/* Alerts Panel */}
              <div className="xl:col-span-1">
                <AlertsPanel />
              </div>

              {/* Shift Handover */}
              <div className="xl:col-span-2">
                <ShiftHandover />
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
