"use client";

import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { TransactionDetailsSkeleton } from "@/components/skeleton/TransactionDetailsSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PAGE_HEADING, ROUTES } from "@/constants";
import { useTransactionDetails } from "@/hooks/useTransactionDetails";
import { Edit3, Receipt, Trash2 } from "lucide-react";

function TransactionDetailsPage({ params }: { params: { id: string } }) {
  const transactionId = params.id;
  const { isLoading, data: transaction } = useTransactionDetails(transactionId);

  if (!isLoading && !transaction) {
    return (
      <PageWrapper>
        <PageHeader
          title="Transaction Details"
          backRoute={ROUTES.transaction}
        />
        <div className="p-4">
          <Card className="p-6 text-center border-destructive/20 bg-destructive/5">
            <Receipt className="w-12 h-12 mx-auto mb-4 text-destructive" />
            <h3 className="text-lg font-semibold text-destructive mb-2">
              {"Transaction Not Found"}
            </h3>
            <p className="text-muted-foreground">
              The transaction you're looking for doesn't exist or you don't have
              permission to view it.
            </p>
          </Card>
        </div>
      </PageWrapper>
    );
  }

  const isIncome = transaction?.type === "income";
  const amountColor = isIncome ? "text-green-500" : "text-destructive";

  return (
    <PageWrapper>
      <PageHeader
        title={PAGE_HEADING.transactionDetails}
        backRoute={ROUTES.transaction}
      />

      <div className="p-4 space-y-6">
        {/* Single Transaction Information Card */}
        {isLoading ? (
          <TransactionDetailsSkeleton />
        ) : (
          <>
            <Card className="p-4 border border-muted/20 bg-muted/5">
              {/* Focused Amount Section */}
              <div className="text-center mb-4">
                <div className="flex flex-col items-center justify-center mb-3">
                  <span className={`text-4xl font-bold ${amountColor} mb-2`}>
                    ₹ {transaction?.amount.toLocaleString("en-IN")}
                  </span>
                  {/* {title} */}
                  <span className="font-semibold text-foreground text-xl">
                    {transaction?.title}
                  </span>
                </div>
              </div>

              {/* Transaction Information */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-semibold text-foreground capitalize">
                    {transaction?.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-semibold text-foreground">
                    {new Date(transaction?.date ?? "").toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created By:</span>
                  <span className="font-semibold text-foreground">
                    {transaction?.by || "You"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono text-foreground text-xs">
                    {/* only specific length after then ... */}
                    {transaction?.id.slice(0, 15)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge
                    variant={isIncome ? "default" : "destructive"}
                    className={`text-sm font-medium ${
                      isIncome
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-destructive/20 text-destructive border-red-destructive/30"
                    }`}
                  >
                    {transaction?.type}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Action Buttons Below Card */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Transaction
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50 text-destructive hover:text-destructive transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Transaction
              </Button>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}

export default TransactionDetailsPage;
