"use client";

import { createContribution } from "@/actions/contribution";
import { Button } from "./ui/button";
import { CURRENT_YEAR, MONTHLY_CONTRIBUTION_AMOUNT } from "@/constants";
import { ConfirmContribution } from "./ConfirmContribution";
import { useState } from "react";
import { toast } from "sonner";
import { Months } from "@/types";
import { useToast } from "@/hooks/useToast";

type ContributionButtonProps = {
  month: Months;
};

export const ContributionButton: React.FC<ContributionButtonProps> = ({
  month,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { showError, showSuccess } = useToast();

  const handleClick = async () => {
    const response = await createContribution({
      amount: MONTHLY_CONTRIBUTION_AMOUNT,
      month: month,
    });

    if (response.success) {
      showSuccess(response.message);
    }

    if (!response.success) {
      showError(response.message);
    }

    setShowConfirm(false);
  };

  return (
    <>
      <Button
        key={month}
        variant={"outline"}
        onClick={() => setShowConfirm(true)}
      >
        {month}
      </Button>
      <ConfirmContribution
        month={month}
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          handleClick();
        }}
      />
    </>
  );
};
