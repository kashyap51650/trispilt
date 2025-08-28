import React from "react";

export const TransactionListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-20 bg-muted/30 rounded-md animate-pulse p-4 space-y-2 flex"
        >
          <div className="flex-4 space-y-2">
            <div className="h-4 bg-muted/50 rounded w-1/2" />
            <div className="h-4 bg-muted/50 rounded w-1/4" />
          </div>
          <div className="flex-1 justify-end items-center flex space-y-2">
            <div className="h-4 bg-muted/50 rounded w-full" />
          </div>
        </div>
      ))}
    </>
  );
};
