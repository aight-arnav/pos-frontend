"use client";

import { useState } from "react";
import { ReportsApi } from "@/lib/api/ReportApi";
import { SalesReportData, SalesReportForm } from "@/lib/types/Report";
import toast from "react-hot-toast";

export function useSalesReport() {
  const [data, setData] = useState<SalesReportData[]>([]);
  const [loading, setLoading] = useState(false);

  async function runReport(form: SalesReportForm) {
    setLoading(true);
    try {
      const result = await ReportsApi.getSalesReport(form);
      setData(result);
    } finally {
      setLoading(false);
    }
    toast.success("Report generated");
  }

  return { data, loading, runReport };
}