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
import { OrderApi } from "@/lib/api/OrderApi";
import { OrderData } from "@/lib/types/Order";
import { formatIST } from "@/lib/utils/date";

interface Props {
  orderId: number;
}

export function OrderDetailsDialog({ orderId }: Props) {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function load() {
      setLoading(true);
      try {
        const data = await OrderApi.getById(orderId);
        setOrder(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [open, orderId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Order #{orderId}
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="text-sm text-muted-foreground">
            Loading order…
          </div>
        )}

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
                    <TableHead className="text-right">
                      Quantity
                    </TableHead>
                    <TableHead className="text-right">
                      Selling Price
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {order.orderItems.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.sellingPrice}
                      </TableCell>
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