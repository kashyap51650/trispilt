import { getTransactions } from "@/actions/transaction";
import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { Transaction, TransactionType } from "@/types";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const { showError } = useToast();

  // filter transactions by type
  const filterTransactionsByType = (type: TransactionType | "all") => {
    if (type === "all") return transactions;
    return transactions.filter((t) => t.type === type);
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const result = await getTransactions();
      if (result.success) {
        setTransactions(result.data as []);
      }

      if (!result.success) {
        showError(result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    refetch: fetchTransactions,
    filterTransactionsByType,
  };
};
