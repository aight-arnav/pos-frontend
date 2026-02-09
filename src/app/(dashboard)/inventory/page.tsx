"use client";

import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryUploadDialog } from "@/components/inventory/InventoryUploadDialog";
import { useInventory } from "@/hooks/useInventory";

export default function InventoryPage() {
  const {
    inventory,
    loading,
    uploadTsv,
    updateInventory,
  } = useInventory();

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Inventory
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage product stock and bulk uploads.
            </p>
          </div>

          <InventoryUploadDialog onUpload={uploadTsv} />
        </div>

        {/* Table */}
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