import { ApiClient } from "./ApiClient";
import { SalesReportForm, SalesReportData } from "@/lib/types/Report";

export const ReportsApi = {
  getSalesReport: async (form: SalesReportForm) => {
    const res = await ApiClient.post<SalesReportData[]>(
      "/reports/sales",
      form
    );
    return res.data;
  },
};