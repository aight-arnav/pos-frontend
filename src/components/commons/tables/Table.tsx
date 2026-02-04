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
import { Search, Settings2 } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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


export function TableComponent<T extends { id?: number | string }>({
  columns,
  data,
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
      {/* Top Utilities Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-white border-b border-gray-100">
        <div className="relative flex items-center gap-2 w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-2 pointer-events-none" />
          <Input
            placeholder={searchPlaceholder || "Search..."}
            className="pl-8 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
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
                    <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="mr-2"
                    />
                    {col.label}
                    </DropdownMenuItem>
                );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Heading Row */}
      <ShadTable>
        <TableHeader className="bg-gray-50">
          <TableRow>
            {activeColumns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={`px-6 py-3 text-xs font-semibold uppercase text-gray-600 ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx} className="animate-pulse">
                  {activeColumns.map((col) => (
                    <TableCell key={String(col.key)} className="px-6 py-4">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : data.map((row, idx) => (
                <TableRow
                  key={row.id ?? idx}
                  className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  {activeColumns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={`px-6 py-4 text-sm text-gray-700 ${
                        col.align === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {typeof col.render === "function"
                        ? col.render(row, idx)
                        : (row[col.key as keyof T] as ReactNode)}

                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </ShadTable>

      {/* Bottom Pagination Row */}
      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
          <div>
            Showing{" "}
            <span className="font-medium text-gray-900">
              {(pagination.page - 1) * pagination.pageSize + 1}
            </span>
            –
            <span className="font-medium text-gray-900">
              {Math.min(
                pagination.page * pagination.pageSize,
                pagination.total
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900">
              {pagination.total}
            </span>{" "}
            {pagination.label ?? "items"}
          </div>

          <div className="flex items-center gap-1">
            <Button
                size="sm"
                variant="outline"
                onClick={() =>
                pagination.onPageChange?.(pagination.page - 1)
                }
                disabled={pagination.page <= 1}
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
                onClick={() =>
                pagination.onPageChange?.(pagination.page + 1)
                }
                disabled={pagination.page >= totalPages}
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}