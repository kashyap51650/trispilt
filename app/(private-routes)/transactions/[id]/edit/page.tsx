"use client";
import TransactionForm from "@/components/form/TransactionForm";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { PAGE_HEADING, ROUTES } from "@/constants";
import { useTransactionDetails } from "@/hooks/useTransactionDetails";
import { TransactionType } from "@/types";
import { useParams } from "next/navigation";
import React from "react";

export default function EditTransaction() {
  const data = useParams();

  const { data: transaction, isLoading } = useTransactionDetails(
    Array.isArray(data.id) ? data.id[0] : data.id || ""
  );

  if (!transaction) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  const transactionData = {
    title: transaction.title,
    amount: transaction.amount.toString(),
    date: transaction.date,
    category: transaction.category,
  };

  return (
    <PageWrapper>
      <PageHeader
        title={PAGE_HEADING.EditTransaction}
        backRoute={`${ROUTES.transaction}/${data.id}`}
      />
      <TransactionForm
        transactionId={Array.isArray(data.id) ? data.id[0] : data.id || ""}
        initialData={transactionData}
        type={transaction.type as TransactionType}
      />
    </PageWrapper>
  );
}
