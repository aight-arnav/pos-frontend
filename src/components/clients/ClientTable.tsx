"use client";

import { TableComponent, Column } from "@/components/commons/tables/Table";
import { ClientData, ClientForm } from "@/lib/types/Client";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { useAuth } from "@/context/AuthContext";
import { Pencil } from "lucide-react";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import TrimLongField from "@/components/commons/TrimLongField";

interface Props {
  clients: ClientData[];
  totalClients: number;
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
  updateClient: (id: number, form: ClientForm) => void;
  searchClients: (query: string) => void;
}

export function ClientTable({
  clients,
  totalClients,
  loading,
  page,
  pageSize,
  setPage,
  setPageSize,
  updateClient,
  searchClients,
}: Props) {
  const { user } = useAuth();
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
      render: (row) =>
        user?.role === "OPERATOR" ? null : (
          <ClientFormDialog
            initialData={row}
            onSubmit={async (form) => updateClient(row.id, form)}
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