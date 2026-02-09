"use client";

import { SalesReportFilters } from "@/components/report/SalesReportFilters";
import { SalesReportTable } from "@/components/report/SalesReportTable";
import { useSalesReport } from "@/hooks/useSalesReport";

export default function DashboardPage() {
  const { data, loading, runReport } = useSalesReport();

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            View sales performance and reports.
          </p>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-xl border p-6 space-y-6">
          <h2 className="text-xl font-semibold">
            Sales Report
          </h2>

          <SalesReportFilters onRun={runReport} />

          <SalesReportTable
            data={data}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}