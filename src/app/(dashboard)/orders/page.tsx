"use client";

import { OrderTable } from "@/components/orders/OrderTable";

export default function OrdersPage() {

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
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

        {/* Table Container */}
        <div className="overflow-hidden">
          <OrderTable />
        </div>
      </div>
    </div>
  );
}