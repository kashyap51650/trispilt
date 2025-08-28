import { logout } from "@/actions/auth";
import { ServiceResult } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./useToast";
import { useConfirmationDialog } from "@/provider/ConfirmationDialogProvider";
import { ROUTES } from "@/constants";

export const useLogout = () => {
  const router = useRouter();
  const confirm = useConfirmationDialog();
  const { showError, showSuccess } = useToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: (result: ServiceResult) => {
      if (result.success) {
        queryClient.clear();
        showSuccess(result.message);
        router.push(ROUTES.login);
      }
      if (!result.success) {
        showError(result.message);
      }
    },
  });

  const handleLogOut = async () => {
    const ok = await confirm({
      title: "Log Out?",
      description: "Are you sure you want to log out?",
      confirmText: "Log Out",
      cancelText: "Cancel",
    });

    if (ok) {
      mutate();
    }
  };
  return { handleLogOut };
};
