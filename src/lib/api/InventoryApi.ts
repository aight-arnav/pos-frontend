import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import { ApiClient, MultipartApiClient } from "./ApiClient";

export const InventoryApi = {
  getAll: async (page: number = 0, size: number = 10) => {
    const res = await ApiClient.get<InventoryData[]>(
      "/inventory",
      { params: { page, size } }
    );
    return res.data;
  },

  update: async (productId: number, form: InventoryForm) => {
    const res = await ApiClient.put<InventoryData>(
      `/inventory/${productId}`,
      form
    );
    return res.data;
  },

  uploadTsv: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await MultipartApiClient.post<InventoryData[]>(
      "/inventory/bulk",
      formData
    );
    return res.data;
  },
};