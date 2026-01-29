import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import { InventoryRow } from "./InventoryRow";

interface Props {
  inventory: InventoryData[];
  loading: boolean;
  onUpdate: (productId: number, form: InventoryForm) => Promise<void>;
}

export function InventoryTable({ inventory, loading, onUpdate }: Props) {
  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading inventory…
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Barcode</TableHead>
            <TableHead className="text-right">
              Quantity
            </TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {inventory.map((item, index) => (
            <InventoryRow
              key={item.productId}
              item={item}
              index={index}
              onUpdate={onUpdate}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}