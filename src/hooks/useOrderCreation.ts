"use client";

import { useState } from "react";
import { OrderItemForm, OrderForm } from "@/lib/types/Order";
import { OrderApi } from "@/lib/api/OrderApi";

export function useOrderCreation() {
  const [items, setItems] = useState<OrderItemForm[]>([]);
  const [loading, setLoading] = useState(false);

  function addItem(item: OrderItemForm) {
    setItems(prev => {
      const existing = prev.find(i => i.barcode === item.barcode);
      if (existing) {
        return prev.map(i =>
          i.barcode === item.barcode
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }

  function updateItem(barcode: string, quantity: number, sellingPrice: number) {
    setItems(prev =>
      prev.map(i =>
        i.barcode === barcode
          ? { ...i, quantity, sellingPrice }
          : i
      )
    );
  }

  function removeItem(barcode: string) {
    setItems(prev => prev.filter(i => i.barcode !== barcode));
  }

  async function submitOrder() {
    if (items.length === 0) return;

    setLoading(true);
    try {
      const payload: OrderForm = { orderItems: items };
      await OrderApi.create(payload);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  return {
    items,
    loading,
    addItem,
    updateItem,
    removeItem,
    submitOrder,
  };
}