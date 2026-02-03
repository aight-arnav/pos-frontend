"use client";

import React, { ReactNode } from "react";
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


type AccessorColumn<T> = {
  key: keyof T;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (row: T, index: number) => ReactNode;
};

type VirtualColumn<T> = {
  key: string;
  label: string;
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
            className="pl-8 bg-white border-none focus:border-none "
          />
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {dateFilter && (
            <Button size="sm" variant="outline" onClick={dateFilter.onClick}>
              {dateFilter.value}
            </Button>
          )}
          {pagination && (
            <Button size="sm" variant="outline">
              Show {pagination.pageSize} rows
            </Button>
          )}
          <Button size="sm" variant="outline">
            <Settings2 className="w-4 h-4" /> Manage Columns
          </Button>
        </div>
      </div>

      {/* Heading Row */}
      <ShadTable>
        <TableHeader className="bg-gray-50">
          <TableRow>
            {columns.map((col) => (
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
                  {columns.map((col) => (
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
                  {columns.map((col) => (
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
            </span>
          </div>

          <div className="flex gap-1">
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
              &gt;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}