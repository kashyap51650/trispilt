"use client";

import ContributionItem from "@/components/ContributionItem";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/constants";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useContribution } from "@/hooks/useContribution";
import { Contribution } from "@/types";
import { getFullMonthAndYear } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";

const ContributionListSkeleton: React.FC<{ count?: number }> = ({
  count = 3,
}) => {
  return (
    <ul className="divide-y divide-border rounded-md bg-card/50">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="px-2 sm:px-3 py-2">
          <div className="animate-pulse flex items-center space-x-4 py-2 px-3">
            <div className="rounded-full bg-muted h-10 w-10" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
            <div className="h-4 bg-muted rounded w-12" />
          </div>
        </li>
      ))}
    </ul>
  );
};

const ContributionPage = () => {
  const { contributions, loading, getContributions, getSelfContributions } =
    useContribution();
  const [tabValue, setTabValue] = useState("all");
  const { user } = useAuthUser();

  useEffect(() => {
    if (tabValue === "all") {
      getContributions();
    } else {
      console.log("user?.id", user?.id);
      getSelfContributions(user?.id || "");
    }
  }, [tabValue]);

  const onTabChange = (value: string) => {
    setTabValue(value);
  };

  const totalContributions = contributions.length;

  const totalContributionAmountPerMonth = useCallback(
    (contributions: Contribution[]) => {
      return contributions.reduce(
        (total, curr) => total + (curr.amount || 0),
        0
      );
    },
    [contributions]
  );
  return (
    <PageWrapper>
      <PageHeader title="Contributions" backRoute={ROUTES.profile} />

      <Tabs
        defaultValue={tabValue}
        className="w-full"
        onValueChange={onTabChange}
      >
        <TabsList className="grid grid-cols-2 w-full h-10 bg-muted/30">
          <TabsTrigger value="all">Members</TabsTrigger>
          <TabsTrigger value="self">Self</TabsTrigger>
        </TabsList>

        {loading && <ContributionListSkeleton count={5} />}

        {!loading && (
          <>
            <TabsContent value="all" className="mt-4 space-y-2">
              {totalContributions !== 0 &&
                contributions.map((contribution) => {
                  return (
                    <section
                      key={contribution.month}
                      aria-labelledby={contribution.month}
                    >
                      <div className="flex justify-between">
                        <h2
                          id="aug-2025"
                          className="text-sm font-semibold text-muted-foreground mb-2"
                        >
                          {getFullMonthAndYear(contribution.month)}
                        </h2>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          Total ₹{" "}
                          {totalContributionAmountPerMonth(contribution.items)}
                        </p>
                      </div>
                      <ul className="divide-y divide-border rounded-md bg-card/50">
                        {contribution.items.map((c) => (
                          <li key={`all-${c.id}`} className="px-2 sm:px-3 py-2">
                            <ContributionItem
                              name={c.user.name}
                              avatar={c.user.avatar}
                              date={c.date}
                              status={"paid"}
                              className="py-1"
                            />
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
            </TabsContent>

            <TabsContent value="self" className="mt-4">
              {totalContributions !== 0 &&
                contributions.map((contribution) => {
                  return (
                    <section
                      key={contribution.month}
                      aria-labelledby={contribution.month}
                    >
                      <div className="flex justify-between">
                        <h2
                          id="aug-2025"
                          className="text-sm font-semibold text-muted-foreground mb-2"
                        >
                          {getFullMonthAndYear(contribution.month)}
                        </h2>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          Total ₹{" "}
                          {totalContributionAmountPerMonth(contribution.items)}
                        </p>
                      </div>
                      <ul className="divide-y divide-border rounded-md bg-card/50">
                        {contribution.items.map((c) => (
                          <li key={`all-${c.id}`} className="px-2 sm:px-3 py-2">
                            <ContributionItem
                              name={c.user.name}
                              avatar={c.user.avatar}
                              date={c.date}
                              status={"paid"}
                              className="py-1"
                            />
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
            </TabsContent>
          </>
        )}
      </Tabs>
    </PageWrapper>
  );
};

export default ContributionPage;
