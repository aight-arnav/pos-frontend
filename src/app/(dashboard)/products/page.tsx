"use client";

import { ProductTable } from "@/components/products/ProductTable";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";
import { useProduct } from "@/hooks/useProduct";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { Plus } from "lucide-react";

export default function ProductsPage() {
  const { products, loading, addProduct, updateProduct } = useProduct();

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-blue-900">
              Products
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage product catalog and pricing.
            </p>
          </div>

          {/* ✅ ADD PRODUCT BUTTON */}
          <ProductFormDialog
            onSubmit={addProduct}
            trigger={
              <PrimaryButton className="gap-2 shadow-sm">
                <Plus className="h-4 w-4" />
                Add Product
              </PrimaryButton>
            }
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