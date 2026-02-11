"use client";

import { useEffect, useState } from "react";
import { OrderApi } from "@/lib/api/OrderApi";
import { OrderData } from "@/lib/types/Order";
import toast from "react-hot-toast";

export function useOrders(page: number, pageSize: number) {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [selectedOrderLoading, setSelectedOrderLoading] = useState(false);

  const [invoiceLoading, setInvoiceLoading] = useState(false);

  // Load all orders
  useEffect(() => {
    let alive = true;

    async function loadOrders() {
      setOrdersLoading(true);
      try {
        const data = await OrderApi.getAll(page - 1, pageSize);
        if (alive) {
          setOrders(data.content);
          setTotalOrders(data.totalElements);
        }
      } finally {
        if (alive) setOrdersLoading(false);
      }
    }

    loadOrders();
    return () => {
      alive = false;
    };
  }, [page, pageSize]);

  // Fetch a single order by ID
  async function fetchOrderById(orderId: number) {
    setSelectedOrderLoading(true);
    try {
      const data = await OrderApi.getById(orderId);
      setSelectedOrder(data);
    } finally {
      setSelectedOrderLoading(false);
    }
  }

  // Generate invoice
  async function generateInvoice(orderId: number) {
    setInvoiceLoading(true);
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
    } finally {
      setInvoiceLoading(false);
    }
    toast.success("Invoice downloaded successfully");
  }

  return {
    orders,
    totalOrders,
    ordersLoading,
    selectedOrder,
    selectedOrderLoading,
    invoiceLoading,
    fetchOrderById,
    generateInvoice,
  };
}