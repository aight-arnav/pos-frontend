"use client";

import { useEffect, useState } from "react";
import { InventoryApi } from "@/lib/api/InventoryApi";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await InventoryApi.getAll();
        setInventory(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const uploadTsv = async (file: File) => {
    await InventoryApi.uploadTsv(file);
    const inventoryAfterUpdation = await InventoryApi.getAll();
    setInventory(inventoryAfterUpdation);
  };

  const updateInventory = async (
    productId: number,
    form: InventoryForm
  ) => {
    const updated = await InventoryApi.update(productId, form);
    setInventory(prev =>
      prev.map(item =>
        item.productId === productId ? updated : item
      )
    );
  };

  return {
    inventory,
    loading,
    uploadTsv,
    updateInventory,
  };
}