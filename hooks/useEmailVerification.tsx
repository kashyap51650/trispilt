import { useCallback, useEffect, useState } from "react";
import {
  checkEmailVerificationStatus,
  sendVerificationEmail,
  verifyEmailWithCode,
} from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastType } from "@/components/Toast";

interface VerificationState {
  isVerified: boolean;
  email: string;
  isLoading: boolean;
  error: string | null;
  lastSentTime: Date | null;
  isProcessingCode: boolean;
}

interface ToastState {
  show: boolean;
  type: ToastType;
  title: string;
  message?: string;
}

export const useEmailVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const actionCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");
  const email = searchParams.get("email");

  const [state, setState] = useState<VerificationState>({
    isVerified: false,
    email: email || "",
    isLoading: false,
    error: null,
    lastSentTime: null,
    isProcessingCode: false,
  });

  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "info",
    title: "",
  });

  /** ✅ Check initial verification status */
  const checkVerificationStatus = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const result = await checkEmailVerificationStatus();
      setState((prev) => ({
        ...prev,
        isVerified: result.isVerified,
        email: result.email || "",
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Failed to check verification status",
        isLoading: false,
      }));
    }
  }, [router]);

  /** ✅ Handle verification with code */
  const handleVerifyWithCode = useCallback(async (code: string) => {
    try {
      setState((prev) => ({ ...prev, isProcessingCode: true, error: null }));
      const result = await verifyEmailWithCode(code);

      setState((prev) => ({
        ...prev,
        isVerified: true,
        email: result.email || prev.email,
        isProcessingCode: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to verify email",
        isProcessingCode: false,
      }));
    }
  }, []);

  /** ✅ Resend verification email */
  const handleResendEmail = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      await sendVerificationEmail();
      setState((prev) => ({
        ...prev,
        isLoading: false,
        lastSentTime: new Date(),
      }));

      setToast({
        show: true,
        type: "success",
        title: "Verification email sent!",
        message: "Check your inbox for the verification link.",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send verification email",
        isLoading: false,
      }));
    }
  }, []);

  /** ✅ Initial effect */
  useEffect(() => {
    if (mode === "verifyEmail" && actionCode) {
      handleVerifyWithCode(actionCode);
    } else {
      checkVerificationStatus();
    }
  }, [mode, actionCode, handleVerifyWithCode, checkVerificationStatus]);

  return {
    state,
    toast,
    setToast,
    checkVerificationStatus,
    handleVerifyWithCode,
    handleResendEmail,
  };
};
