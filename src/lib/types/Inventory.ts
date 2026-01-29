export interface InventoryData {
  productId: number;
  clientName: string;
  productName: string;
  barcode: string;
  mrp: number;
  quantity: number;
  imageUrl?: string;
}

export interface InventoryForm {
  barcode: string;
  quantity: number;
}