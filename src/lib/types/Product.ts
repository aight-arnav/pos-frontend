import { AuditedData } from "@/lib/types/AuditedData";

export interface ProductData extends AuditedData {
  id: number;
  barcode: string;
  clientId: number;
  clientName: string;
  productName: string;
  mrp: number;
  imageUrl?: string;
}

export interface ProductForm {
  clientId: number;
  barcode: string;
  productName: string;
  mrp: number;
  imageUrl?: string;
}