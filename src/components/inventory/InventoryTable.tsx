"use client";

import { TableComponent, Column } from "@/components/commons/tables/Table";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import { InventoryFormDialog } from "@/components/inventory/InventoryFormDialog";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import { Pencil } from "lucide-react";
import TrimLongField from "../commons/TrimLongField";

interface Props {
  inventory: InventoryData[];
  totalInventory: number;
  loading: boolean;
  updateInventory: (productId: number, form: InventoryForm) => Promise<void>;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
  searchInventory: (query: string) => void;
}

export function InventoryTable({
  inventory,
  totalInventory,
  loading,
  updateInventory,
  page,
  pageSize,
  setPage,
  setPageSize,
  searchInventory,
}: Props) {
  const columns: Column<InventoryData>[] = [
    {
      key: "productName",
      label: "Product",
      render: (row) => <TrimLongField viewLength={50} value={row.productName} />,
    },
    { key: "barcode", label: "Barcode" },
    {
      key: "quantity",
      label: "Quantity",
      align: "center",
      render: (row) => `${row.quantity} units`,
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <InventoryFormDialog
          initialData={row}
          onSubmit={async (form) => await updateInventory(row.productId, form)}
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
      data={inventory}
      loading={loading}
      rowKey="productId"
      searchPlaceholder="Search by product name..."
      onSearch={(value) => {
        setPage(1);
        searchInventory(value);
      }}
      pagination={{
        total: totalInventory,
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