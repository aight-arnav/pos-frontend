"use client";

import { useEffect, useState } from "react";
import { ClientData, ClientForm } from "@/lib/types/Client";
import { ClientApi } from "@/lib/api/ClientApi";
import toast from "react-hot-toast";

export function useClients(page: number, pageSize: number) {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchString, setSearchString] = useState("");
  const [debouncedString, setDebouncedString] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedString(searchString);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchString]);

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

  const searchClients = (value: string) => {
    setSearchString(value);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchClients = async () => {
    return debouncedString.trim().length > 0
      ? await ClientApi.search(debouncedString, page - 1, pageSize)
      : await ClientApi.getAll(page - 1, pageSize);;
  }

    async function loadClients() {
      try {
        const data = await fetchClients();
        if (!cancelled) {
          setClients(data.content);
          setTotalClients(data.totalElements);
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
  }, [page, pageSize, debouncedString]);

  return {
    clients,
    totalClients,
    loading,
    addClient,
    updateClient,
    searchClients
  };
}
