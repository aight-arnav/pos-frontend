"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";

interface Props {
  triggerLabel: string;
  initialData: InventoryData;
  onSubmit: (form: InventoryForm) => Promise<void>;
}

export function InventoryFormDialog({
  triggerLabel,
  initialData,
  onSubmit,
}: Props) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(initialData.quantity);
  const [loading, setLoading] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setQuantity(initialData.quantity);
    }
  }

  async function handleSave() {
    setLoading(true);
    try {
      await onSubmit({
        barcode: initialData.barcode,
        quantity,
      });
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Inventory</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {initialData.productName} ({initialData.barcode})
          </div>

          <Input
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
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