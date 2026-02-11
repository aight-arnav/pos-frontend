"use client";

import { useEffect, useState } from "react";
import { ProductApi } from "@/lib/api/ProductApi";
import { ProductData, ProductForm } from "@/lib/types/Product";
import toast from "react-hot-toast";

export function useProduct(page: number, pageSize: number) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await ProductApi.getAll(page - 1, pageSize);
        setProducts(data.content);
        setTotalProducts(data.totalElements);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, pageSize]);

  const addProduct = async (form: ProductForm) => {
    const created = await ProductApi.add(form);
    setProducts((prev) => [...prev, created]);
    toast.success("Product added successfully");
  };

  const updateProduct = async (id: number, form: ProductForm) => {
    const updated = await ProductApi.update(id, form);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    toast.success("Product updated successfully");
  };

  return {
    products,
    totalProducts,
    loading,
    addProduct,
    updateProduct,
  };
}