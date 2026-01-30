"use client";

import { useEffect, useState } from "react";
import { OrderApi } from "@/lib/api/OrderApi";
import { OrderData } from "@/lib/types/Order";

export function useOrders(page = 0, size = 10) {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      const data = await OrderApi.getAll(page, size);
      if (alive) {
        setOrders(data);
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [page, size]);

  return { orders, loading };
}