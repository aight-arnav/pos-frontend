"use client";

import { OrderTable } from "@/components/orders/OrderTable";
import { useOrders } from "@/hooks/useOrders";

export default function OrdersPage() {
  const { orders, ordersLoading } = useOrders();

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            Orders
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            View and manage customer orders.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden">
          <OrderTable
            orders={orders}
            loading={ordersLoading}
          />
        </div>
      </div>
    </div>
  );
}