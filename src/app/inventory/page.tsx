"use client";

import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryUpload } from "@/components/inventory/InventoryUpload";
import { useInventory } from "@/hooks/useInventory";

export default function InventoryPage() {
  const {
    inventory,
    loading,
    uploadTsv,
    updateInventory,
  } = useInventory();

  return (
    <div className="p-6 space-y-6">
      <InventoryUpload onUpload={uploadTsv} />

      <InventoryTable
        inventory={inventory}
        loading={loading}
        onUpdate={updateInventory}
      />
    </div>
  );
}