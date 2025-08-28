import { getSingleTransaction } from "@/actions/transaction";
import { Transaction } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTransactionDetails = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const result = await getSingleTransaction(id);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.data as Transaction;
    },
  });
};
