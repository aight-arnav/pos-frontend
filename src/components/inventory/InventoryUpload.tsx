"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  onUpload: (file: File) => Promise<void>;
}

export function InventoryUpload({ onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    try {
      await onUpload(file);
      setFile(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Input
        type="file"
        accept=".tsv"
        onChange={(e) =>
          setFile(e.target.files?.[0] ?? null)
        }
      />

      <Button
        disabled={!file || loading}
        onClick={handleUpload}
      >
        {loading ? "Uploading..." : "Upload TSV"}
      </Button>
    </div>
  );
}