export interface Client {
  id: number;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface ClientForm {
  clientName: string;
}
