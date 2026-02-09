"use client";

import { SalesReportFilters } from "@/components/report/SalesReportFilters";
import { SalesReportTable } from "@/components/report/SalesReportTable";
import { useSalesReport } from "@/hooks/useSalesReport";

export default function DashboardPage() {
  const { data, loading, runReport } = useSalesReport();

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            View sales performance and reports.
          </p>
        </div>

        {/* Filters */}
        <SalesReportFilters onRun={runReport} />

        {/* Table */}
        <div className="overflow-hidden">
          <SalesReportTable
            data={data}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}