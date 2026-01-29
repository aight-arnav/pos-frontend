import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientData, ClientForm } from "@/lib/types/Client";
import { ClientRow } from "./ClientRow";

interface Props {
  clients: ClientData[];
  onUpdate: (id: number, form: ClientForm) => Promise<void>;
}

export function ClientTable({ clients, onUpdate }: Props) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="font-semibold">
              Client Name
            </TableHead>
            <TableHead className="font-semibold">
              Created
            </TableHead>
            <TableHead className="font-semibold">
              Updated
            </TableHead>
            <TableHead className="text-right font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clients.map((client, index) => (
            <ClientRow
              key={client.id}
              client={client}
              index={index}
              onUpdate={onUpdate}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}