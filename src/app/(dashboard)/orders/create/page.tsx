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
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">New Order</h1>
            <p className="text-muted-foreground">
              Scan items and press Enter to continue
            </p>
          </div>

          <Button
            disabled={items.length === 0 || loading}
            onClick={submitOrder}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>

        <CreateOrderTable
          items={items}
          onAdd={addItem}
          onUpdate={updateItem}
          onRemove={removeItem}
        />
      </div>
    </div>
  );
}