import { AuditedData } from "@/lib/types/AuditedData";

export interface OrderItemData {
  orderId: number;
  productName: string;
  quantity: number;
  sellingPrice: number;
}

export interface OrderItemForm {
  barcode: string;
  quantity: number;
  sellingPrice: number;
}

export interface OrderData extends AuditedData {
  orderItems: OrderItemData[];
}

export interface OrderForm {
  orderItems: OrderItemForm[];
}