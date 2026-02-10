"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { OutlineButton } from "@/components/commons/buttons/OutlinedButton";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

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
        <PrimaryButton className="gap-2 shadow-sm">
          <UploadCloud className="h-4 w-4" />
          Upload TSV
        </PrimaryButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg border border-stone-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-900">
            Upload Inventory
          </DialogTitle>
          <DialogDescription>
            Upload a TSV file to bulk update inventory quantities.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Instructions */}
          <div className="rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
            <p className="font-semibold text-gray-700 mb-1">
              Required columns
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>barcode</li>
              <li>quantity</li>
            </ul>
          </div>

          {/* Upload Box */}
          <label
            htmlFor="inventory-upload"
            className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50"
          >
            <UploadCloud className="h-10 w-10 text-gray-400 group-hover:text-blue-500" />

            <p className="mt-3 text-sm font-medium text-gray-700">
              {file ? "File selected" : "Click to upload or drag & drop"}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              TSV files only
            </p>

            {file && (
              <div className="mt-4 flex items-center gap-2 rounded-md bg-stone-100 px-3 py-1 text-sm text-gray-700">
                <FileText className="h-4 w-4" />
                {file.name}
              </div>
            )}

            <input
              id="inventory-upload"
              type="file"
              accept=".tsv"
              className="hidden"
              onChange={(e) =>
                setFile(e.target.files?.[0] ?? null)
              }
            />
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <OutlineButton
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </OutlineButton>

            <PrimaryButton
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Upload Inventory"
              )}
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}