"use client";

import { TableComponent, Column } from "@/components/commons/tables/Table";
import { ClientData } from "@/lib/types/Client";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { Pencil } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import { useState } from "react";
import TrimLongField from "../commons/TrimLongField";

export function ClientTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const { clients, totalClients, loading, updateClient, searchClients } = useClients(page, pageSize);

  const columns: Column<ClientData>[] = [
    {
      key: "serial",
      label: "S.No",
      render: (_, idx) => (page - 1) * pageSize + idx + 1,
    },
    {
      key: "clientName",
      label: "Client Name",
      render: (row) => <TrimLongField viewLength={30} value={row.clientName} />,
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
            <OutlineButton
              size="sm"
              className="rounded-sm px-3 text-blue-800 hover:text-blue-900 hover:border-blue-900"
            >
              <Pencil className="mr-1 h-4 w-4" />
              Edit
            </OutlineButton>
          }
        />
      ),
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={clients}
      loading={loading}
      rowKey="id"
      searchPlaceholder="Search clients..."
      onSearch={(value) => {
        setPage(1);
        searchClients(value);
      }}
      pagination={{
        total: totalClients,
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