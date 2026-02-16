export type ReportType = "DAY" | "PRODUCT";

export interface SalesReportForm {
  startDate: string;
  endDate: string;
  clientName?: string;
  reportType: ReportType;
}

/* ----------- DAY REPORT ----------- */

export interface DaySalesData {
  date: string;
  numberOfOrders: number;
  itemsSold: number;
  revenue: number;
}

export interface DaySalesStatData {
  totalDays: number;
  totalOrders: number;
  totalItemsSold: number;
  totalRevenue: number;
  avgDailyRevenue: number;
}

/* ----------- PRODUCT REPORT ----------- */

export interface ProductSalesData {
  productName: string;
  quantitySold: number;
  revenue: number;
}

export interface ProductSalesStatData {
  totalProducts: number;
  totalQuantitySold: number;
  totalRevenue: number;
}

/* ----------- RESPONSE UNION ----------- */

export type SalesReportData = DaySalesData | ProductSalesData;

export type SalesReportStats =
  | DaySalesStatData
  | ProductSalesStatData;