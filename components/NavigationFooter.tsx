"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardDocumentListIcon,
  DocumentCurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon, UserIcon } from "lucide-react";

// Define the type for navigation items
interface NavigationItem {
  icon: React.ElementType;
  label: string;
  ariaLabel: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { icon: HomeIcon, label: "Home", ariaLabel: "Home", href: "/dashboard" },
  {
    icon: DocumentCurrencyRupeeIcon,
    label: "Transaction",
    ariaLabel: "Expenses",
    href: "/transactions",
  },
  {
    icon: ClipboardDocumentListIcon,
    label: "Reports",
    ariaLabel: "Reports",
    href: "/reports",
  },
  { icon: UserIcon, label: "Profile", ariaLabel: "Profile", href: "/profile" },
];

const NavigationFooter: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className="sticky bottom-0 z-50 w-full border-t bg-card/80 supports-[backdrop-filter]:backdrop-blur-md"
      aria-label="Bottom navigation"
      role="navigation"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-between gap-1 px-3 py-2">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-label={item.ariaLabel}
                aria-current={isActive ? "page" : undefined}
                className={`group flex flex-col items-center justify-center rounded-md px-2 py-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  className={`mb-1 h-5 w-5 transition-transform ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`}
                />
                <span className="text-[11px] font-medium leading-none">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationFooter;
