import ApiClient from "@/lib/api/ApiClient";
import { Client, ClientForm } from "@/lib/types/client";

export const ClientApi = {
  getAll: async (): Promise<Client[]> => {
    const res = await ApiClient.get("/clients");
    return res.data;
  },

  add: async (data: ClientForm): Promise<Client> => {
    const res = await ApiClient.post("/clients", data);
    return res.data;
  },

  update: async (id: number, data: ClientForm): Promise<Client> => {
    const res = await ApiClient.put(`/clients/${id}`, data);
    return res.data;
  },
};