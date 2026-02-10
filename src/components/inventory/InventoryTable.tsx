"use client";

import { useState } from "react";
import { TableComponent, Column } from "@/components/commons/tables/Table";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import { InventoryFormDialog } from "@/components/inventory/InventoryFormDialog";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import { Pencil } from "lucide-react";

interface Props {
  inventory: InventoryData[];
  loading: boolean;
  onUpdate: (productId: number, form: InventoryForm) => Promise<void>;
}

export function InventoryTable({ inventory, loading, onUpdate }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: Column<InventoryData>[] = [
    {
      key: "productName",
      label: "Product",
    },
    {
      key: "barcode",
      label: "Barcode",
    },
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
          onSubmit={(form) =>
            onUpdate(row.productId, form)
          }
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
      data={inventory.slice(
        (page - 1) * pageSize,
        page * pageSize
      )}
      loading={loading}
      rowKey="productId"
      searchPlaceholder="Search inventory..."
      pagination={{
        total: inventory.length,
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