import PageHeader from "@/components/PageHeader";
import TransactionCard from "@/components/TransactionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const page = () => {
  return (
    <div>
      <PageHeader
        title="Transaction"
        description="Track all your income/expense here"
      />
      <Tabs defaultValue="all" className="w-full mt-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="category">Income</TabsTrigger>
          <TabsTrigger value="person">Expense</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-2">
          <div className="space-y-3">
            <TransactionCard
              title="Software Development"
              description="Website development project"
              type="income"
              amount={8000}
              tag="Freelance"
              date="13/12/2024"
              by="Yash"
            />

            <TransactionCard
              title="Server Hosting"
              description="Monthly AWS bill"
              type="expense"
              amount={2500}
              tag="Infrastructure"
              date="10/12/2024"
              by="Chirag"
            />
            <TransactionCard
              title="Client Payment"
              description="Payment received from Project Alpha"
              type="income"
              amount={15000}
              tag="Client"
              date="15/12/2024"
              by="Mehul"
            />

            <TransactionCard
              title="Software Subscription"
              description="Figma team plan monthly"
              type="expense"
              amount={1200}
              tag="Tools"
              date="18/12/2024"
              by="Kashyap"
            />

            <TransactionCard
              title="Team Lunch"
              description="Monthly team bonding lunch"
              type="expense"
              amount={3000}
              tag="Team"
              date="20/12/2024"
              by="Ravi"
            />

            <TransactionCard
              title="Consulting Fee"
              description="Paid to external consultant for audit"
              type="expense"
              amount={5000}
              tag="Consulting"
              date="22/12/2024"
              by="Amit"
            />

            <TransactionCard
              title="SaaS Income"
              description="December subscription revenue"
              type="income"
              amount={25000}
              tag="SaaS"
              date="25/12/2024"
              by="System"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
