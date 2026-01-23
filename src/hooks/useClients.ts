"use client";

import { useEffect, useState } from "react";
import { Client, ClientForm } from "@/lib/types/client";
import { ClientApi } from "@/lib/api/clientApi";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const addClient = async (form: ClientForm) => {
    const client = await ClientApi.add(form);
    setClients((prev) => [...prev, client]);
  };

  const updateClient = async (id: number, form: ClientForm) => {
    const updated = await ClientApi.update(id, form);
    setClients((prev) =>
      prev.map((c) => (c.id === id ? updated : c))
    );
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
