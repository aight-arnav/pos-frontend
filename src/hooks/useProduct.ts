"use client";

import { useEffect, useState } from "react";
import { ProductApi } from "@/lib/api/ProductApi";
import { ProductData, ProductForm } from "@/lib/types/Product";

export function useProduct() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await ProductApi.getAll();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const addProduct = async (form: ProductForm) => {
    const created = await ProductApi.add(form);
    setProducts((prev) => [...prev, created]);
  };

  const updateProduct = async (id: number, form: ProductForm) => {
    const updated = await ProductApi.update(id, form);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
  };
}