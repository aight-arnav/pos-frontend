"use client";

import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { OrderItemForm } from "@/lib/types/Order";

interface Props {
  items: OrderItemForm[];
  onAdd: (item: OrderItemForm) => void;
  onUpdate: (
    barcode: string,
    quantity: number,
    sellingPrice: number
  ) => void;
  onRemove: (barcode: string) => void;
}

type DraftRow = OrderItemForm;

export function CreateOrderTable({
  items,
  onAdd,
  onRemove,
}: Props) {
  const [draft, setDraft] = useState<DraftRow>({
    barcode: "",
    quantity: 1,
    sellingPrice: 0,
  });

  const barcodeRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    barcodeRef.current?.focus();
  }, []);

  function commitRow() {
    if (!draft.barcode) return;

    onAdd(draft);
    setDraft({ barcode: "", quantity: 1, sellingPrice: 0 });
    requestAnimationFrame(() => barcodeRef.current?.focus());
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Barcode</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Existing Items */}
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
                {(item.quantity * item.sellingPrice).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onRemove(item.barcode)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {/* Draft Row */}
          <TableRow className="bg-muted/30">
            <TableCell>
              <Input
                ref={barcodeRef}
                placeholder="Scan / enter barcode"
                value={draft.barcode}
                onChange={e =>
                  setDraft(d => ({ ...d, barcode: e.target.value }))
                }
                onKeyDown={e => {
                  if (e.key === "Enter") qtyRef.current?.focus();
                }}
              />
            </TableCell>

            <TableCell className="text-right">
              <Input
                ref={qtyRef}
                type="number"
                min={1}
                value={draft.quantity}
                onChange={e =>
                  setDraft(d => ({
                    ...d,
                    quantity: Number(e.target.value),
                  }))
                }
                onKeyDown={e => {
                  if (e.key === "Enter") priceRef.current?.focus();
                }}
              />
            </TableCell>

            <TableCell className="text-right">
              <Input
                ref={priceRef}
                type="number"
                min={0}
                value={draft.sellingPrice}
                onChange={e =>
                  setDraft(d => ({
                    ...d,
                    sellingPrice: Number(e.target.value),
                  }))
                }
                onKeyDown={e => {
                  if (e.key === "Enter") commitRow();
                }}
              />
            </TableCell>

            <TableCell className="text-right font-medium">
              {(draft.quantity * draft.sellingPrice || 0).toFixed(2)}
            </TableCell>

            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}