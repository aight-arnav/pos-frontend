"use client";

import { useEffect, useState } from "react";
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
import { Loader2 } from "lucide-react";

interface Props {
  trigger: React.ReactNode;
  initialData?: ProductData;
  onSubmit: (form: ProductForm) => Promise<void>;
}

export function ProductFormDialog({ trigger, initialData, onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(initialData);

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
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md border border-stone-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-900">
            {isEdit ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Client ID */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Client ID</Label>
            <Input
              type="number"
              value={form.clientId}
              onChange={(e) =>
                setForm({ ...form, clientId: Number(e.target.value) })
              }
              className="border-gray-200"
            />
          </div>

          {/* Barcode */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Barcode</Label>
            <Input
              value={form.barcode}
              onChange={(e) => setForm({ ...form, barcode: e.target.value })}
              className="border-gray-200"
            />
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Product Name</Label>
            <Input
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
              className="border-gray-200"
            />
          </div>

          {/* MRP */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">MRP</Label>
            <Input
              type="number"
              value={form.mrp}
              onChange={(e) => setForm({ ...form, mrp: Number(e.target.value) })}
              className="border-gray-200"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Image URL <span className="ml-1 text-xs font-normal text-gray-400">(optional)</span>
            </Label>
            <Input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="border-gray-200"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <OutlineButton type="button" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </OutlineButton>
            <PrimaryButton onClick={handleSave} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isEdit ? "Update" : "Create Product"}
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}