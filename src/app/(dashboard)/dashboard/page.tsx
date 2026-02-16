"use client";

import { useState } from "react";
import { SalesReportFilters } from "@/components/report/SalesReportFilters";
import { SalesReportTable } from "@/components/report/SalesReportTable";
import { SalesReportStats } from "@/components/report/SalesReportStats";
import { useSalesReport } from "@/hooks/useSalesReport";
import { ReportType, SalesReportForm } from "@/lib/types/Report";

export default function DashboardPage() {
  const {
    dayData,
    productData,
    stats,
    loading,
    runReport,
    page,
    pageSize,
    total,
    setPage,
    setPageSize,
  } = useSalesReport();
  const [selectedReportType, setSelectedReportType] = useState<ReportType>(
    "DAY"
  );

  function handleRunReport(form: SalesReportForm) {
    setSelectedReportType(form.reportType);
    setPage(1);
    runReport(form);
  }

  const tableData =
    selectedReportType === "DAY" ? dayData : productData;

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <h1 className="text-2xl font-semibold text-blue-900">Dashboard</h1>

        <SalesReportFilters onRun={handleRunReport} />

        <SalesReportStats stats={stats} />

        <SalesReportTable
          data={tableData}
          loading={loading}
          reportType={selectedReportType}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}