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
      className={`bg-card text-card-foreground shadow-md shadow-foreground/10 ${className}`}
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
