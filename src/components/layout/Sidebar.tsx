"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  ShoppingCart,
  NotebookPen,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const MAIN_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Products", href: "/products", icon: Package },
  { label: "Inventory", href: "/inventory", icon: Boxes },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Create order", href: "/orders/create", icon: NotebookPen },
];

export function SidebarApp() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const items =
    user?.role === "OPERATOR"
      ? (() => {
          const create = MAIN_ITEMS.find((i) => i.href === "/orders/create");
          const others = MAIN_ITEMS.filter(
            (i) => i.href !== "/dashboard" && i.href !== "/orders/create"
          );
          return create ? [create, ...others] : others;
        })()
      : MAIN_ITEMS;

  return (
    <Sidebar className="border-r bg-stone-50">
      {/* Brand */}
      <div className="px-6 py-5 border-b">
        <div className="text-lg font-semibold tracking-tight text-zinc-900">
          POS System
        </div>
        <p className="text-xs text-zinc-500">
          Admin Dashboard
        </p>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-medium tracking-wide text-zinc-500">
            MAIN
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={clsx(
                          "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-white font-medium text-zinc-900 shadow-sm"
                            : "text-zinc-600 hover:bg-white hover:text-zinc-900"
                        )}
                      >
                        {/* Active indicator */}
                        {active && (
                          <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r bg-blue-600" />
                        )}

                        <Icon
                          className={clsx(
                            "h-4 w-4 transition-colors",
                            active
                              ? "text-blue-600"
                              : "text-zinc-400 group-hover:text-zinc-700"
                          )}
                        />

                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-zinc-700 hover:text-zinc-900"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}