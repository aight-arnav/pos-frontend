import { OrderData, OrderForm } from "../types/Order";
import { ApiClient } from "./ApiClient"

export const OrderApi = {
    getAll: async (page: number = 0, size: number = 10) => {
        const res = await ApiClient.get<OrderData[]>("/orders", { params : { page, size } });
        console.log(res.data);
        
        return res.data;
    },

    getById: async (id: number, page: number = 0, size: number = 10) => {
        const res = await ApiClient.get<OrderData>("/orders", { params: { id, page, size } });
        return res.data;
    },

    create: async (form: OrderForm) => {
        const res = await ApiClient.post<OrderData>("/orders", form);
        return res.data;
    }
}