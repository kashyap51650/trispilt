import NavigationFooter from "@/components/NavigationFooter";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow relative p-4">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-60 w-60 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute bottom-10 right-1/3 h-72 w-72 rounded-full bg-secondary/25 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-transparent" />
        </div>
        {children}
      </div>
      <NavigationFooter />
    </div>
  );
}
