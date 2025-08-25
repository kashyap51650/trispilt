"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, CheckCircle, DollarSign, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { createContribution } from "@/actions/contribution";
import { cn } from "@/lib/utils";
import { ContributionFormData, contributionSchema } from "@/schema/amount";
import { toast } from "sonner";
import ErrorComponent from "../ErrorComponent";
import FormField from "../FormField";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getMonthNameFromDate } from "@/utils/helper";
import { useToast } from "@/hooks/useToast";

interface AddContributionFormProps {
  onSuccess?: () => void;
  selectedMonth?: string;
  className?: string;
}

const AddContributionForm: React.FC<AddContributionFormProps> = ({
  onSuccess,
  selectedMonth,
  className,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    clearErrors,
    reset,
  } = useForm<ContributionFormData>({
    resolver: zodResolver(contributionSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      date: new Date().toISOString().split("T")[0], // Today's date
    },
  });

  const onSubmit = useCallback(
    async (data: ContributionFormData) => {
      setIsSubmitting(true);
      clearErrors("root");

      const date = new Date(data.date);

      try {
        const contributionData = {
          amount: parseFloat(data.amount),
          date: date.toDateString(),
          month: getMonthNameFromDate(date),
        };

        const response = await createContribution(contributionData);

        if (response.success) {
          showSuccess(response.message);
          reset();
        }

        if (!response.success) {
          showError(response.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to add contribution. Please try again.";

        setError("root", {
          type: "manual",
          message: errorMessage,
        });

        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [clearErrors, setError, reset, onSuccess]
  );

  return (
    <div className={cn("space-y-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Amount Field */}
        <FormField error={errors.amount?.message}>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              max="100000"
              placeholder="Enter amount"
              {...register("amount")}
              className={cn(
                "pl-10 transition-all duration-300 focus:scale-[1.02]",
                errors.amount && "border-red-300 focus:border-red-500"
              )}
              disabled={isSubmitting}
            />
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Enter amount in Indian Rupees (₹)
          </p>
        </FormField>

        {/* Date Field */}
        <FormField error={errors.date?.message}>
          <div className="relative">
            <Input
              id="date"
              type="date"
              {...register("date")}
              max={new Date().toISOString().split("T")[0]} // Prevent future dates
              className={cn(
                "pl-10 transition-all duration-300 focus:scale-[1.02]",
                errors.date && "border-destructive/80 focus:border-destructive"
              )}
              disabled={isSubmitting}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Date cannot be in the future
          </p>
        </FormField>

        {/* Root error */}
        {errors.root && <ErrorComponent errorMessage={errors.root.message} />}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
          disabled={!isDirty || isSubmitting || submitStatus.type === "success"}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Adding Contribution...
            </>
          ) : submitStatus.type === "success" ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Contribution Added!
            </>
          ) : (
            <>Contribute</>
          )}
        </Button>

        {/* Form Info */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            This contribution will be added to your monthly tracking
          </p>
        </div>
      </form>
    </div>
  );
};

export default AddContributionForm;
