"use client";

import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { ClientForm } from "@/lib/types/Client";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Props {
  addClient: (form: ClientForm) => Promise<void>;
}

export function AddClientDialog({ addClient }: Props) {
  const { user } = useAuth();

  // Operators cannot add clients
  if (user?.role === "OPERATOR") return null;
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