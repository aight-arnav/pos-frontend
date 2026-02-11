"use client";

import { useState } from "react";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryUploadDialog } from "@/components/inventory/InventoryUploadDialog";
import { useInventory } from "@/hooks/useInventory";

export default function InventoryPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const inventoryState = useInventory(page, pageSize);

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-blue-900">
              Inventory
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage product stock and bulk uploads.
            </p>
          </div>

          <InventoryUploadDialog
            uploadTsv={inventoryState.uploadTsv}
          />
        </div>

        <div className="overflow-hidden">
          <InventoryTable
            {...inventoryState}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}