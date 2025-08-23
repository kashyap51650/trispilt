import AppCard from "@/components/AppCard";
import { ContributionButton } from "@/components/ContributionButton";
import AddContributionForm from "@/components/form/AddContributionForm";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { CONTRIBUTION_MONTHS } from "@/constants";
import { Months } from "@/types";

export default function AddContributionPage() {
  return (
    <PageWrapper>
      <PageHeader title="Make Contribution" />

      <AppCard>
        <h2 className="mb-4 font-medium">
          Monthly Contribution{" "}
          <span className="text-muted-foreground text-sm">Year 2025</span>
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {CONTRIBUTION_MONTHS.map((month) => (
            <ContributionButton key={month} month={month as Months} />
          ))}
        </div>
      </AppCard>
      <AppCard>
        <h2 className="mb-4 font-medium">Custom Contribution</h2>
        <AddContributionForm />
      </AppCard>
    </PageWrapper>
  );
}
