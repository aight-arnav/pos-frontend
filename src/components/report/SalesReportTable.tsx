"use client";

import { useState } from "react";
import { Column, TableComponent } from "@/components/commons/tables/Table";
import { SalesReportData } from "@/lib/types/Report";

interface Props {
  data: SalesReportData[];
  loading: boolean;
}

export function SalesReportTable({ data, loading }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: Column<SalesReportData>[] = [
    {
      key: "date",
      label: "Date",
    },
    {
      key: "clientId",
      label: "Client ID",
      align: "right",
      render: (row) => 
        row.clientId ? `${row.clientId}` : "All clients"
    },
    {
      key: "totalOrders",
      label: "Orders",
      align: "right",
    },
    {
      key: "totalQuantity",
      label: "Quantity",
      align: "right",
    },
    {
      key: "totalRevenue",
      label: "Revenue",
      align: "right",
      render: (row) => `₹ ${row.totalRevenue.toFixed(2)}`,
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={data.slice(
        (page - 1) * pageSize,
        page * pageSize
      )}
      rowKey="date"
      loading={loading}
      searchPlaceholder="Search report..."
      pagination={{
        total: data.length,
        page,
        pageSize,
        label: "rows",
        onPageChange: setPage,
        onPageSizeChange: (size) => {
          setPageSize(size);
          setPage(1);
        },
      }}
    />
  );
}