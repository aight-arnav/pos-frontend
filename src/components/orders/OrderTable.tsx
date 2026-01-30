import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { OrderData } from "@/lib/types/Order";
import { OrderRow } from "./OrderRow";

interface Props {
  orders: OrderData[];
  loading: boolean;
}

export function OrderTable({ orders, loading }: Props) {
  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading orders…
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order, index) => (
            <OrderRow
              key={index}
              order={order}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}