"use client";

import { useEffect, useState } from "react";
import { OrderApi } from "@/lib/api/OrderApi";
import { OrderData } from "@/lib/types/Order";
import { PagedResponse } from "@/lib/types/PagedResponse";
import toast from "react-hot-toast";

export function useOrders(page: number, pageSize: number) {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchString, setSearchString] = useState("");
  const [debouncedString, setDebouncedString] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedString(searchString), 400);
    return () => clearTimeout(timer);
  }, [searchString]);

  // Load orders
  useEffect(() => {
    let alive = true;

    async function loadOrders() {
      setLoading(true);
      try {
        const id = Number(debouncedString.trim());
        let data: PagedResponse<OrderData> | OrderData;

        if (debouncedString && !isNaN(id)) {
          data = await OrderApi.getById(id);
        } else {
          data = await OrderApi.getAll(page - 1, pageSize);
        }

        if (!alive) return;

        if ("content" in data) {
          setOrders(data.content);
          setTotalOrders(data.totalElements);
        } else {
          setOrders([data]);
          setTotalOrders(1);
        }
      } catch (e: unknown) {
        if (e instanceof Error) toast.error(e.message || "Failed to fetch orders");
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadOrders();

    return () => {
      alive = false;
    };
  }, [page, pageSize, debouncedString]);

  // Generate invoice
  const generateInvoice = async (orderId: number) => {
    try {
      const blob = await OrderApi.generateInvoice(orderId);
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-order-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Invoice downloaded successfully");
    } catch (e: unknown) {
      if (e instanceof Error) toast.error(e.message || "Failed to generate invoice");
    }
  };

  const searchOrder = (value: string) => setSearchString(value);

  return {
    orders,
    totalOrders,
    ordersLoading: loading,
    generateInvoice,
    searchOrder,
  };
}