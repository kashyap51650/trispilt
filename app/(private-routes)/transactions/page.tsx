"use client";

import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { TransactionListSkeleton } from "@/components/skeleton/TransactionListSkeleton";
import TransactionCard from "@/components/TransactionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PAGE_HEADING } from "@/constants";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionsTab } from "@/types/enum";
import { NotebookPenIcon } from "lucide-react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const tabs = [
  TransactionsTab.ALL,
  TransactionsTab.INCOME,
  TransactionsTab.EXPENSE,
];

const page = () => {
  const [activeTab, setActiveTab] = useState<TransactionsTab>(
    TransactionsTab.ALL
  );

  const { filterTransactionsByType, isLoading } = useTransaction();

  const filteredTransactions = filterTransactionsByType(activeTab);

  const handleTabChange = (tab: TransactionsTab) => {
    setActiveTab(tab);

    if (tab === TransactionsTab.ALL) {
      filterTransactionsByType(TransactionsTab.ALL);
    } else if (tab === TransactionsTab.INCOME) {
      filterTransactionsByType(TransactionsTab.INCOME);
    } else {
      filterTransactionsByType(TransactionsTab.EXPENSE);
    }
  };

  const currentIndex = tabs.indexOf(activeTab);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  return (
    <PageWrapper>
      <PageHeader title={PAGE_HEADING.transactions} />
      <Tabs
        defaultValue="all"
        className="w-full mt-4 h-full"
        onValueChange={(val) => handleTabChange(val as TransactionsTab)}
        value={activeTab}
        {...handlers}
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value={TransactionsTab.ALL}>All</TabsTrigger>
          <TabsTrigger value={TransactionsTab.INCOME}>Income</TabsTrigger>
          <TabsTrigger value={TransactionsTab.EXPENSE}>Expense</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4 space-y-2 h-full">
          {isLoading && <TransactionListSkeleton />}

          {!isLoading && filteredTransactions.length === 0 && (
            <p className="text-muted text-lg my-6 flex items-center justify-center">
              <NotebookPenIcon className="inline mr-2" />
              No transactions found.
            </p>
          )}

          {filteredTransactions.map((tx) => (
            <TransactionCard
              key={tx.title}
              title={tx.title}
              type={tx.type}
              amount={tx.amount}
              tag={tx.category}
            />
          ))}
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export default page;
