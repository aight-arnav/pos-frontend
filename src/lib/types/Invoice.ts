export interface InvoiceData {
    orderId: number;
    base64Pdf: string;
}

interface InvoiceItem {
    name: string;
    quantity: number;
    sellingPrice: number;
}

export interface InvoiceForm {
    orderId: number;
    items: InvoiceItem[];
}