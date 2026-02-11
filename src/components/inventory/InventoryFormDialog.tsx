"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import { Loader2 } from "lucide-react";
import TrimLongField from "../commons/TrimLongField";

interface Props {
  trigger: React.ReactNode;
  initialData: InventoryData;
  onSubmit: (form: InventoryForm) => Promise<void>;
}

export function InventoryFormDialog({
  trigger,
  initialData,
  onSubmit,
}: Props) {
  const [quantity, setQuantity] = useState(initialData.quantity);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        barcode: initialData.barcode,
        quantity,
      });
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md border border-stone-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-900">
            Edit Inventory
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Product Context */}
          <div className="rounded-md border border-stone-200 bg-stone-50 p-3">
            <div className="text-sm font-semibold text-gray-800">
              <TrimLongField value={initialData.productName} viewLength={40} />
            </div>
            <div className="text-xs text-gray-500">
              Barcode: {initialData.barcode}
            </div>
          </div>

          {/* Quantity Field */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Quantity
            </Label>
            <Input
              type="number"
              min={0}
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className="border-gray-200"
            />
            <p className="text-xs text-gray-400">
              Current available stock
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <OutlineButton
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </OutlineButton>

            <PrimaryButton
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="min-w-30"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}