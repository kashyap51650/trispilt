import React from "react";
import { Button } from "@/components/ui/button";
import { MailIcon, RefreshCwIcon } from "lucide-react";

interface EmailVerificationCardProps {
  email: string;
  isLoading: boolean;
  onResendEmail: () => void;
  lastSentTime?: Date;
  children?: React.ReactNode;
}

const EmailVerificationCard: React.FC<EmailVerificationCardProps> = ({
  email,
  isLoading,
  onResendEmail,
  lastSentTime,
  children,
}) => {
  const getTimeRemaining = () => {
    if (!lastSentTime) return 0;
    const now = new Date();
    const diff =
      60 - Math.floor((now.getTime() - lastSentTime.getTime()) / 1000);
    return Math.max(0, diff);
  };

  const [timeRemaining, setTimeRemaining] = React.useState(getTimeRemaining());

  React.useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  React.useEffect(() => {
    setTimeRemaining(getTimeRemaining());
  }, [lastSentTime, getTimeRemaining]);

  return (
    <div className="rounded-xl border bg-card/80 p-6 shadow-lg backdrop-blur-sm">
      <div className="text-center">
        {/* Email icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <MailIcon className="h-8 w-8 text-primary" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Check your email
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          {"We've sent a verification link to "}
          <span className="font-medium text-foreground">{email}</span>
        </p>

        {/* Custom content */}
        {children}

        {/* Resend button */}
        <div className="mt-6">
          <Button
            onClick={onResendEmail}
            disabled={isLoading || timeRemaining > 0}
            variant="outline"
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : timeRemaining > 0 ? (
              `Resend in ${timeRemaining}s`
            ) : (
              <>
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Resend verification email
              </>
            )}
          </Button>
        </div>

        {/* Help text */}
        <p className="mt-4 text-xs text-muted-foreground">
          {
            "Didn't receive the email? Check your spam folder or contact support."
          }
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationCard;
