"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { formatIST } from "@/lib/utils/date";
import { useOrders } from "@/hooks/useOrders";
import { OutlineButton } from "../commons/buttons/OutlinedButton";
import { Eye } from "lucide-react";

interface Props {
  orderId: number;
}

export function OrderDetailsDialog({ orderId }: Props) {
  const [open, setOpen] = useState(false);

  const {
    selectedOrder: order,
    selectedOrderLoading: loading,
    invoiceLoading,
    fetchOrderById,
    generateInvoice,
  } = useOrders();

  useEffect(() => {
    if (!open) return;
    fetchOrderById(orderId);
  }, [open, orderId, fetchOrderById]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <OutlineButton size="sm">
          <Eye className="w-4 h-4 mr-1" />
          View
        </OutlineButton>
      </DialogTrigger>


      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order #{orderId}</DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="text-sm text-muted-foreground">Loading order…</div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={() => generateInvoice(orderId)}
            disabled={invoiceLoading}
          >
            {invoiceLoading ? "Generating..." : "Generate Invoice"}
          </Button>
        </div>

        {order && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Created at: {formatIST(order.createdAt)}
            </div>

            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Selling Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.orderItems.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.sellingPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}