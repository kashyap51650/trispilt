"use client";

import {
  register as registerUser,
  sendVerificationEmail,
} from "@/actions/auth";
import { MAX_FILE_SIZE, NO_PROFILE_IMAGE, ROUTES } from "@/constants";
import { SignupFormData, signupSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordStrength } from "./usePasswordStrength";

export function useSignup() {
  const [avatar, setAvatar] = useState<string>(NO_PROFILE_IMAGE);
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
    mode: "onChange",
  });

  const watchedPassword = watch("password", "");
  const passwordStrength = usePasswordStrength(watchedPassword);

  // Avatar change
  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        setError("root", {
          type: "manual",
          message: "File size must be less than 5MB",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("root", {
          type: "manual",
          message: "Please select a valid image file",
        });
        return;
      }

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

  // Submit handler
  const onSubmit = useCallback(
    async (data: SignupFormData) => {
      setIsSubmitting(true);
      clearErrors("root");

      try {
        const registrationData = {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          avatar: fileInputRef.current?.files?.[0] as Blob,
        };

        await registerUser(registrationData);
        await sendVerificationEmail();

        router.push(
          `${ROUTES.verifyEmail}?email=${encodeURIComponent(data.email)}`
        );
      } catch (error) {
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
    [clearErrors, setError, router]
  );

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return {
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
  };
}
