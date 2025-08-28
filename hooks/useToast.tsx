import { CheckCircleIcon } from "lucide-react";
import { toast } from "sonner";

export const useToast = () => {
  const showSuccess = (title: string, duration = 4000) => {
    toast(title, {
      duration: duration,
      style: { backgroundColor: "#255F38", color: "#fff" },
    });
  };

  const showError = (message: string, duration = 4000) => {
    toast(message, {
      duration,
      style: { backgroundColor: "#AE445A", color: "#fff" },
    });
  };

  return { showSuccess, showError };
};
