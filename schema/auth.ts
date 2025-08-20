import z from "zod";

// Enhanced Zod schema with better error messages
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])/, "Must contain at least one lowercase letter")
    .regex(/^(?=.*[A-Z])/, "Must contain at least one uppercase letter")
    .regex(/^(?=.*\d)/, "Must contain at least one number")
    .regex(/^(?=.*[@$!%*?&])/, "Must contain at least one special character"),
});

export type SignupFormData = z.infer<typeof signupSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
