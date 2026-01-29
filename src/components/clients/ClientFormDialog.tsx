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
import { ClientData, ClientForm } from "@/lib/types/Client";

interface Props {
  triggerLabel: string;
  initialData?: ClientData;
  onSubmit: (form: ClientForm) => Promise<void>;
}

export function ClientFormDialog({
  triggerLabel,
  initialData,
  onSubmit,
}: Props) {
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState(
    initialData?.clientName ?? ""
  );

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setClientName(initialData?.clientName ?? "");
    }
  }

  async function handleSave() {
    await onSubmit({ clientName });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Client" : "Add Client"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={!clientName.trim()}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}