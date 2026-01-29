"use client";

import { OrderItemsTable } from "@/components/orders/OrderItemsTable";
import { AddOrderItemDialog } from "@/components/orders/AddOrderItemDialog";
import { Button } from "@/components/ui/button";
import { useOrderCreation } from "@/hooks/useOrderCreation";

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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Create Order
        </h1>

        <AddOrderItemDialog onAdd={addItem} />
      </div>

      <OrderItemsTable
        items={items}
        onUpdate={updateItem}
        onRemove={removeItem}
      />

      <div className="flex justify-end">
        <Button
          disabled={items.length === 0 || loading}
          onClick={submitOrder}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}