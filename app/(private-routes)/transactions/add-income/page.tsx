import TransactionForm from "@/components/form/TransactionForm";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { ROUTES } from "@/constants";

const AddTransactionPage = () => {
  return (
    <PageWrapper>
      <PageHeader title="Add Transaction" backRoute={ROUTES.transaction} />
      <p className="text-muted text-sm">
        Use the form below to add a new income transaction to your account.
      </p>
      <TransactionForm />
    </PageWrapper>
  );
};

export default AddTransactionPage;
