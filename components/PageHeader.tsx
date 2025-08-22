"use client";

import { ChevronLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
interface PageHeaderProps {
  title: string;
  description?: string;
  backRoute?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  backRoute,
}) => {
  const router = useRouter();

  const backNavigation = () => {
    router.push(backRoute || ROUTES.dashboard);
  };

  return (
    <header className="grid grid-cols-3 items-center gap-4 w-full">
      <div
        className="bg-primary/10 rounded-full p-1 text-primary cursor-pointer hover:bg-primary/20 transition w-fit"
        onClick={backNavigation}
      >
        <ChevronLeft />
      </div>
      <div>
        <h1>{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
