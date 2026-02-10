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

type EditingCell = {
  barcode: string;
  field: "barcode" | "quantity" | "sellingPrice";
} | null;

type DraftField = "barcode" | "quantity" | "sellingPrice";

type EditingField = NonNullable<EditingCell>["field"];


export function CreateOrderTable({
  items,
  onAdd,
  onUpdate,
  onRemove,
}: Props) {
  const [draft, setDraft] = useState<OrderItemForm>({
    barcode: "",
    quantity: 1,
    sellingPrice: 0,
  });

  const [activeDraftField, setActiveDraftField] =
    useState<DraftField>("barcode");

  const [editing, setEditing] = useState<EditingCell>(null);
  const [editValue, setEditValue] = useState<string | number>("");

  const barcodeRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);

  /* ---------- Focus management ---------- */

  useEffect(() => {
    if (activeDraftField === "barcode") barcodeRef.current?.focus();
    if (activeDraftField === "quantity") qtyRef.current?.focus();
    if (activeDraftField === "sellingPrice") priceRef.current?.focus();
  }, [activeDraftField]);

  useEffect(() => {
    editRef.current?.focus();
    editRef.current?.select();
  }, [editing]);

  /* ---------- Draft logic ---------- */

  function commitDraft() {
    if (!draft.barcode) return;

    onAdd(draft);
    setDraft({ barcode: "", quantity: 1, sellingPrice: 0 });
    setActiveDraftField("barcode");
  }

  /* ---------- Existing row editing ---------- */

  function startEdit(
    barcode: string,
    field: EditingField,
    value: string | number
  ) {
    setEditing({ barcode, field });
    setEditValue(value);
  }

  function commitEdit(next?: "quantity" | "price" | "done") {
    if (!editing) return;

    const item = items.find((i) => i.barcode === editing.barcode);
    if (!item) return;

    const updatedBarcode =
      editing.field === "barcode"
        ? String(editValue)
        : item.barcode;

    const updatedQty =
      editing.field === "quantity"
        ? Number(editValue)
        : item.quantity;

    const updatedPrice =
      editing.field === "sellingPrice"
        ? Number(editValue)
        : item.sellingPrice;

    // Remove old item if barcode changed
    if (updatedBarcode !== item.barcode) {
      onRemove(item.barcode);
    }

    onUpdate(updatedBarcode, updatedQty, updatedPrice);

    if (next === "quantity") {
      setEditing({ barcode: updatedBarcode, field: "quantity" });
      setEditValue(updatedQty);
      return;
    }

    if (next === "price") {
      setEditing({ barcode: updatedBarcode, field: "sellingPrice" });
      setEditValue(updatedPrice);
      return;
    }

    setEditing(null);
    setActiveDraftField("barcode");
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Barcode
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 text-right">
              Qty
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 text-right">
              Price
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 text-right">
              Total
            </TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item) => {
            const editingBarcode =
              editing?.barcode === item.barcode &&
              editing?.field === "barcode";

            const editingQty =
              editing?.barcode === item.barcode &&
              editing?.field === "quantity";

            const editingPrice =
              editing?.barcode === item.barcode &&
              editing?.field === "sellingPrice";

            return (
              <TableRow
                key={item.barcode}
                className="transition-colors hover:bg-zinc-50"
              >
                {/* Barcode */}
                <TableCell
                  className="px-6 py-4 text-sm cursor-pointer"
                  onClick={() =>
                    startEdit(item.barcode, "barcode", item.barcode)
                  }
                >
                  {editingBarcode ? (
                    <Input
                      ref={editRef}
                      value={String(editValue)}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          commitEdit("quantity");
                        if (e.key === "Escape") setEditing(null);
                      }}
                      className="
                        h-9
                        bg-transparent
                        border-0
                        pl-9
                        text-xl
                        shadow-none
                        focus:outline-none
                        focus:ring-0
                        focus:border-0
                        focus-visible:outline-none
                        focus-visible:ring-0
                        focus-visible:border-0
                      "
                    />
                  ) : (
                    item.barcode
                  )}
                </TableCell>

                {/* Qty */}
                <TableCell
                  className="px-6 py-4 text-sm text-right cursor-pointer"
                  onClick={() =>
                    startEdit(item.barcode, "quantity", item.quantity)
                  }
                >
                  {editingQty ? (
                    <Input
                      ref={editRef}
                      type="number"
                      min={1}
                      value={Number(editValue)}
                      onChange={(e) =>
                        setEditValue(Number(e.target.value))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          commitEdit("price");
                        if (e.key === "Escape") setEditing(null);
                      }}
                      className="
                        h-9
                        bg-transparent
                        border-0
                        pl-9
                        text-xl
                        shadow-none
                        focus:outline-none
                        focus:ring-0
                        focus:border-0
                        focus-visible:outline-none
                        focus-visible:ring-0
                        focus-visible:border-0
                      "
                    />
                  ) : (
                    item.quantity
                  )}
                </TableCell>

                {/* Price */}
                <TableCell
                  className="px-6 py-4 text-sm text-right cursor-pointer"
                  onClick={() =>
                    startEdit(
                      item.barcode,
                      "sellingPrice",
                      item.sellingPrice
                    )
                  }
                >
                  {editingPrice ? (
                    <Input
                      ref={editRef}
                      type="number"
                      min={0}
                      value={Number(editValue)}
                      onChange={(e) =>
                        setEditValue(Number(e.target.value))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          commitEdit("done");
                        if (e.key === "Escape") setEditing(null);
                      }}
                      className="
                        h-9
                        bg-transparent
                        border-0
                        pl-9
                        text-xl
                        shadow-none
                        focus:outline-none
                        focus:ring-0
                        focus:border-0
                        focus-visible:outline-none
                        focus-visible:ring-0
                        focus-visible:border-0
                      "
                    />
                  ) : (
                    item.sellingPrice
                  )}
                </TableCell>

                <TableCell className="px-6 py-4 text-sm text-right font-medium">
                  {(item.quantity * item.sellingPrice).toFixed(2)}
                </TableCell>

                <TableCell className="px-6 py-4 text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-sm"
                    onClick={() => onRemove(item.barcode)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}

          {/* Draft row (unchanged) */}
          <TableRow className="bg-zinc-50/70">
            <TableCell className="px-6 py-4">
              <Input
                ref={barcodeRef}
                placeholder="Scan / enter barcode"
                value={draft.barcode}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, barcode: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    setActiveDraftField("quantity");
                }}
                className="
                  h-9
                  bg-transparent
                  border-0
                  pl-9
                  text-xl
                  shadow-none
                  focus:outline-none
                  focus:ring-0
                  focus:border-0
                  focus-visible:outline-none
                  focus-visible:ring-0
                  focus-visible:border-0
                "
              />
            </TableCell>

            <TableCell className="px-6 py-4 text-right">
              {activeDraftField === "quantity" ? (
                <Input
                  ref={qtyRef}
                  type="number"
                  min={1}
                  value={draft.quantity}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      quantity: Number(e.target.value),
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      setActiveDraftField("sellingPrice");
                  }}
                  className="
                    h-9
                    bg-transparent
                    border-0
                    pl-9
                    text-xl
                    shadow-none
                    focus:outline-none
                    focus:ring-0
                    focus:border-0
                    focus-visible:outline-none
                    focus-visible:ring-0
                    focus-visible:border-0
                  "
                />
              ) : (
                draft.quantity
              )}
            </TableCell>

            <TableCell className="px-6 py-4 text-right">
              {activeDraftField === "sellingPrice" ? (
                <Input
                  ref={priceRef}
                  type="number"
                  min={0}
                  value={draft.sellingPrice}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      sellingPrice: Number(e.target.value),
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitDraft();
                  }}
                  className="
                    h-9
                    bg-transparent
                    border-0
                    pl-9
                    text-xl
                    shadow-none
                    focus:outline-none
                    focus:ring-0
                    focus:border-0
                    focus-visible:outline-none
                    focus-visible:ring-0
                    focus-visible:border-0
                  "
                />
              ) : (
                draft.sellingPrice
              )}
            </TableCell>

            <TableCell className="px-6 py-4 text-right font-medium">
              {(draft.quantity * draft.sellingPrice).toFixed(2)}
            </TableCell>

            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}