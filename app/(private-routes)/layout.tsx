import NavigationFooter from "@/components/NavigationFooter";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow relative p-4">{children}</div>
      <NavigationFooter />
    </div>
  );
}
