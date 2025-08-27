import z from "zod";

export const contributionSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Please enter a valid amount greater than 0")
    .refine((val) => {
      const num = parseFloat(val);
      return num <= 100000;
    }, "Amount cannot exceed ₹100,000"),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      return date <= today;
    }, "Date cannot be in the future"),
});

export type ContributionFormData = z.infer<typeof contributionSchema>;

export const transactionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Please enter a valid amount greater than 0")
    .refine((val) => {
      const num = parseFloat(val);
      return num <= 100000;
    }, "Amount cannot exceed ₹100,000"),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      return date <= today;
    }, "Date cannot be in the future"),
  category: z.string().min(1, "Category is required"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
