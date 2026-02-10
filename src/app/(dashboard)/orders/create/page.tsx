"use client";

import { useOrderCreation } from "@/hooks/useOrderCreation";
import { CreateOrderTable } from "@/components/orders/CreateOrderTable";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { Loader2 } from "lucide-react";

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
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-blue-900">
              New Order
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Scan items and press Enter to continue.
            </p>
          </div>

          <PrimaryButton
            disabled={items.length === 0 || loading}
            onClick={submitOrder}
            className="min-w-40"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Placing Order
              </>
            ) : (
              "Place Order"
            )}
          </PrimaryButton>
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