"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ProductData, ProductForm } from "@/lib/types/Product";

interface Props {
  triggerLabel: string;
  initialData?: ProductData;
  onSubmit: (form: ProductForm) => Promise<void>;
}

export function ProductFormDialog({
  triggerLabel,
  initialData,
  onSubmit,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ProductForm>({
    clientId: initialData?.clientId ?? 0,
    barcode: initialData?.barcode ?? "",
    productName: initialData?.productName ?? "",
    mrp: initialData?.mrp ?? 0,
    imageUrl: initialData?.imageUrl ?? "",
  });

  useEffect(() => {
    if (open && initialData) {
      setForm({
        clientId: initialData.clientId,
        barcode: initialData.barcode,
        productName: initialData.productName,
        mrp: initialData.mrp,
        imageUrl: initialData.imageUrl ?? "",
      });
    }
  }, [open, initialData]);

  async function handleSave() {
    setLoading(true);
    try {
      await onSubmit(form);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={initialData ? "outline" : "default"} size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Client ID"
            type="number"
            value={form.clientId}
            onChange={(e) =>
              setForm({ ...form, clientId: Number(e.target.value) })
            }
          />

          <Input
            placeholder="Barcode"
            value={form.barcode}
            onChange={(e) =>
              setForm({ ...form, barcode: e.target.value })
            }
          />

          <Input
            placeholder="Product name"
            value={form.productName}
            onChange={(e) =>
              setForm({ ...form, productName: e.target.value })
            }
          />

          <Input
            placeholder="MRP"
            type="number"
            value={form.mrp}
            onChange={(e) =>
              setForm({ ...form, mrp: Number(e.target.value) })
            }
          />

          <Input
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({ ...form, imageUrl: e.target.value })
            }
          />

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}