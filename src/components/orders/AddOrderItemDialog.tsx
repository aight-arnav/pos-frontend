"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { OrderItemForm } from "@/lib/types/Order";

interface Props {
  onAdd: (item: OrderItemForm) => void;
}

export function AddOrderItemDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(0);

  function handleAdd() {
    onAdd({ barcode, quantity, sellingPrice });
    setOpen(false);
    setBarcode("");
    setQuantity(1);
    setSellingPrice(0);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Item</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Order Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Barcode"
            value={barcode}
            onChange={e => setBarcode(e.target.value)}
          />

          <Input
            type="number"
            min={1}
            placeholder="Quantity"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
          />

          <Input
            type="number"
            min={0}
            placeholder="Selling Price"
            value={sellingPrice}
            onChange={e => setSellingPrice(Number(e.target.value))}
          />

          <Button className="w-full" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}