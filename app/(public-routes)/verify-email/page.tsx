"use client";

import React, { Suspense } from "react";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import EmailVerificationCard from "@/components/EmailVerificationCard";
import ErrorComponent from "@/components/ErrorComponent";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import Loading from "@/components/Loading";

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const { state, handleResendEmail } = useEmailVerification();

  if (state.isLoading && !state.email) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {state.isVerified ? (
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            ) : state.isProcessingCode ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            ) : (
              <ShieldCheckIcon className="h-8 w-8 text-primary" />
            )}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">
            {state.isVerified ? "Email Verified!" : "Verify your email"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {state.isVerified
              ? "Your account is now fully activated"
              : "Complete your account setup by verifying your email address"}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {state.error && (
          <div className="mb-6">
            <ErrorComponent errorMessage={state.error} />
          </div>
        )}

        {state.isVerified ? (
          <div className="rounded-xl border bg-card/80 p-8 shadow-lg backdrop-blur-sm text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Email Successfully Verified!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your email{" "}
              <span className="font-medium text-foreground">{state.email}</span>{" "}
              has been verified. You can now access all features of your
              account.
            </p>
            <Button
              onClick={() => router.push(ROUTES.dashboard)}
              className="w-full"
            >
              Continue to Dashboard
            </Button>
          </div>
        ) : state.isProcessingCode ? (
          <div className="rounded-xl border bg-card/80 p-8 shadow-lg backdrop-blur-sm text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Verifying Email...
            </h2>
            <p className="text-muted-foreground">
              Please wait while we verify your email address.
            </p>
          </div>
        ) : (
          <EmailVerificationCard
            email={state.email}
            isLoading={state.isLoading}
            onResendEmail={handleResendEmail}
            lastSentTime={state.lastSentTime || undefined}
          />
        )}

        {/* Footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Wrong email?{" "}
            <Link
              href={ROUTES.signup}
              className="font-medium text-primary hover:underline transition-colors"
            >
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
