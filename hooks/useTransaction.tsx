"use client";
import { getTransactions } from "@/actions/transaction";
import { Transaction, TransactionType } from "@/types";
import { TransactionsTab } from "@/types/enum";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "./useToast";

export const useTransaction = () => {
  const { showError } = useToast();

  const {
    data: transactions = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const result = await getTransactions();
      if (!result.success) {
        showError(result.message);
        throw new Error(result.message);
      }
      return result.data as Transaction[];
    },
  });

  // filter transactions by type
  const filterTransactionsByType = (type: TransactionsTab) => {
    if (type === TransactionsTab.ALL) return transactions;
    return transactions.filter(
      (t) => t.type === (type as unknown as TransactionType)
    );
  };

  const filterTransactionById = (id: string) => {
    return transactions.find((t) => t.id === id);
  };

  return {
    transactions,
    isLoading,
    isError,
    refetch,
    filterTransactionsByType,
    filterTransactionById,
  };
};
