import { TransactionType } from ".";

export enum TransactionsTab {
  ALL = "all",
  INCOME = TransactionType.INCOME,
  EXPENSE = TransactionType.EXPENSE,
}
