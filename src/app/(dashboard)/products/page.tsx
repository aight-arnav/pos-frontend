"use client";

import { ProductTable } from "@/components/products/ProductTable";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";
import { useProduct } from "@/hooks/useProduct";

export default function ProductsPage() {
  const {
    products,
    loading,
    addProduct,
    updateProduct,
  } = useProduct();

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
              Products
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage product catalog and pricing.
            </p>
          </div>

          <ProductFormDialog
            triggerLabel="Add Product"
            onSubmit={addProduct}
          />
        </div>

        {/* Table Container */}
        <div className="overflow-hidden">
          <ProductTable
            products={products}
            loading={loading}
            onUpdate={updateProduct}
          />
        </div>
      </div>
    </div>
  );
}