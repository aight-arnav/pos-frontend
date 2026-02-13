"use client";

import { useState } from "react";
import { OrderTable } from "@/components/orders/OrderTable";
import { useOrders } from "@/hooks/useOrders";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    orders,
    totalOrders,
    ordersLoading,
    generateInvoice,
    searchOrder,
  } = useOrders(page, pageSize);

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-blue-900">
              Orders
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              View and manage customer orders.
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden">
          <OrderTable
            orders={orders}
            totalOrders={totalOrders}
            loading={ordersLoading}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            generateInvoice={generateInvoice}
            searchOrder={searchOrder}
          />
        </div>
      </div>
    </div>
  );
}