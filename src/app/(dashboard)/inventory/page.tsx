"use client";

import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryUploadDialog } from "@/components/inventory/InventoryUploadDialog";
import { useInventory } from "@/hooks/useInventory";

export default function InventoryPage() {
  const { inventory, loading, uploadTsv, updateInventory } = useInventory();

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-blue-900">
              Inventory
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage product stock and bulk uploads.
            </p>
          </div>

          <InventoryUploadDialog onUpload={uploadTsv} />
        </div>

        {/* Table Container */}
        <div className="overflow-hidden">
          <InventoryTable
            inventory={inventory}
            loading={loading}
            onUpdate={updateInventory}
          />
        </div>
      </div>
    </div>
  );
}