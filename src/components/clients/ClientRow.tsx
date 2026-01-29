import { TableCell, TableRow } from "@/components/ui/table";
import { ClientData, ClientForm } from "@/lib/types/Client";
import { ClientFormDialog } from "./ClientFormDialog";
import clsx from "clsx";

interface Props {
  client: ClientData;
  index: number;
  onUpdate: (id: number, form: ClientForm) => Promise<void>;
}

export function ClientRow({ client, index, onUpdate }: Props) {
  return (
    <TableRow
      className={clsx(
        "transition-colors",
        index % 2 === 0 ? "bg-background" : "bg-muted/50",
        "hover:bg-muted"
      )}
    >
      <TableCell className="font-medium">
        {client.clientName}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {client.createdAt
          ? new Date(client.createdAt).toLocaleString()
          : "—"}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {client.updatedAt
          ? new Date(client.updatedAt).toLocaleString()
          : "—"}
      </TableCell>

      <TableCell className="text-right">
        <ClientFormDialog
          triggerLabel="Edit"
          initialData={client}
          onSubmit={(form) => onUpdate(client.id, form)}
        />
      </TableCell>
    </TableRow>
  );
}