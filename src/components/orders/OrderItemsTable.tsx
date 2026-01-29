import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { OrderItemForm } from "@/lib/types/Order";
import { Button } from "@/components/ui/button";

interface Props {
  items: OrderItemForm[];
  onUpdate: (
    barcode: string,
    quantity: number,
    sellingPrice: number
  ) => void;
  onRemove: (barcode: string) => void;
}

export function OrderItemsTable({
  items,
  onRemove,
}: Props) {
  if (items.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No items added yet
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Barcode</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map(item => (
            <TableRow key={item.barcode}>
              <TableCell>{item.barcode}</TableCell>
              <TableCell className="text-right">
                {item.quantity}
              </TableCell>
              <TableCell className="text-right">
                {item.sellingPrice}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.barcode)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}