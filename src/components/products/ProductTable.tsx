"use client";

import { useState } from "react";
import { TableComponent, Column } from "@/components/commons/tables/Table";
import { ProductData } from "@/lib/types/Product";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import { Pencil } from "lucide-react";
import TrimLongField from "../commons/TrimLongField";
import { useProduct } from "@/hooks/useProduct";

export function ProductTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { products, loading, totalProducts, updateProduct } = useProduct(page, pageSize);

  const columns: Column<ProductData>[] = [
    {
      key: "productName",
      label: "Product",
      render: (row) => <TrimLongField viewLength={50} value={row.productName} />,
    },
    {
      key: "barcode",
      label: "Barcode",
    },
    {
      key: "mrp",
      label: "MRP",
      render: (row) => `₹ ${row.mrp.toFixed(2)}`,
    },
    {
      key: "clientId",
      label: "Client",
      align: "center",
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <ProductFormDialog
          initialData={row}
          onSubmit={(form) => updateProduct(row.id, form)}
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
      data={products}
      loading={loading}
      rowKey="id"
      searchPlaceholder="Search products..."
      pagination={{
        total: totalProducts,
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