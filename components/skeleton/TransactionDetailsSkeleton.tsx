import React from "react";
import { Card } from "../ui/card";

export const TransactionDetailsSkeleton = () => {
  return (
    <Card className="p-4 border border-muted/20 bg-muted/5 animate-pulse">
      {/* Focused Amount Section */}
      <div className="text-center mb-4">
        <div className="flex flex-col items-center justify-center mb-3">
          {/* Amount */}
          <div className="h-8 w-24 bg-muted/20 rounded mb-2" />
          {/* Title */}
          <div className="h-5 w-32 bg-muted/20 rounded" />
        </div>
      </div>

      {/* Transaction Information */}
      <div className="space-y-3 text-sm">
        {/* Category */}
        <div className="flex justify-between items-center">
          <span className="h-4 w-20 bg-muted/20 rounded" />
          <span className="h-4 w-16 bg-muted/10 rounded" />
        </div>

        {/* Date */}
        <div className="flex justify-between items-center">
          <span className="h-4 w-20 bg-muted/20 rounded" />
          <span className="h-4 w-24 bg-muted/10 rounded" />
        </div>

        {/* Created By */}
        <div className="flex justify-between items-center">
          <span className="h-4 w-20 bg-muted/20 rounded" />
          <span className="h-4 w-20 bg-muted/10 rounded" />
        </div>

        {/* Transaction ID */}
        <div className="flex justify-between items-center">
          <span className="h-4 w-24 bg-muted/20 rounded" />
          <span className="h-4 w-16 bg-muted/10 rounded" />
        </div>

        {/* Type (badge mimic) */}
        <div className="flex justify-between items-center">
          <span className="h-4 w-20 bg-muted/20 rounded" />
          <span className="h-6 w-16 bg-muted/20 rounded-full" />
        </div>
      </div>
    </Card>
  );
};
