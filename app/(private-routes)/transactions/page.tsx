"use client";

import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import TransactionCard from "@/components/TransactionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionType } from "@/types";
import { NotebookPenIcon } from "lucide-react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const tabs: (TransactionType | "all")[] = [
  "all",
  TransactionType.INCOME,
  TransactionType.EXPENSE,
];

const page = () => {
  const [activeTab, setActiveTab] = useState<TransactionType | "all">("all");

  const { filterTransactionsByType } = useTransaction();

  const filteredTransactions = filterTransactionsByType(activeTab);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // swipe left
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1]);
      }
    }
    if (touchEnd - touchStart > 75) {
      // swipe right
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1]);
      }
    }
  };

  const handleTabChange = (tab: TransactionType | "all") => {
    setActiveTab(tab);

    if (tab === "all") {
      filterTransactionsByType("all");
    } else if (tab === TransactionType.INCOME) {
      filterTransactionsByType(TransactionType.INCOME);
    } else {
      filterTransactionsByType(TransactionType.EXPENSE);
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
      <PageHeader title="Transactions" />
      <Tabs
        defaultValue="all"
        className="w-full mt-4 h-full"
        onValueChange={(val) => handleTabChange(val as TransactionType | "all")}
        value={activeTab}
        {...handlers}
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value={TransactionType.INCOME}>Income</TabsTrigger>
          <TabsTrigger value={TransactionType.EXPENSE}>Expense</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4 space-y-2 h-full">
          {filteredTransactions.length === 0 && (
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
