"use client";

import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { useClients } from "@/hooks/useClients";
import { Plus } from "lucide-react";

export function AddClientDialog() {
  const { addClient } = useClients();

  return (
    <ClientFormDialog
      onSubmit={addClient}
      trigger={
        <PrimaryButton className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          Add Client
        </PrimaryButton>
      }
    />
  );
}