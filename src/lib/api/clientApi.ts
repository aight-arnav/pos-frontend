import { ClientData, ClientForm } from "@/lib/types/Client";
import { ApiClient } from "./ApiClient";
import { PagedResponse } from "../types/PagedResponse";

export const ClientApi = {
  getAll: async (page: number = 0, size: number = 10) => {
    const res = await ApiClient.get<PagedResponse<ClientData>>("/clients", { params: { page, size } });
    return res.data;
  },  

  getByName: async (name: string) => {
    const res = await ApiClient.get<ClientData>("/clients", { params: { name } });
    return res.data;
  },

  add: async (form: ClientForm) => {
    const res = await ApiClient.post<ClientData>("/clients", form);
    return res.data;
  },

  update: async (id: number, form: ClientForm) => {
    const res = await ApiClient.put<ClientData>(`/clients/${id}`, form);
    return res.data;
  },

  search: async (name: string, page: number = 0, size: number = 10) => {
    const res = await ApiClient.get<PagedResponse<ClientData>>("/clients/search", { params: { name, page, size } });
    return res.data;
  }
};