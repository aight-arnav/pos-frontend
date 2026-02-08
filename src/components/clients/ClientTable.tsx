"use client";

import { TableComponent, Column } from "@/components/commons/tables/Table";
import { ClientData } from "@/lib/types/Client";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { Pencil } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { OutlineButton } from "../commons/buttons/OutlinedButton";
import { useState } from "react";

export function ClientTable() {
  const { clients, loading, updateClient } = useClients();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: Column<ClientData>[] = [
    {
      key: "serial",
      label: "S.No",
      render: (_, idx) => (page - 1) * pageSize + idx + 1, // ✅ pagination-safe
    },
    {
      key: "clientName",
      label: "Client Name",
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "Asia/Kolkata",
            })
          : "-",
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
            <OutlineButton size="sm">
              <Pencil className="w-4 h-4 mr-1" />
              Edit client
            </OutlineButton>
          }
        />
      ),
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={clients.slice((page - 1) * pageSize, page * pageSize)}
      loading={loading}
      rowKey="id" // ✅ FIX
      searchPlaceholder="Search clients..."
      pagination={{
        total: clients.length || 60, // fallback ok for now
        page,
        pageSize,
        onPageChange: setPage,
        onPageSizeChange: (size) => {
          setPageSize(size);
          setPage(1);
        },
      }}
    />
  );
}