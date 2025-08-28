import { deleteTransaction } from "@/actions/transaction";
import { useConfirmationDialog } from "@/provider/ConfirmationDialogProvider";
import { ServiceResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

export const useDeleteTransaction = (id: string) => {
  const confirm = useConfirmationDialog();
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToast();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: deleteTransaction,
  });

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Delete Transaction?",
      description: "This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (ok) {
      mutate(id, {
        onSuccess: (result: ServiceResult) => {
          if (result.success) {
            showSuccess(result.message);
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["transaction" + id] });
            router.push(ROUTES.transaction);
          }

          if (!result.success) {
            showError(result.message);
          }
        },
      });
    }
  };

  return { handleDelete };
};
