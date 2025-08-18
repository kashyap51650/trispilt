import ContributionItem from "@/components/ContributionItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

type Status = "paid" | "pending";

interface Contributor {
  name: string;
  avatar: string;
  status: Status;
  date?: string;
}

const contributors: Contributor[] = [
  { name: "Yash Shah", avatar: "/uiface-1.jpg", date: "Dec 1", status: "paid" },
  {
    name: "Chirag Rathva",
    avatar: "/uiface-2.jpg",
    date: "Dec 1",
    status: "paid",
  },
  { name: "Kashyap Patel", avatar: "/uiface-3.jpg", status: "pending" },
];

const filterByStatus = (items: Contributor[], status?: Status) =>
  status ? items.filter((i) => i.status === status) : items;

const page = () => {
  return (
    <div>
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Contributions</h1>
        <p className="text-muted-foreground">
          Track this month’s group contributions
        </p>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-2">
          <section aria-labelledby="aug-2025">
            <div className="flex justify-between">
              <h2
                id="aug-2025"
                className="text-sm font-semibold text-muted-foreground mb-2"
              >
                August 2025
              </h2>
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Total ₹ 4,000
              </p>
            </div>
            <ul className="divide-y divide-border rounded-md bg-card/50">
              {filterByStatus(contributors).map((c) => (
                <li key={`all-${c.name}`} className="px-2 sm:px-3 py-2">
                  <ContributionItem
                    name={c.name}
                    avatar={c.avatar}
                    date={c.date}
                    status={c.status}
                    className="py-1"
                  />
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="aug-2025">
            <div className="flex justify-between">
              <h2
                id="aug-2025"
                className="text-sm font-semibold text-muted-foreground mb-2"
              >
                July 2025
              </h2>
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Total ₹ 4,000
              </p>
            </div>
            <ul className="divide-y divide-border rounded-md bg-card/50">
              {filterByStatus(contributors).map((c) => (
                <li key={`all-${c.name}`} className="px-2 sm:px-3 py-2">
                  <ContributionItem
                    name={c.name}
                    avatar={c.avatar}
                    date={c.date}
                    status={c.status}
                    className="py-1"
                  />
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="aug-2025">
            <div className="flex justify-between">
              <h2
                id="aug-2025"
                className="text-sm font-semibold text-muted-foreground mb-2"
              >
                June 2025
              </h2>
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Total ₹ 4,000
              </p>
            </div>
            <ul className="divide-y divide-border rounded-md bg-card/50">
              {filterByStatus(contributors).map((c) => (
                <li key={`all-${c.name}`} className="px-2 sm:px-3 py-2">
                  <ContributionItem
                    name={c.name}
                    avatar={c.avatar}
                    date={c.date}
                    status={c.status}
                    className="py-1"
                  />
                </li>
              ))}
            </ul>
          </section>
        </TabsContent>

        <TabsContent value="paid" className="mt-4">
          <section aria-labelledby="aug-2025-paid">
            <h2
              id="aug-2025-paid"
              className="text-sm font-semibold text-muted-foreground mb-2"
            >
              August 2025 · Paid
            </h2>
            <ul className="divide-y divide-border rounded-md bg-card/50">
              {filterByStatus(contributors, "paid").map((c) => (
                <li key={`paid-${c.name}`} className="px-2 sm:px-3 py-2">
                  <ContributionItem
                    name={c.name}
                    avatar={c.avatar}
                    date={c.date}
                    status={c.status}
                    className="py-1"
                  />
                </li>
              ))}
            </ul>
          </section>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <section aria-labelledby="aug-2025-pending">
            <h2
              id="aug-2025-pending"
              className="text-sm font-semibold text-muted-foreground mb-2"
            >
              August 2025 · Pending
            </h2>
            <ul className="divide-y divide-border rounded-md bg-card/50">
              {filterByStatus(contributors, "pending").map((c) => (
                <li key={`pending-${c.name}`} className="px-2 sm:px-3 py-2">
                  <ContributionItem
                    name={c.name}
                    avatar={c.avatar}
                    date={c.date}
                    status={c.status}
                    className="py-1"
                  />
                </li>
              ))}
            </ul>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
