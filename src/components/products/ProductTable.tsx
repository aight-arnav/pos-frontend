"use client";

import { useState } from "react";
import { TableComponent, Column } from "@/components/commons/tables/Table";
import { ProductData, ProductForm } from "@/lib/types/Product";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";

interface Props {
  products: ProductData[];
  loading: boolean;
  onUpdate: (id: number, form: ProductForm) => Promise<void>;
}

export function ProductTable({ products, loading, onUpdate }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: Column<ProductData>[] = [
    {
      key: "productName",
      label: "Product",
    },
    {
      key: "barcode",
      label: "Barcode",
    },
    {
      key: "mrp",
      label: "MRP",
      align: "right",
      render: (row) => `₹ ${row.mrp.toFixed(2)}`,
    },
    {
      key: "clientId",
      label: "Client",
      align: "right",
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <ProductFormDialog
          triggerLabel="Edit"
          initialData={row}
          onSubmit={(form) => onUpdate(row.id, form)}
        />
      ),
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={products.slice(
        (page - 1) * pageSize,
        page * pageSize
      )}
      loading={loading}
      rowKey={"id"}
      searchPlaceholder="Search products..."
      pagination={{
        total: products.length,
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