import { CheckCircle } from "lucide-react";
import AppAvatar from "./AppAvatar";
import { cn } from "@/lib/utils";
import React from "react";

interface ContributionItemProps {
  name: string;
  avatar: string;
  date?: string;
  status: "paid" | "pending";
  className?: string;
}

const ContributionItem = ({
  name,
  avatar,
  date,
  status,
  className,
}: ContributionItemProps) => {
  return (
    <div className={cn("flex items-center gap-4 justify-between", className)}>
      <div className="flex items-center gap-4">
        <AppAvatar src={avatar} />
        <div>
          <p className="font-medium">{name}</p>
          {date && <p className="text-sm text-muted">Paid on {date}</p>}
        </div>
      </div>
      <div className="text-right">
        {status === "paid" ? (
          <CheckCircle className="text-green-300" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-amber-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ContributionItem;
