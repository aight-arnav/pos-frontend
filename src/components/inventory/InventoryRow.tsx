import { TableCell, TableRow } from "@/components/ui/table";
import { InventoryData, InventoryForm } from "@/lib/types/Inventory";
import { InventoryFormDialog } from "./InventoryFormDialog";
import clsx from "clsx";

interface Props {
  item: InventoryData;
  index: number;
  onUpdate: (productId: number, form: InventoryForm) => Promise<void>;
}

export function InventoryRow({ item, index, onUpdate }: Props) {
  return (
    <TableRow
      className={clsx(
        index % 2 === 1 && "bg-muted/40"
      )}
    >
      <TableCell>{item.productName}</TableCell>
      <TableCell>{item.barcode}</TableCell>
      <TableCell className="text-right">
        {item.quantity}
      </TableCell>
      <TableCell className="text-right">
        <InventoryFormDialog
          triggerLabel="Edit"
          initialData={item}
          onSubmit={(form) =>
            onUpdate(item.productId, form)
          }
        />
      </TableCell>
    </TableRow>
  );
}