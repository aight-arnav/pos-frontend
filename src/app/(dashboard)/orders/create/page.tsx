"use client";

import { Button } from "@/components/ui/button";
import { useOrderCreation } from "@/hooks/useOrderCreation";
import { CreateOrderTable } from "@/components/orders/CreateOrderTable";

export default function CreateOrderPage() {
  const {
    items,
    loading,
    addItem,
    updateItem,
    removeItem,
    submitOrder,
  } = useOrderCreation();

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
              New Order
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Scan items and press Enter to continue.
            </p>
          </div>

          <Button
            disabled={items.length === 0 || loading}
            onClick={submitOrder}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <CreateOrderTable
            items={items}
            onAdd={addItem}
            onUpdate={updateItem}
            onRemove={removeItem}
          />
        </div>
      </div>
    </div>
  );
}