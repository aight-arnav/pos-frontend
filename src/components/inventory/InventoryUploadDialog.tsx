"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  onUpload: (file: File) => Promise<void>;
}

export function InventoryUploadDialog({ onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    try {
      await onUpload(file);
      setFile(null);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload TSV</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Inventory TSV</DialogTitle>
          <DialogDescription>
            Upload a TSV file to bulk update inventory quantities.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-gray-700 mb-1">
              Expected columns:
            </p>
            <ul className="list-disc list-inside">
              <li>barcode</li>
              <li>quantity</li>
            </ul>
          </div>

          <Input
            type="file"
            accept=".tsv"
            onChange={(e) =>
              setFile(e.target.files?.[0] ?? null)
            }
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}