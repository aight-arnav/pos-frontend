"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  LogOut,
  Moon,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

const MAIN_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Products", href: "/products", icon: Package },
  { label: "Inventory", href: "/inventory", icon: Boxes },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Create order", href: "/orders/create", icon: ShoppingCart },
];

export function SidebarApp() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    router.push("/login");
  }

  return (
    <Sidebar className="bg-muted/40 border-r">
      {/* Top brand */}
      <div className="px-6 py-5 border-b font-semibold text-lg">
        POS System
      </div>

      <SidebarContent>
        {/* MAIN */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs tracking-wide text-muted-foreground">
            MAIN
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_ITEMS.map(item => {
                const active = pathname === item.href;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={clsx(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-background shadow-sm font-medium"
                            : "hover:bg-background/70"
                        )}
                      >
                        <Icon className="h-4 w-4" />
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
      <SidebarFooter className="p-4 space-y-3">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}