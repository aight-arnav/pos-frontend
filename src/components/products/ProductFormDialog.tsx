"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { StylesConfig } from "react-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductData, ProductForm } from "@/lib/types/Product";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import { ClientApi } from "@/lib/api/ClientApi";
import { ClientData } from "@/lib/types/Client";
import { Loader2 } from "lucide-react";

interface Props {
  trigger: React.ReactNode;
  initialData?: ProductData;
  onSubmit: (form: ProductForm) => Promise<void>;
}

interface ClientOption {
  value: number;
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



export function ProductFormDialog({ trigger, initialData, onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientOptions, setClientOptions] = useState<ClientOption[]>([]);
  const [clientSearch, setClientSearch] = useState("");

  const isEdit = Boolean(initialData);

  const [form, setForm] = useState<ProductForm>({
    clientId: initialData?.clientId ?? 0,
    barcode: initialData?.barcode ?? "",
    productName: initialData?.productName ?? "",
    mrp: initialData?.mrp ?? 0,
    imageUrl: initialData?.imageUrl ?? "",
  });

  useEffect(() => {
    if (!open) return;

    async function loadClients() {
      const res = await ClientApi.search(clientSearch, 0, 10);
      setClientOptions(
        res.content.map((client: ClientData) => ({
          value: client.id,
          label: client.clientName,
        }))
      );
    }

    loadClients();
  }, [open, clientSearch]);

  async function handleSave() {
    setLoading(true);
    try {
      await onSubmit(form);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  const selectedClient = clientOptions.find(
    (c) => c.value === form.clientId
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md border border-stone-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-900">
            {isEdit ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Client Select */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Client
            </Label>
            <Select
              value={selectedClient}
              onChange={(option) =>
                setForm({ ...form, clientId: option?.value ?? 0 })
              }
              onInputChange={(value) => setClientSearch(value)}
              options={clientOptions}
              placeholder="Search client..."
              isClearable
              styles={selectStyles}
              classNamePrefix="react-select"
            />
          </div>

          {/* Barcode */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Barcode</Label>
            <Input
              value={form.barcode}
              onChange={(e) => setForm({ ...form, barcode: e.target.value })}
            />
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Product Name
            </Label>
            <Input
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
            />
          </div>

          {/* MRP */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">MRP</Label>
            <Input
              type="number"
              value={form.mrp}
              onChange={(e) =>
                setForm({ ...form, mrp: Number(e.target.value) })
              }
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Image URL
            </Label>
            <Input
              value={form.imageUrl}
              onChange={(e) =>
                setForm({ ...form, imageUrl: e.target.value })
              }
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <OutlineButton
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </OutlineButton>
            <PrimaryButton onClick={handleSave} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isEdit ? (
                "Update"
              ) : (
                "Create Product"
              )}
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}