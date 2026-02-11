"use client";

import { useEffect, useState } from "react";
import { InventoryApi } from "@/lib/api/InventoryApi";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import toast from "react-hot-toast";

export function useInventory(page: number, pageSize: number) {
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [totalInventory, setTotalInventory] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await InventoryApi.getAll(page - 1, pageSize);
        setInventory(data.content);
        setTotalInventory(data.totalElements);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, pageSize]);

  const uploadTsv = async (file: File) => {
    await InventoryApi.uploadTsv(file);
    const inventoryAfterUpdation = await InventoryApi.getAll(page - 1, pageSize);
    setInventory(inventoryAfterUpdation.content);
    toast.success("Inventory updated successfully");
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
    toast.success("Inventory updated successfully");
  };

  return {
    inventory,
    totalInventory,
    loading,
    uploadTsv,
    updateInventory,
  };
}