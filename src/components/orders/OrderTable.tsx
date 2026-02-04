"use client";

import { useState } from "react";
import { TableComponent, Column } from "@/components/commons/tables/Table";
import { OrderData } from "@/lib/types/Order";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { formatIST } from "@/lib/utils/date";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import { Eye } from "lucide-react";

interface Props {
  orders: OrderData[];
  loading: boolean;
}

export function OrderTable({ orders, loading }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: Column<OrderData>[] = [
    {
      key: "id",
      label: "Order ID",
      render: (row) => `#${row.id}`,
    },
    {
      key: "items",
      label: "Items",
      render: () => "—", // placeholder until backend provides count
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (row) => formatIST(row.createdAt),
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <OrderDetailsDialog
          orderId={row.id}
        />
      ),
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={orders.slice((page - 1) * pageSize, page * pageSize)}
      loading={loading}
      rowKey="id"
      searchPlaceholder="Search orders..."
      pagination={{
        total: orders.length || 50, // dummy fallback
        page,
        pageSize,
        label: "orders",
        onPageChange: setPage,
        onPageSizeChange: (size) => {
          setPageSize(size);
          setPage(1);
        },
      }}
    />
  );
}