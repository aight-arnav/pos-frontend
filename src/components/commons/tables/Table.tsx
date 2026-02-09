"use client";

import React, { ReactNode, useMemo, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Search,
  Settings2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------------- column types ---------------- */

type AccessorColumn<T> = {
  key: keyof T;
  label: string;
  hidden?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (row: T, index: number) => ReactNode;
};

type VirtualColumn<T> = {
  key: string;
  label: string;
  hidden?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render: (row: T, index: number) => ReactNode;
};

export type Column<T> = AccessorColumn<T> | VirtualColumn<T>;

/* ---------------- props ---------------- */

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T;
  loading?: boolean;
  searchPlaceholder?: string;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    label?: string;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  expandable?: {
    renderExpandedRow: (row: T) => ReactNode;
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
  expandable,
}: TableProps<T>) {
  const [expandedRow, setExpandedRow] = useState<T[keyof T] | null>(null);

  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(
    columns.filter((c) => !c.hidden).map((c) => String(c.key))
  );

  const activeColumns = useMemo(
    () => columns.filter((c) => visibleColumnKeys.includes(String(c.key))),
    [columns, visibleColumnKeys]
  );

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 1;

  function toggleExpand(key: T[keyof T]) {
    setExpandedRow((prev) => (prev === key ? null : key));
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      {/* ---------- toolbar ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-zinc-50/60 px-4 py-3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder={searchPlaceholder ?? "Search..."}
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
        </div>

        <div className="flex items-center gap-2">
          {pagination && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 rounded-sm border-zinc-200 bg-white px-4 text-sm"
                >
                  Show {pagination.pageSize} rows
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[5, 10, 20, 50].map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => pagination.onPageSizeChange(size)}
                  >
                    {size} rows
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="h-9 rounded-sm border-zinc-200 bg-white px-4 text-sm"
              >
                <Settings2 className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {columns.map((col) => {
                const key = String(col.key);
                const checked = visibleColumnKeys.includes(key);

                return (
                  <DropdownMenuItem
                    key={key}
                    onClick={() =>
                      setVisibleColumnKeys((prev) =>
                        checked
                          ? prev.filter((k) => k !== key)
                          : [...prev, key]
                      )
                    }
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={checked}
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

      {/* ---------- table ---------- */}
      <ShadTable>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            {expandable && <TableHead className="w-10" />}
            {activeColumns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={`px-6 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 ${
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
                <TableRow
                  key={i}
                  className="transition-colors hover:bg-zinc-50"
                >
                  {expandable && (
                    <TableCell>
                      <Skeleton className="h-4 w-4" />
                    </TableCell>
                  )}
                  {activeColumns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className={`px-6 py-4 text-sm text-zinc-700 ${
                        col.align === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : data.map((row, index) => {
                const key = row[rowKey];
                const expanded = expandedRow === key;

                return (
                  <React.Fragment key={String(key)}>
                    <TableRow className="transition-colors hover:bg-zinc-50">
                      {expandable && (
                        <TableCell>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full hover:bg-zinc-100"
                            onClick={() => toggleExpand(key)}
                          >
                            {expanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRightIcon className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      )}

                      {activeColumns.map((col) => (
                        <TableCell
                          key={String(col.key)}
                          className={`px-6 py-4 text-sm text-zinc-700 ${
                            col.align === "right" ? "text-right" : "text-left"
                          }`}
                        >
                          {"render" in col && col.render
                            ? col.render(row, index)
                            : (row[col.key as keyof T] as ReactNode)}
                        </TableCell>
                      ))}
                    </TableRow>

                    {expanded && expandable && (
                      <TableRow className="bg-zinc-50/70">
                        <TableCell
                          colSpan={activeColumns.length + 1}
                          className="px-6 py-4"
                        >
                          {expandable.renderExpandedRow(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
        </TableBody>
      </ShadTable>

      {/* ---------- pagination ---------- */}
      {pagination && (
        <div className="flex items-center justify-between border-t bg-zinc-50/60 px-6 py-3 text-sm text-zinc-600">
          <div>
            Showing{" "}
            <strong>
              {(pagination.page - 1) * pagination.pageSize + 1}
            </strong>{" "}
            –{" "}
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
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              className="h-8 w-8 rounded-sm p-0  border"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                size="sm"
                // variant={pagination.page === i + 1 ? "default" : "outline"}
                variant="outline"
                onClick={() => pagination.onPageChange(i + 1)}
                className={`h-8 min-w-8 rounded-sm px-3 border ${pagination.page === i + 1 ? `border-black`: ``}`}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              className="h-8 w-8 rounded-sm p-0 border"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}