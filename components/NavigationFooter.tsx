"use client";
import { useRouter } from "next/navigation";
import React from "react";
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
  navigateTo: string;
}

const navigationItems: NavigationItem[] = [
  {
    icon: HomeIcon,
    label: "Home",
    ariaLabel: "Home",
    navigateTo: "/dashboard", // Home page
  },
  {
    icon: DocumentCurrencyRupeeIcon,
    label: "Transaction",
    ariaLabel: "Expenses",
    navigateTo: "/transactions", // Transaction page
  },
  {
    icon: ClipboardDocumentListIcon,
    label: "Reports",
    ariaLabel: "Reports",
    navigateTo: "/reports", // Reports page
  },
  {
    icon: UserIcon,
    label: "Profile",
    ariaLabel: "Profile",
    navigateTo: "/profile", // Profile page
  },
];

const NavigationFooter: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-card sticky bottom-0 flex justify-between items-center shadow-md rounded-lg border-0 z-10 w-full">
      <div className="flex justify-between w-full gap-4 px-6 py-4">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center hover:text-primary cursor-pointer"
            aria-label={item.ariaLabel}
            onClick={() => router.push(item.navigateTo)} // Navigate to the respective page
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationFooter;
