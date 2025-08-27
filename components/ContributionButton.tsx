"use client";

import { createContribution } from "@/actions/contribution";
import { MONTHLY_CONTRIBUTION_AMOUNT } from "@/constants";
import { useToast } from "@/hooks/useToast";
import { Months } from "@/types";
import { useState } from "react";
import { ConfirmContribution } from "./ConfirmContribution";
import { Button } from "./ui/button";

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
