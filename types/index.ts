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
