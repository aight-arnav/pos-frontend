"use client";

import { TableComponent, Column } from "@/components/commons/tables/Table";
import { ClientData } from "@/lib/types/Client";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { Button } from "@/components/ui/button";
import { useClients } from "@/hooks/useClients";
import { OutlineButton } from "../commons/buttons/OutlinedButton";

export function ClientTable() {
  const { clients, loading, updateClient } = useClients();
  const columns: Column<ClientData>[] = [
    {
      key: "serial",
      label: "S.No",
      render: (_, idx) => idx + 1,
      align: "left",
    },
    {
      key: "clientName",
      label: "Client Name",
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (row: ClientData) => row.createdAt ? new Date(row.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }) : "-",
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <ClientFormDialog
          initialData={row}
          onSubmit={(form) => updateClient(row.id, form)}
          trigger={
            <OutlineButton size="sm">Edit</OutlineButton>
          }
        />
      ),
    },
  ];

  return <TableComponent columns={columns} data={clients} loading={loading} searchPlaceholder="Search clients..." />;
}