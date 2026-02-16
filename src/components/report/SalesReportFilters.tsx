"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { SalesReportForm, ReportType } from "@/lib/types/Report";
import { Play } from "lucide-react";

interface Props {
  onRun: (form: SalesReportForm) => void;
}

export function SalesReportFilters({ onRun }: Props) {
  const [form, setForm] = useState<SalesReportForm>({
    startDate: "",
    endDate: "",
    clientName: "",
    reportType: "DAY",
  });

  function update<K extends keyof SalesReportForm>(
    key: K,
    value: SalesReportForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        {/* Start Date */}
        <div className="space-y-1">
          <Label>Start Date</Label>
          <Input
            type="date"
            value={form.startDate}
            onChange={(e) =>
              update("startDate", e.target.value)
            }
          />
        </div>

        {/* End Date */}
        <div className="space-y-1">
          <Label>End Date</Label>
          <Input
            type="date"
            value={form.endDate}
            onChange={(e) =>
              update("endDate", e.target.value)
            }
          />
        </div>

        {/* Report Type */}
        <div className="space-y-1">
          <Label>Report Type</Label>
          <select
            value={form.reportType}
            onChange={(e) =>
              update("reportType", e.target.value as ReportType)
            }
            className="h-10 rounded-md border px-3"
          >
            <option value="DAY">Day Report</option>
            <option value="PRODUCT">Product Report</option>
          </select>
        </div>

        {/* Client Name (only for PRODUCT) */}
        {form.reportType === "PRODUCT" && (
          <div className="space-y-1">
            <Label>Client Name (Optional)</Label>
            <Input
              value={form.clientName}
              onChange={(e) =>
                update("clientName", e.target.value)
              }
            />
          </div>
        )}

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