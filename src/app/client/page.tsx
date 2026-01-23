"use client";

import { ClientTable } from "@/components/clients/ClientTable";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { useClients } from "@/hooks/useClients";

export default function ClientsPage() {
  const { clients, loading, addClient, updateClient } = useClients();

  if (loading) {
    return <div className="p-6">Loading clients...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Clients</h1>

        <ClientFormDialog
          triggerLabel="Add Client"
          onSubmit={addClient}
        />
      </div>

      <ClientTable clients={clients} onUpdate={updateClient} />
    </div>
  );
}
