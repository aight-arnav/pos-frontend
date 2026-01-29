import { AuditedData } from "@/lib/types/AuditedData";

export interface ClientData extends AuditedData {
  id: number;
  clientName: string;
}

export interface ClientForm {
  clientName: string;
}