"use client";

import {
  SalesReportStats as StatsType,
} from "@/lib/types/Report";

interface Props {
  stats: StatsType | null;
}

export function SalesReportStats({ stats }: Props) {
  if (!stats) return null;
  

  const isDayReport = "totalDays" in stats;

  return (
    <div className="grid grid-cols-4 gap-4 rounded-lg bg-white p-4 shadow-sm">

      {isDayReport ? (
        <>
          <StatCard label="Total Days" value={stats.totalDays} />
          <StatCard label="Total Orders" value={stats.totalOrders} />
          <StatCard label="Total Items Sold" value={stats.totalItemsSold} />
          <StatCard label="Total Revenue" value={`₹ ${stats.totalRevenue.toFixed(2)}`} />
          <StatCard label="Avg Daily Revenue" value={`₹ ${stats.avgDailyRevenue.toFixed(2)}`} />
        </>
      ) : (
        <>
          <StatCard label="Total Products" value={stats.totalProducts} />
          <StatCard label="Total Quantity Sold" value={stats.totalQuantitySold} />
          <StatCard label="Total Revenue" value={`₹ ${stats.totalRevenue.toFixed(2)}`} />
        </>
      )}

    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold">
        {typeof value === "number"
          ? value.toLocaleString()
          : value}
      </p>
    </div>
  );
}