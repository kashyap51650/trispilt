import AppAvatar from "@/components/AppAvatar";
import MonthlyContribution from "@/components/MonthlyContribution";
import QuickActionCard from "@/components/QuickActionCard";
import StateCard from "@/components/StateCard";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <main className="space-y-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <Link href="/profile" aria-label="Go to profile" className="shrink-0">
          <AppAvatar src="/uiface-1.jpg" width={60} height={60} fallback="KP" />
        </Link>
        <div>
          <h1 className="leading-tight font-normal text-muted-foreground">
            Welcome Back!
          </h1>
          <p className="text-xl font-bold">Kashyap Patel</p>
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

      <MonthlyContribution />

      <QuickActionCard />

      {/* Monthly contribution */}
      <section></section>
    </main>
  );
};

export default DashboardPage;
