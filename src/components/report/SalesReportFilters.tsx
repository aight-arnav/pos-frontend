"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { StylesConfig } from "react-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { SalesReportForm, ReportType } from "@/lib/types/Report";
import { ClientApi } from "@/lib/api/ClientApi";
import { ClientData } from "@/lib/types/Client";
import { Play } from "lucide-react";

interface ClientOption {
  value: number;
  label: string;
}

interface ReportTypeOption {
  value: ReportType;
  label: string;
}

const selectStyles: StylesConfig<ClientOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: "40px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#1e3a8a" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 1px #1e3a8a" : "none",
    "&:hover": {
      borderColor: "#1e3a8a",
    },
    fontSize: "0.875rem",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 12px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    overflow: "hidden",
    fontSize: "0.875rem",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f5f5f4" : "white",
    color: "#111827",
    cursor: "pointer",
  }),
};

const reportTypeSelectStyles: StylesConfig<ReportTypeOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: "40px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#1e3a8a" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 1px #1e3a8a" : "none",
    "&:hover": {
      borderColor: "#1e3a8a",
    },
    fontSize: "0.875rem",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 12px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    overflow: "hidden",
    fontSize: "0.875rem",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f5f5f4" : "white",
    color: "#111827",
    cursor: "pointer",
  }),
};

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
  const [clientOptions, setClientOptions] = useState<ClientOption[]>([]);
  const [clientSearch, setClientSearch] = useState("");

  const reportTypeOptions: ReportTypeOption[] = [
    { value: "DAY", label: "Day Report" },
    { value: "PRODUCT", label: "Product Report" },
  ];

  useEffect(() => {
    async function loadClients() {
      const res = await ClientApi.search(clientSearch, 0, 100);
      setClientOptions(
        res.content.map((client: ClientData) => ({
          value: client.id,
          label: client.clientName,
        }))
      );
    }

    loadClients();
  }, [clientSearch]);

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
        <div className="space-y-1" style={{ minWidth: "180px" }}>
          <Label>Report Type</Label>
          <Select<ReportTypeOption>
            value={reportTypeOptions.find(
              (opt) => opt.value === form.reportType
            )}
            onChange={(option) =>
              update("reportType", option?.value ?? "DAY")
            }
            options={reportTypeOptions}
            styles={reportTypeSelectStyles}
            classNamePrefix="react-select"
            isSearchable={false}
          />
        </div>

        {/* Client Name (only for PRODUCT) */}
        {form.reportType === "PRODUCT" && (
          <div className="space-y-1" style={{ minWidth: "250px" }}>
            <Label>Client (Optional)</Label>
            <Select
              value={clientOptions.find(
                (c) => c.label === form.clientName
              )}
              onChange={(option) =>
                update("clientName", option?.label ?? "")
              }
              onInputChange={(value) => setClientSearch(value)}
              options={clientOptions}
              placeholder="Search client..."
              isClearable
              styles={selectStyles}
              classNamePrefix="react-select"
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