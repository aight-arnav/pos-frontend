"use client";

import { useEffect, useState } from "react";
import { InventoryApi } from "@/lib/api/InventoryApi";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import toast from "react-hot-toast";

export function useInventory(page: number, pageSize: number) {
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [totalInventory, setTotalInventory] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchString, setSearchString] = useState("");
  const [debouncedString, setDebouncedString] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedString(searchString), 400);
    return () => clearTimeout(timer);
  }, [searchString]);

  useEffect(() => {
    let cancelled = false;

    async function loadInventory() {
      setLoading(true);
      try {
        const data =
          debouncedString.trim().length > 0
            ? await InventoryApi.search(debouncedString, page - 1, pageSize)
            : await InventoryApi.getAll(page - 1, pageSize);

        if (!cancelled) {
          setInventory(data.content);
          setTotalInventory(data.totalElements);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadInventory();

    return () => {
      cancelled = true;
    };
  }, [page, pageSize, debouncedString]);

  const searchInventory = (value: string) => setSearchString(value);

  const uploadTsv = async (file: File): Promise<void> => {
    await InventoryApi.uploadTsv(file);
    const updated = await InventoryApi.getAll(page - 1, pageSize);
    setInventory(updated.content);
    toast.success("Inventory updated successfully");
  };

  const updateInventory = async (productId: number, form: InventoryForm): Promise<void> => {
    const updated = await InventoryApi.update(productId, form);
    setInventory(prev =>
      prev.map(item => (item.productId === productId ? updated : item))
    );
    toast.success("Inventory updated successfully");
  };

  return {
    inventory,
    totalInventory,
    loading,
    searchInventory,
    uploadTsv,
    updateInventory,
  };
}