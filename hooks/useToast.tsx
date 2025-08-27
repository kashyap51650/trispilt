import { toast } from "sonner";

export const useToast = () => {
  const showSuccess = (message: string, duration = 4000) => {
    toast(message, {
      duration,
      style: { backgroundColor: "#00C851", color: "#fff" },
    });
  };

  const showError = (message: string, duration = 4000) => {
    toast(message, {
      duration,
      style: { backgroundColor: "#ff4d4f", color: "#fff" },
    });
  };

  return { showSuccess, showError };
};
