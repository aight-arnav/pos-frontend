import { ProductData, ProductForm } from "@/lib/types/Product";
import { ApiClient } from "./ApiClient";
import { PagedResponse } from "../types/PagedResponse";

export const ProductApi = {
  getAll: async (page: number = 0, size: number = 10) => {
    const res = await ApiClient.get<PagedResponse<ProductData>>("/products", { params: { page, size }});
    return res.data;
  },

  add: async (form: ProductForm) => {
    const res = await ApiClient.post<ProductData>("/products", form);
    return res.data;
  },

  update: async (id: number, form: ProductForm) => {
    const res = await ApiClient.put<ProductData>(`/products/${id}`, form);
    return res.data;
  }
};