"use client";

import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { ClientForm } from "@/lib/types/Client";
import { Plus } from "lucide-react";

interface Props {
  addClient: (form: ClientForm) => Promise<void>;
}

export function AddClientDialog({ addClient }: Props) {
  return (
    <ClientFormDialog
      onSubmit={async (form) => await addClient(form)}
      trigger={
        <PrimaryButton className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          Add Client
        </PrimaryButton>
      }
    />
  );
}