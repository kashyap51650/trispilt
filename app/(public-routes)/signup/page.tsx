"use client";

import React from "react";
import { useSignup } from "@/hooks/useSignup";
import AvatarUpload from "@/components/AvatarUpload";
import ErrorComponent from "@/components/ErrorComponent";
import FormField from "@/components/FormField";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants";

const SignupPage: React.FC = () => {
  const {
    avatar,
    fileInputRef,
    isSubmitting,
    showPassword,
    register,
    handleSubmit,
    errors,
    isValid,
    watchedPassword,
    passwordStrength,
    handleAvatarChange,
    onSubmit,
    togglePasswordVisibility,
  } = useSignup();

  return (
    <div className=" flex min-h-screen flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
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
          {/* Avatar */}
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
            href={ROUTES.login}
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
