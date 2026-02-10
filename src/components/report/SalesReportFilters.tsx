"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { SalesReportForm } from "@/lib/types/Report";
import { Play } from "lucide-react";

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
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1">
          <Label className="text-sm font-semibold text-gray-700">
            Start Date
          </Label>
          <Input
            type="date"
            value={form.startDate}
            onChange={(e) =>
              update("startDate", e.target.value)
            }
            className="border-gray-200"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-semibold text-gray-700">
            End Date
          </Label>
          <Input
            type="date"
            value={form.endDate}
            onChange={(e) =>
              update("endDate", e.target.value)
            }
            className="border-gray-200"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-semibold text-gray-700">
            Client ID
          </Label>
          <Input
            type="number"
            placeholder="Optional"
            value={form.clientId ?? ""}
            onChange={(e) =>
              update(
                "clientId",
                e.target.value
                  ? Number(e.target.value)
                  : undefined
              )
            }
            className="border-gray-200"
          />
        </div>

        <PrimaryButton
          disabled={!form.startDate || !form.endDate}
          onClick={() => onRun(form)}
          className="h-10 gap-2"
        >
          <Play className="h-4 w-4" />
          Run Report
        </PrimaryButton>
      </div>
    </div>
  );
}