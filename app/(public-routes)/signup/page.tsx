"use client";
import { register as registerUser } from "@/actions/auth";
import AvatarUpload from "@/components/AvatarUpload";
import ErrorComponent from "@/components/ErrorComponent";
import FormField from "@/components/FormField";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAX_FILE_SIZE } from "@/constants";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
import { SignupFormData, signupSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const SignupPage: React.FC = () => {
  const [avatar, setAvatar] = useState<string>("/uiface-1.jpg");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch,
    clearErrors,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // Enable real-time validation
  });

  const watchedPassword = watch("password", "");
  const passwordStrength = usePasswordStrength(watchedPassword);

  // Optimized avatar change handler
  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError("root", {
          type: "manual",
          message: "File size must be less than 5MB",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("root", {
          type: "manual",
          message: "Please select a valid image file",
        });
        return;
      }

      // Clear any previous errors
      clearErrors("root");

      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setAvatar(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    },
    [setError, clearErrors]
  );

  // Optimized submit handler
  const onSubmit = useCallback(
    async (data: SignupFormData) => {
      setIsSubmitting(true);
      clearErrors("root");

      try {
        // Prepare registration data
        const registrationData = {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          avatar: avatar,
        };

        console.log("avatar", avatar);
        // Call the register function
        // const result = await registerUser(registrationData);

        // console.log("Registration successful:", result);

        // Handle successful registration
        // Redirect to dashboard or show success message
        // router.push("/dashboard");
      } catch (error) {
        console.error("Registration error:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.";

        setError("root", {
          type: "manual",
          message: errorMessage,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [avatar, clearErrors, setError, router]
  );

  // Memoized toggle function
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className=" flex min-h-screen flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-secondary/20 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-transparent" />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">
            Sign up
          </h1>
          <p className="mt-2 text-muted-foreground">Register your account</p>
        </div>
      </div>
      <div className="mt-8 w-full items-center justify-center max-w-md rounded-xl border bg-card/80 p-8 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile photo upload */}
          <AvatarUpload
            avatar={avatar}
            onAvatarChange={handleAvatarChange}
            fileInputRef={fileInputRef}
          />

          {/* Name */}
          <FormField error={errors.name?.message}>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              autoComplete="name"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
          </FormField>

          {/* Email */}
          <FormField error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
          </FormField>

          {/* Phone */}
          <FormField error={errors.phone?.message}>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone number"
              autoComplete="tel"
              {...register("phone")}
              className={errors.phone ? "border-red-500" : ""}
            />
          </FormField>

          {/* Password */}
          <FormField error={errors.password?.message}>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="new-password"
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

            <PasswordStrengthIndicator
              password={watchedPassword}
              strength={passwordStrength}
            />
          </FormField>

          {/* Root error */}
          {errors.root && <ErrorComponent errorMessage={errors.root.message} />}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Creating account...
              </>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
