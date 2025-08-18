import MonthlyContribution from "@/components/MonthlyContribution";
import StateCard from "@/components/StateCard";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-black mb-1">
          <span className="font-normal">Hello</span> Kashyap
        </h1>
        <p className="text-muted-foreground">
          Welcome to Group Finance Management
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 my-6">
        <StateCard
          stateNumber="₹ 87,351"
          stateDescription="Total Balance"
          classname="bg-primary/20"
        />
        <StateCard
          stateNumber="₹ 12,000"
          stateDescription="Total Expenses"
          classname="bg-destructive/20"
        />
        <StateCard
          stateNumber="₹ 34,400"
          stateDescription="Total Investment"
          classname="bg-secondary/20"
        />
        <StateCard
          stateNumber="₹ 6,000"
          stateDescription="Total Contribution"
        />
      </div>
      <div className="my-6">
        <MonthlyContribution />
      </div>
    </div>
  );
};

export default DashboardPage;
