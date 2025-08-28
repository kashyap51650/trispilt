import TransactionForm from "@/components/form/TransactionForm";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { ROUTES } from "@/constants";
import { TransactionType } from "@/types";

const AddExpensePage = () => {
  return (
    <PageWrapper>
      <PageHeader title="Add Expense" backRoute={ROUTES.transaction} />
      <p className="text-muted text-sm">
        Use the form below to add an expense transaction from your account.
      </p>
      <TransactionForm type={TransactionType.EXPENSE} />
    </PageWrapper>
  );
};

export default AddExpensePage;
