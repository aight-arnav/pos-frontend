"use client";

import { TableComponent, Column } from "@/components/commons/tables/Table";
import { OrderData } from "@/lib/types/Order";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import { FileText } from "lucide-react";
import { formatIST } from "@/lib/utils/date";
import TrimLongField from "../commons/TrimLongField";

interface Props {
  orders: OrderData[];
  totalOrders: number;
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
  generateInvoice: (orderId: number) => void;
  searchOrder: (query: string) => void;
}

export function OrderTable({
  orders,
  totalOrders,
  loading,
  page,
  pageSize,
  setPage,
  setPageSize,
  generateInvoice,
  searchOrder,
}: Props) {
  const columns: Column<OrderData>[] = [
    { key: "id", label: "Order ID", render: (row) => `#${row.id}` },
    { key: "createdAt", label: "Created At", render: (row) => formatIST(row.createdAt) },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <OutlineButton
          size="sm"
          className="rounded-sm px-3 text-blue-800 hover:text-blue-900 hover:border-blue-900"
          onClick={() => generateInvoice(row.id)}
        >
          <FileText className="mr-1 h-4 w-4" />
          Download Invoice
        </OutlineButton>
      ),
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={orders}
      loading={loading}
      rowKey="id"
      searchPlaceholder="Search order by id..."
      onSearch={(value) => {
        setPage(1);
        searchOrder(value);
      }}
      pagination={{
        total: totalOrders,
        page,
        pageSize,
        onPageChange: setPage,
        onPageSizeChange: (size) => {
          setPageSize(size);
          setPage(1);
        },
      }}
      expandable={{
        renderExpandedRow: (order) => (
          <div className="rounded-lg border border-stone-200 bg-white p-4">
            <div className="mb-3 text-sm font-semibold text-gray-700">Order Items</div>
            <div className="space-y-2">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-800">
                    <TrimLongField viewLength={50} value={item.productName} />
                  </span>
                  <span className="text-gray-500">
                    {item.quantity} × ₹{item.sellingPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      }}
    />
  );
}