"use client";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/constants";
import { useTransactionMutation } from "@/hooks/useTransactionMutation";
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
  type?: TransactionType;
  transactionId?: string;
  initialData?: TransactionFormData;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  transactionId,
  type = TransactionType.INCOME,
  initialData,
}) => {
  const isEdit = Boolean(transactionId);

  const { mutate, isPending } = useTransactionMutation(isEdit ? "edit" : "add");

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
      title: isEdit ? initialData?.title : "",
      amount: isEdit ? initialData?.amount : "",
      date: isEdit
        ? new Date(initialData?.date || "").toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0], // Today's date
      category: isEdit ? initialData?.category : "",
    },
  });

  const getButtonLabel = () => {
    if (isEdit) {
      return `Update ${type === TransactionType.INCOME ? "Income" : "Expense"}`;
    }
    return `Add ${type === TransactionType.INCOME ? "Income" : "Expense"}`;
  };

  const onSubmit = async (data: TransactionFormData) => {
    mutate(
      {
        ...data,
        type,
        id: isEdit ? transactionId : undefined,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            if (!isEdit) {
              reset();
            }
          }
        },
      }
    );
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
          disabled={!isDirty || isPending}
        >
          {isPending ? "Processing..." : getButtonLabel()}
        </Button>
      </form>
    </AppCard>
  );
};

export default TransactionForm;
