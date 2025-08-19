import MonthlyContribution from "@/components/MonthlyContribution";
import StateCard from "@/components/StateCard";
import AppAvatar from "@/components/AppAvatar";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="space-y-6">
      {/* Header */}
      <header className="flex items-center gap-4 pt-4">
        <Link href="/profile" aria-label="Go to profile" className="shrink-0">
          <AppAvatar src="/uiface-1.jpg" width={50} height={50} fallback="KP" />
        </Link>
        <div>
          <h1 className="text-xl font-black leading-tight">
            <span className="font-normal">Hello</span> Kashyap
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">{today}</p>
        </div>
      </header>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 gap-4 ">
          <StateCard
            stateNumber="₹ 87,351"
            stateDescription="Balance"
            classname="bg-primary/20 hover:shadow-sm transition-shadow"
          />
          <StateCard
            stateNumber="₹ 12,000"
            stateDescription="Expenses"
            classname="bg-destructive/20 hover:shadow-sm transition-shadow"
          />
          <StateCard
            stateNumber="₹ 34,400"
            stateDescription="Investment"
            classname="bg-secondary/20 hover:shadow-sm transition-shadow"
          />
          <StateCard
            stateNumber="₹ 50,000"
            stateDescription="Contribution"
            classname="hover:shadow-sm transition-shadow"
          />
        </div>
      </section>

      {/* Monthly contribution */}
      <section>
        <MonthlyContribution />
      </section>
    </main>
  );
};

export default DashboardPage;
