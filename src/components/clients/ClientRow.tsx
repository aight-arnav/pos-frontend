import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Edit2 } from "lucide-react";
import { ClientData } from "@/lib/types/Client";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { Button } from "@/components/ui/button";

interface ClientRowProps {
  client: ClientData;
  onUpdate: (id: number, data: { clientName: string }) => Promise<void>;
}


export function ClientRow({ client, onUpdate }: ClientRowProps) {
  return (
    <TableRow className="group hover:bg-blue-50/30 transition-colors border-b border-gray-50">
      <TableCell className="px-6">
        <Checkbox className="border-gray-300" />
      </TableCell>
      
      <TableCell className="px-6 py-5">
        <span className="font-semibold text-gray-900 block">{client.clientName}</span>
        <span className="text-xs text-gray-400">ID: #{client.id}</span>
      </TableCell>

      <TableCell className="px-6 py-5">
        {/* Status Pill Badge */}
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
          Active
        </span>
      </TableCell>

      <TableCell className="px-6 py-5 text-sm text-gray-500">
        {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : "—"}
      </TableCell>

      <TableCell className="px-6 py-5 text-right">
        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <ClientFormDialog
            initialData={client}
            onSubmit={(form) => onUpdate(client.id, form)} // This calls updateClient(id, data)
            trigger={
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 transition-colors">
                <Edit2 className="w-4 h-4" />
              </Button>
            }
          />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}