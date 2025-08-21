"use client";

import { login, sendVerificationEmail } from "@/actions/auth";
import ErrorComponent from "@/components/ErrorComponent";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginFormData, loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // Optimized submit handler
  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      setIsSubmitting(true);
      clearErrors("root");

      try {
        const result = await login(data);

        // Redirect to verify email if login failed due to unverified email
        if (result.success === false && result.emailVerified === false) {
          const status = await sendVerificationEmail();

          if (status.success) {
            router.push(
              "/verify-email?email=" + encodeURIComponent(data.email)
            );
            return;
          }
        }

        // Redirect to dashboard on successful login
        router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.";

        setError("root", {
          type: "manual",
          message: errorMessage,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [clearErrors, setError, router]
  );

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-secondary/20 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-transparent" />
      </div>

      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">
            Welcome back
          </h1>
          <p className="mt-2 text-muted-foreground">Sign in to your account</p>
        </div>
      </div>

      {/* Form container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-xl border bg-card/80 px-8 py-10 shadow-lg backdrop-blur-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
            </FormField>

            {/* Password */}
            <FormField error={errors.password?.message}>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  {...register("password")}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </FormField>

            {/* Forgot password link */}
            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:underline transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Root error */}
            {errors.root && (
              <ErrorComponent errorMessage={errors.root.message} />
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
