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
import { ClientData, ClientForm } from "@/lib/types/Client";
import { Loader2 } from "lucide-react";

interface Props {
  trigger: React.ReactNode;
  initialData?: ClientData;
  onSubmit: (data: ClientForm) => Promise<void>;
}

export function ClientFormDialog({ trigger, initialData, onSubmit }: Props) {
  const [clientName, setClientName] = useState(initialData?.clientName ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = Boolean(initialData);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit({ clientName });
      setIsOpen(false);
      if (!isEdit) setClientName("");
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
            {isEdit ? "Edit Client" : "Add New Client"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Client Name
            </Label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              maxLength={50}
              placeholder="e.g. Acme Corp"
              className="border-gray-200 "
            />
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">
                Unique identifier for the client
              </p>
              <p className="text-xs text-gray-400">
                {clientName.length}/50
              </p>
            </div>
          </div>

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
              disabled={clientName.trim().length === 0 || isSubmitting}
              className="min-w-30"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isEdit ? (
                "Update"
              ) : (
                "Create Client"
              )}
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}