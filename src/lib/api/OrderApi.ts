import { InvoiceData } from "../types/Invoice";
import { OrderData, OrderForm } from "../types/Order";
import { ApiClient } from "./ApiClient"

export const OrderApi = {
    getAll: async (page: number = 0, size: number = 10) => {
        const res = await ApiClient.get<OrderData[]>("/orders", { params : { page, size } });
        return res.data;
    },

    getById: async (id: number, page: number = 0, size: number = 10) => {
        const res = await ApiClient.get<OrderData>("/orders", { params: { id, page, size } });
        return res.data;
    },

    create: async (form: OrderForm) => {
        const res = await ApiClient.post<OrderData>("/orders", form);
        return res.data;
    },

    generateInvoice: async (orderId: number) => {
        const res = await ApiClient.post<InvoiceData>(
            `/orders/${orderId}/invoice`
        );

        const base64 = res.data.base64Pdf;
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        return new Blob([bytes], { type: "application/pdf" });
    }
}