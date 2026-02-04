"use client";

import React, { ReactNode, useState } from "react";
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Settings2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type AccessorColumn<T> = {
  key: keyof T;
  label: string;
  hidden?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (row: T, index: number) => ReactNode;
};

type VirtualColumn<T> = {
  key: string;
  label: string;
  hidden?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render: (row: T, index: number) => ReactNode;
};

export type Column<T> = AccessorColumn<T> | VirtualColumn<T>;


interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T; // ✅ NEW
  loading?: boolean;
  searchPlaceholder?: string;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    label?: string;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
  };
  dateFilter?: {
    value: string;
    onClick: () => void;
  };
}

/* ---------------- component ---------------- */

export function TableComponent<T>({
  columns,
  data,
  rowKey,
  loading,
  searchPlaceholder,
  pagination,
  dateFilter,
}: TableProps<T>) {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.filter((c) => !c.hidden).map((c) => String(c.key))
  );

  const activeColumns = columns.filter((c) =>
    visibleColumns.includes(String(c.key))
  );

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 1;

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
      {/* Top Utilities */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-b">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            placeholder={searchPlaceholder || "Search..."}
            className="pl-8 border-none shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-2">
          {dateFilter && (
            <Button size="sm" variant="outline" onClick={dateFilter.onClick}>
              {dateFilter.value}
            </Button>
          )}

          {pagination && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  Show {pagination.pageSize} rows
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[5, 10, 20, 50].map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => pagination.onPageSizeChange?.(size)}
                  >
                    {size} rows
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <Settings2 className="w-4 h-4 mr-2" />
                Manage Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {columns.map((col) => {
                const key = String(col.key);
                const checked = visibleColumns.includes(key);

                return (
                  <DropdownMenuItem
                    key={key}
                    onClick={() =>
                      setVisibleColumns((prev) =>
                        checked
                          ? prev.filter((k) => k !== key)
                          : [...prev, key]
                      )
                    }
                  >
                    <input type="checkbox" readOnly checked={checked} className="mr-2" />
                    {col.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <ShadTable>
        <TableHeader className="bg-gray-50">
          <TableRow>
            {activeColumns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={`px-6 py-3 text-xs font-semibold uppercase ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {activeColumns.map((col) => (
                    <TableCell key={String(col.key)} className="px-6 py-4">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : data.map((row, idx) => (
                <TableRow
                  key={String(row[rowKey])} // ✅ FIXED
                  className="hover:bg-gray-50"
                >
                  {activeColumns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={`px-6 py-4 ${
                        col.align === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {"render" in col && col.render
                        ? col.render(row, idx)
                        : (row[col.key as keyof T] as ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </ShadTable>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t text-sm">
          <div>
            Showing{" "}
            <strong>
              {(pagination.page - 1) * pagination.pageSize + 1}
            </strong>
            –
            <strong>
              {Math.min(
                pagination.page * pagination.pageSize,
                pagination.total
              )}
            </strong>{" "}
            of <strong>{pagination.total}</strong>{" "}
            {pagination.label ?? "items"}
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              disabled={pagination.page <= 1}
              onClick={() =>
                pagination.onPageChange?.(pagination.page - 1)
              }
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                size="sm"
                variant={i + 1 === pagination.page ? "default" : "outline"}
                onClick={() => pagination.onPageChange?.(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              disabled={pagination.page >= totalPages}
              onClick={() =>
                pagination.onPageChange?.(pagination.page + 1)
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}