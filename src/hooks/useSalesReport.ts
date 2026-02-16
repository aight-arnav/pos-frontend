"use client";

import { useEffect, useState } from "react";
import {
  SalesReportData,
  SalesReportForm,
  SalesReportStats,
  DaySalesData,
  ProductSalesData,
} from "@/lib/types/Report";
import { ReportApi } from "@/lib/api/ReportApi";
import toast from "react-hot-toast";

export function useSalesReport() {
  const [data, setData] = useState<SalesReportData[]>([]);
  const [dayData, setDayData] = useState<DaySalesData[]>([]);
  const [productData, setProductData] = useState<ProductSalesData[]>([]);
  const [stats, setStats] = useState<SalesReportStats | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  
  const [currentForm, setCurrentForm] = useState<SalesReportForm | null>(null);

  // Fetch report data when form or pagination changes
  useEffect(() => {
    if (!currentForm) return;

    async function loadReport() {
      setLoading(true);
      try {
        const form = currentForm!;
        const dataRes = await ReportApi.getReportData(
          form,
          page - 1,
          pageSize
        );
        const statsRes = await ReportApi.getReportStats(form);

        const reportData = dataRes.content;
        setData(reportData);
        setTotal(dataRes.totalElements);

        if (form.reportType === "DAY") {
          setDayData(reportData as DaySalesData[]);
          setProductData([]);
        } else {
          setProductData(reportData as ProductSalesData[]);
          setDayData([]);
        }

        setStats(statsRes);
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast.error(e.message || "Failed to load report");
        }
        setData([]);
        setStats(null);
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, [currentForm, page, pageSize]);

  const runReport = async (form: SalesReportForm): Promise<void> => {
    setPage(1);
    setCurrentForm(form);
  };

  return {
    data,
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
  };
}