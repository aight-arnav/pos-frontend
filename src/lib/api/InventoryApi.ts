import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import { ApiClient, MultipartApiClient } from "./ApiClient";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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

    try {
      const res = await MultipartApiClient.post(
        "/inventory/bulk",
        formData,
        { responseType: "json" }
      );
      return res.data;
    } catch (error: unknown) {
      let response;
      if (error instanceof AxiosError) {
        response = error.response;
      }

      if (
        response?.headers["content-type"]?.includes("text/tab-separated-values")
      ) {
        const blob = new Blob([response.data], {
          type: "text/tab-separated-values",
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "inventory-errors.tsv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        toast.error("Some rows failed. Error file downloaded.");
        return;
      }

      throw error;
    }
  },
};