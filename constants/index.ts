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
} as const;
