"use client";

import { useEffect, useState } from "react";
import { ProductApi } from "@/lib/api/ProductApi";
import { ProductData, ProductForm } from "@/lib/types/Product";
import toast from "react-hot-toast";

export function useProduct(page: number, pageSize: number) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchString, setSearchString] = useState("");
  const [debouncedString, setDebouncedString] = useState("");

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedString(searchString), 400);
    return () => clearTimeout(timer);
  }, [searchString]);

  // fetch products
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      try {
        const data =
          debouncedString.trim().length > 0
            ? await ProductApi.search(debouncedString, page - 1, pageSize)
            : await ProductApi.getAll(page - 1, pageSize);

        if (!cancelled) {
          setProducts(data.content);
          setTotalProducts(data.totalElements);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [page, pageSize, debouncedString]);

  const addProduct = async (form: ProductForm): Promise<void> => {
    const created = await ProductApi.add(form);
    setProducts((prev) => [...prev, created]);
    toast.success("Product added successfully");
  };

  const updateProduct = async (id: number, form: ProductForm): Promise<void> => {
    const updated = await ProductApi.update(id, form);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    toast.success("Product updated successfully");
  };

  const searchProducts = (value: string) => setSearchString(value);

  return {
    products,
    totalProducts,
    loading,
    addProduct,
    updateProduct,
    searchProducts,
  };
}