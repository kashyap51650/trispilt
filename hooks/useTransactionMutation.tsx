"use client";

import { createTransaction, editTransaction } from "@/actions/transaction";
import { TransactionInput } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";

type MutationType = "add" | "edit";

export const useTransactionMutation = (type: MutationType) => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToast();

  const mutationFn = type === "add" ? createTransaction : editTransaction;

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (data: TransactionInput) => await mutationFn(data),
    onSuccess: (result: {
      success: boolean;
      message: string;
      data?: string;
    }) => {
      if (result.success) {
        showSuccess(result.message);

        // Invalidate cache so `useQuery` refetches
        queryClient.invalidateQueries({ queryKey: ["transactions"] });

        if (type === "edit" && result.data) {
          queryClient.invalidateQueries({
            queryKey: ["transaction" + result.data],
          });
        }
      } else {
        showError(result.message);
      }
    },
    onError: (error: unknown) => {
      console.error(error);
      showError("Something went wrong. Please try again.");
    },
  });

  return {
    mutate, // call this for add/edit
    isPending,
    isSuccess,
    isError,
  };
};
