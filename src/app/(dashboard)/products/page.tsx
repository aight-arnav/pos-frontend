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
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Products
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage product catalog and pricing.
            </p>
          </div>

          <ProductFormDialog
            triggerLabel="Add Product"
            onSubmit={addProduct}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
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