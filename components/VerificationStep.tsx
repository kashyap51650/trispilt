import React from "react";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";

export type VerificationStepStatus =
  | "pending"
  | "completed"
  | "error"
  | "current";

interface VerificationStepProps {
  title: string;
  description: string;
  status: VerificationStepStatus;
  icon?: React.ReactNode;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  title,
  description,
  status,
  icon,
}) => {
  const getStatusIcon = () => {
    if (icon) return icon;

    switch (status) {
      case "completed":
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case "error":
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      case "current":
        return (
          <div className="h-6 w-6 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
        );
      default:
        return <ClockIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStepStyles = () => {
    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "current":
        return "border-primary bg-primary/5 ring-2 ring-primary/20";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getTextStyles = () => {
    switch (status) {
      case "completed":
        return "text-green-700";
      case "error":
        return "text-red-700";
      case "current":
        return "text-primary";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      className={`rounded-lg border p-4 transition-all duration-200 ${getStepStyles()}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">{getStatusIcon()}</div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-medium ${getTextStyles()}`}>{title}</h3>
          <p className={`text-sm mt-1 ${getTextStyles()} opacity-80`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationStep;
