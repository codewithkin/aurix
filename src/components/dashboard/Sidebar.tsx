'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Search,
  Star,
  Bell,
  Settings,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Search Jobs",
    icon: Search,
    href: "/dashboard/search",
  },
  {
    title: "Saved Gigs",
    icon: Star,
    href: "/dashboard/saved",
    badge: "3",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/dashboard/notifications",
    badge: "5",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    title: "Subscription",
    icon: CreditCard,
    href: "/dashboard/subscription",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r min-h-screen p-4 hidden md:block">
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                pathname === item.href && "bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
              {item.badge && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
} 