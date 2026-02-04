"use client";

import { useState } from "react";
import { TableComponent, Column } from "@/components/commons/tables/Table";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import { InventoryFormDialog } from "./InventoryFormDialog";

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
      align: "right",
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <InventoryFormDialog
          triggerLabel="Edit"
          initialData={row}
          onSubmit={(form) =>
            onUpdate(row.productId, form)
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
      rowKey={"productId"}
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