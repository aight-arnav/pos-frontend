"use client";

import { Column, TableComponent } from "@/components/commons/tables/Table";
import {
  SalesReportData,
  DaySalesData,
  ProductSalesData,
  ReportType,
} from "@/lib/types/Report";

interface Props {
  data: SalesReportData[];
  loading: boolean;
  reportType: ReportType;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function SalesReportTable({
  data,
  loading,
  reportType,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: Props) {
  

  const safeData = Array.isArray(data) ? data : [];

  if (reportType === "DAY") {
    const dayData = safeData as DaySalesData[];

    const columns: Column<DaySalesData>[] = [
      { key: "date", label: "Date" },
      { key: "numberOfOrders", label: "Orders", align: "right" },
      { key: "itemsSold", label: "Items Sold", align: "right" },
      {
        key: "revenue",
        label: "Revenue",
        align: "right",
        render: (row) => `₹ ${row.revenue.toFixed(2)}`,
      },
    ];

    return (
      <TableComponent
        columns={columns}
        data={dayData}
        rowKey="date"
        loading={loading}
        pagination={{
          total,
          page,
          pageSize,
          onPageChange,
          onPageSizeChange: (size) => {
            onPageSizeChange(size);
            onPageChange(1);
          },
        }}
      />
    );
  } else {
    const productData = safeData as ProductSalesData[];
  
    const columns: Column<ProductSalesData>[] = [
      { key: "productName", label: "Product" },
      { key: "quantitySold", label: "Quantity", align: "right" },
      {
        key: "revenue",
        label: "Revenue",
        align: "right",
        render: (row) => `₹ ${row.revenue.toFixed(2)}`,
      },
    ];
  
    return (
      <TableComponent
        columns={columns}
        data={productData}
        rowKey="productName"
        loading={loading}
        pagination={{
          total,
          page,
          pageSize,
          onPageChange,
          onPageSizeChange: (size) => {
            onPageSizeChange(size);
            onPageChange(1);
          },
        }}
      />
    );
  }
}