"use client";
import { createTransaction } from "@/actions/transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/constants";
import { useToast } from "@/hooks/useToast";
import { TransactionFormData, transactionSchema } from "@/schema/amount";
import { TransactionType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarSearchIcon, IndianRupee, Notebook } from "lucide-react";
import { useForm } from "react-hook-form";
import AppCard from "../AppCard";
import { CategoryDropdown } from "../CategoryDropdown";
import FormInput from "../FormInput";
import { Button } from "../ui/button";

type TransactionFormProps = {
  type?: TransactionType.EXPENSE | TransactionType.INCOME;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  type = TransactionType.INCOME,
}) => {
  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      amount: "",
      date: new Date().toISOString().split("T")[0], // Today's date
      category: "",
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    try {
      const result = await createTransaction({
        ...data,
        type:
          type === TransactionType.INCOME
            ? TransactionType.INCOME
            : TransactionType.EXPENSE,
      });

      if (result.success) {
        showSuccess(result.message);
        reset();
        return;
      }

      if (!result.success) {
        showError(result.message || "Failed to add transaction.");
      }
    } catch (err) {
      console.error("Submission error: ", err);
    }
  };
  return (
    <AppCard>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="title"
          type="text"
          label="Title"
          placeholder="Title"
          icon={Notebook}
          register={register("title")}
          error={errors.title?.message}
        />
        <FormInput
          id="amount"
          type="number"
          placeholder="Amount"
          label="Amount"
          icon={IndianRupee}
          register={register("amount")}
          error={errors.amount?.message}
        />
        <FormInput
          id="date"
          type="date"
          placeholder="Date"
          label="Date"
          register={register("date")}
          icon={CalendarSearchIcon}
          error={errors.date?.message}
        />
        <CategoryDropdown
          control={control}
          placeholder={
            type === TransactionType.INCOME ? "Income Type" : "Expense Type"
          }
          dropdownList={[
            {
              dropdownLabel:
                type === TransactionType.INCOME ? "Income" : "Expense",
              dropdownValue:
                type === TransactionType.INCOME
                  ? INCOME_CATEGORIES
                  : EXPENSE_CATEGORIES,
            },
          ]}
          name="category"
          label={
            type === TransactionType.INCOME ? "Select Income" : "Select Expense"
          }
          error={errors.category?.message}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
          disabled={!isDirty}
        >
          Add {type === TransactionType.INCOME ? "Income" : "Expense"}
        </Button>
      </form>
    </AppCard>
  );
};

export default TransactionForm;
