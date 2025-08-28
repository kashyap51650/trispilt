import BackGroundEffect from "@/components/effects/BackGroundEffect";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 h-full">
      <BackGroundEffect />
      {children}
    </div>
  );
}
