export type UserInfo = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  mobile?: string;
};

export type Contribution = {
  id: string;
  user: Exclude<UserInfo, "email" | "mobile">;
  amount: number;
  date: string;
  month: string; // Format: "YYYY-MM"
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  user?: UserInfo;
  emailVerified?: boolean;
};

export type UpdateProfileData = {
  id: string;
  name: string;
  email: string;
  avatar: Blob;
  mobile?: string;
};

export type Months =
  | "JAN"
  | "FEB"
  | "MAR"
  | "APR"
  | "MAY"
  | "JUN"
  | "JUL"
  | "AUG"
  | "SEP"
  | "OCT"
  | "NOV"
  | "DEC";

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
  INVESTMENT = "investment",
}

export type Transaction = {
  id: string;
  userId: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
  by: string; // Name of the person who added the transaction
};
