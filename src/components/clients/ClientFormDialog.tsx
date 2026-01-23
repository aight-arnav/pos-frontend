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
import { Client, ClientForm } from "@/lib/types/client";

interface Props {
  triggerLabel: string;
  initialData?: Client;
  onSubmit: (form: ClientForm) => Promise<void>;
}

export function ClientFormDialog({ triggerLabel, initialData, onSubmit }: Props) {
  const [clientName, setClientName] = useState(
    initialData?.clientName ?? ""
  );

  return (
    <Dialog>
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
            onClick={() => onSubmit({ clientName })}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
