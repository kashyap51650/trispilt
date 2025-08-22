import { ChevronLeft } from "lucide-react";
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <header className="grid grid-cols-3 items-center gap-4 w-full">
      <div className="bg-primary/10 rounded-full p-1 text-primary cursor-pointer hover:bg-primary/20 transition w-fit">
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
