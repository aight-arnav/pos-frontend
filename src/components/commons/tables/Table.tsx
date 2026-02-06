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
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      {/* ---------- toolbar ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-b">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder ?? "Search..."}
            className="pl-8"
          />
        </div>

        <div className="flex items-center gap-2">
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
              <Button size="sm" variant="outline">
                <Settings2 className="w-4 h-4 mr-2" />
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
        <TableHeader className="bg-muted">
          <TableRow>
            {expandable && <TableHead className="w-10" />}
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
                  {expandable && (
                    <TableCell>
                      <Skeleton className="h-4 w-4" />
                    </TableCell>
                  )}
                  {activeColumns.map((col) => (
                    <TableCell key={String(col.key)} className="px-6 py-4">
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
                    <TableRow className="hover:bg-muted/40">
                      {expandable && (
                        <TableCell className="px-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleExpand(key)}
                          >
                            {expanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRightIcon className="w-4 h-4" />
                            )}
                          </Button>
                        </TableCell>
                      )}

                      {activeColumns.map((col) => (
                        <TableCell
                          key={String(col.key)}
                          className={`px-6 py-4 ${
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
                      <TableRow className="bg-muted/30">
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
        <div className="flex items-center justify-between px-6 py-3 border-t bg-muted/20 text-sm">
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
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                size="sm"
                variant={pagination.page === i + 1 ? "default" : "outline"}
                onClick={() => pagination.onPageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}