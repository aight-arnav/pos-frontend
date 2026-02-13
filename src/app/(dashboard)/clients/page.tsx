"use client";

import { ClientTable } from "@/components/clients/ClientTable";
import { AddClientDialog } from "@/components/clients/AddClientDialog";
import { useClients } from "@/hooks/useClients";
import { useState } from "react";

export default function ClientsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { clients, totalClients, loading, addClient, updateClient, searchClients } =
    useClients(page, pageSize);

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-blue-900">
              Clients
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage your client master data.
            </p>
          </div>
          <AddClientDialog addClient={addClient} />
        </div>

        {/* Table */}
        <ClientTable
          clients={clients}
          totalClients={totalClients}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          updateClient={updateClient}
          searchClients={searchClients}
        />
      </div>
    </div>
  );
}