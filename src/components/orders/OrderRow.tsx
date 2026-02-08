"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { OrderData } from "@/lib/types/Order";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { formatIST } from "@/lib/utils/date";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";

interface Props {
  order: OrderData;
  index: number;
}

export function OrderRow({ order, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { generateInvoice, invoiceLoading } = useOrders();

  const previewItems = order.orderItems.slice(0, 2);
  const remaining = order.orderItems.length - previewItems.length;

  return (
    <>
      <TableRow className={clsx(index % 2 === 1 && "bg-muted/40")}>
        <TableCell className="font-medium">
          #{order.id}
        </TableCell>

        {/* Items preview */}
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {previewItems.map(item => (
                <span key={item.productName}>
                  {item.quantity}× {item.productName},{" "}
                </span>
              ))}
              {remaining > 0 && (
                <span className="text-muted-foreground">
                  +{remaining} more
                </span>
              )}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </TableCell>

        <TableCell>
          {formatIST(order.createdAt)}
        </TableCell>

        {/* Actions */}
        <TableCell className="text-right space-x-2">
          <Button
            size="sm"
            onClick={() => generateInvoice(order.id)}
            disabled={invoiceLoading}
          >
            Invoice
          </Button>
        </TableCell>
      </TableRow>

      {/* Expanded inline items */}
      {expanded && (
        <TableRow className="bg-muted/20">
          <TableCell colSpan={4}>
            <div className="space-y-2 text-sm">
              {order.orderItems.map(item => (
                <div
                  key={item.productName}
                  className="flex justify-between"
                >
                  <span>{item.productName}</span>
                  <span>
                    {item.quantity} × ₹{item.sellingPrice}
                  </span>
                </div>
              ))}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
