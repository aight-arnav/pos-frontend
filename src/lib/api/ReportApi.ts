import { ApiClient } from "./ApiClient";
import {
  SalesReportForm,
  DaySalesData,
  ProductSalesData,
  DaySalesStatData,
  ProductSalesStatData,
} from "@/lib/types/Report";
import { PagedResponse } from "../types/PagedResponse";

export const ReportApi = {
  getReportData: async (form: SalesReportForm, page: number = 0, size: number = 10) => {
    const base =
      form.reportType === "DAY"
        ? "/reports/day"
        : "/reports/product";

    const res = await ApiClient.post<
      PagedResponse<DaySalesData | ProductSalesData>
    >(base, { ...form, page, size });

    console.log(res.data);
    return res.data;
  },
  
  getReportStats: async (form: SalesReportForm) => {
    const base =
    form.reportType === "DAY"
    ? "/reports/day/stats"
    : "/reports/product/stats";
    
    const res = await ApiClient.post<
    DaySalesStatData | ProductSalesStatData
    >(base, form);
    
    console.log(res.data);
    return res.data;
  },
};