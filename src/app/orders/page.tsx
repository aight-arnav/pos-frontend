"use client";

import { OrderTable } from "@/components/orders/OrderTable";
import { useOrders } from "@/hooks/useOrders";

export default function OrdersPage() {
  const { orders, loading } = useOrders();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Orders
      </h1>

      <OrderTable
        orders={orders}
        loading={loading}
      />
    </div>
  );
}