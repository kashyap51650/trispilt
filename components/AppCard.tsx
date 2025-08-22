import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";

interface AppCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const AppCard: React.FC<AppCardProps> = ({ children, title, className }) => {
  return (
    <Card
      className={`backdrop-blur-md bg-card/60 hover:bg-card/80 transition-all ${className}`}
    >
      {title && (
        <CardTitle className="text-md font-bold text-muted px-6">
          {title}
        </CardTitle>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AppCard;
