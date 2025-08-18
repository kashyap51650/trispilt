import React from "react";
import AppCard from "./AppCard";

interface StateCardProps {
  stateNumber: string;
  stateDescription: string;
  classname?: string;
}

const StateCard: React.FC<StateCardProps> = ({
  stateNumber,
  stateDescription,
  classname,
}) => {
  return (
    <AppCard className={classname || `bg-primary/20`}>
      <div>
        <p className="text-2xl font-bold mb-1">{stateNumber}</p>
        <p className="text-sm">{stateDescription}</p>
      </div>
    </AppCard>
  );
};

export default StateCard;
