"use client";

import { useEffect, useState } from "react";
import { ClientData, ClientForm } from "@/lib/types/Client";
import { ClientApi } from "@/lib/api/ClientApi";
import toast from "react-hot-toast";

export function useClients() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);

  const addClient = async (form: ClientForm) => {
    const client = await ClientApi.add(form);
    setClients((prev) => [...prev, client]);
    toast.success("Client added successfully");
  };

  const updateClient = async (id: number, form: ClientForm) => {
    const updated = await ClientApi.update(id, form);
    setClients((prev) =>
      prev.map((c) => (c.id === id ? updated : c))
    );
    toast.success("Client updated successfully");
  };

  useEffect(() => {
    let cancelled = false;

    async function loadClients() {
      try {
        const data = await ClientApi.getAll();
        if (!cancelled) {
          setClients(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadClients();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    clients,
    loading,
    addClient,
    updateClient,
  };
}
