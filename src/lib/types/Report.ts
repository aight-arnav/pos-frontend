export interface SalesReportForm {
  startDate: string; // yyyy-mm-dd
  endDate: string;
  clientId?: number;
}

export interface SalesReportData {
  date: string; // yyyy-mm-dd
  clientId: number;

  totalOrders: number;
  totalQuantity: number;
  totalRevenue: number;
}