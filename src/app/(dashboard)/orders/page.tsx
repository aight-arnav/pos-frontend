"use client";

import { OrderTable } from "@/components/orders/OrderTable";
import { useOrders } from "@/hooks/useOrders";

export default function OrdersPage() {
  const { orders, ordersLoading } = useOrders();

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Orders
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage customer orders.
          </p>
        </div>

        {/* Table */}
        <OrderTable
          orders={orders}
          loading={ordersLoading}
        />
      </div>
    </div>
  );
}