"use client";

import { ProductTable } from "@/components/products/ProductTable";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";
import { useProduct } from "@/hooks/useProduct";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { products, totalProducts, loading, addProduct, updateProduct, searchProducts } =
    useProduct(page, pageSize);

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-blue-900">
              Products
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage product catalog and pricing.
            </p>
          </div>

          <ProductFormDialog
            onSubmit={async (form) => await addProduct(form)}
            trigger={
              <PrimaryButton className="gap-2 shadow-sm">
                <Plus className="h-4 w-4" />
                Add Product
              </PrimaryButton>
            }
          />
        </div>

        {/* Table */}
        <ProductTable
          products={products}
          totalProducts={totalProducts}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          updateProduct={updateProduct}
          searchProducts={searchProducts}
        />
      </div>
    </div>
  );
}