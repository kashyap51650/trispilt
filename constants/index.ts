export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const STRENGTH_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-blue-500",
  "bg-green-500",
] as const;

export const STRENGTH_LABELS = [
  "Very Weak",
  "Weak",
  "Fair",
  "Good",
  "Strong",
] as const;

export const ROUTES = {
  dashboard: "/dashboard",
  transaction: "/transactions",
  login: "/login",
  signup: "/signup",
  verifyEmail: "/verify-email",
  profile: "/profile",
  getStarted: "/get-started",
} as const;

export const NO_PROFILE_IMAGE = "/images/no-profile.jpg";

export const CONTRIBUTION_MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const CURRENT_YEAR = new Date().getFullYear();

export const MONTHLY_CONTRIBUTION_AMOUNT = 2000; // Example fixed amount, can be made dynamic later

export const FIREBASE_COLLECTIONS = {
  users: "users",
  contributions: "contributions",
  transactions: "transactions",
} as const;

export const INCOME_CATEGORIES = [
  { key: "freelance", value: "Freelance" },
  { key: "interest", value: "Interest" },
  { key: "investments", value: "Investments Return" },
  { key: "other", value: "Other" },
];

export const EXPENSE_CATEGORIES = [
  { key: "subscription", value: "Subscription" },
  { key: "company_work", value: "Company Work" },
  { key: "entertainment", value: "Entertainment" },
  { key: "party", value: "Party" },
  { key: "other", value: "Other" },
];

export const PAGE_HEADING = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  profile: "Profile",
  verifyEmail: "Verify Email",
  login: "Login",
  signup: "Sign Up",
} as const;
