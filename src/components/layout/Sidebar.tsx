"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Clients", href: "/clients" },
  { label: "Products", href: "/products" },
  { label: "Inventory", href: "/inventory" },
  { label: "Orders", href: "/orders" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    // later: clear auth token
    router.push("/login");
  }

  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      <div className="p-6 font-semibold text-lg border-b">
        POS System
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "block px-4 py-2 rounded-lg text-sm",
              pathname === item.href
                ? "bg-muted font-medium"
                : "hover:bg-muted/50"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}