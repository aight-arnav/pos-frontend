"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { ClientRow } from "./ClientRow";
import { useClients } from "@/hooks/useClients";

export function ClientTable() {
  const { clients, loading, updateClient } = useClients();

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
          <TableRow className="hover:bg-transparent border-b border-gray-100">
            <TableHead className="w-[50px] px-6">
              <Checkbox className="border-gray-300 data-[state=checked]:bg-green-600" />
            </TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors">
                Client Name <ArrowUpDown className="w-3 h-3" />
              </div>
            </TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              Status
            </TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              Created At
            </TableHead>
            <TableHead className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clients.map((client) => (
            <ClientRow 
              key={client.id} 
              client={client} 
              onUpdate={updateClient}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}