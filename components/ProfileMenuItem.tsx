import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const ProfileMenuItem = ({
  icon,
  label,
  onClick,
  className,
}: ProfileMenuItemProps) => {
  return (
    <li
      className={cn(
        "flex items-center justify-between py-3 px-4 rounded-xl cursor-pointer hover:bg-muted/10 transition hover:text-primary",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 text-sm">
        {icon}
        <span>{label}</span>
      </div>
      <ChevronRight className="h-4 w-4" />
    </li>
  );
};

export default ProfileMenuItem;
