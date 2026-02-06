"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SalesReportForm } from "@/lib/types/Report";

interface Props {
  onRun: (form: SalesReportForm) => void;
}

export function SalesReportFilters({ onRun }: Props) {
  const [form, setForm] = useState<SalesReportForm>({
    startDate: "",
    endDate: "",
    clientId: undefined,
  });

  function update<K extends keyof SalesReportForm>(
    key: K,
    value: SalesReportForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div>
        <label className="text-sm font-medium">Start Date</label>
        <Input
          type="date"
          value={form.startDate}
          onChange={(e) => update("startDate", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">End Date</label>
        <Input
          type="date"
          value={form.endDate}
          onChange={(e) => update("endDate", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Client ID</label>
        <Input
          type="number"
          placeholder="Optional"
          value={form.clientId ?? ""}
          onChange={(e) =>
            update(
              "clientId",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
        />
      </div>

      <Button
        className="h-10"
        disabled={!form.startDate || !form.endDate}
        onClick={() => onRun(form)}
      >
        Run Report
      </Button>
    </div>
  );
}