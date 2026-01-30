import { TableCell, TableRow } from "@/components/ui/table";
import { OrderData } from "@/lib/types/Order";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import clsx from "clsx";
import { formatIST } from "@/lib/utils/date";

interface Props {
  order: OrderData;
  index: number;
}

export function OrderRow({ order, index }: Props) {
  return (
    <TableRow
      className={clsx(index % 2 === 1 && "bg-muted/40")}
    >
      <TableCell className="font-medium">
        #{order.id}
      </TableCell>

      <TableCell className="text-muted-foreground">
        —
      </TableCell>

      <TableCell>
        {formatIST(order.createdAt)}
      </TableCell>

      <TableCell className="text-right">
        <OrderDetailsDialog orderId={order.id} />
      </TableCell>
    </TableRow>
  );
}