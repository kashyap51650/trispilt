"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Upload, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { updatedUser } from "@/actions/user";
import AppAvatar from "@/components/AppAvatar";
import AppCard from "@/components/AppCard";
import ErrorComponent from "@/components/ErrorComponent";
import FormField from "@/components/FormField";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NO_PROFILE_IMAGE, ROUTES } from "@/constants";
import { useAuthUser } from "@/hooks/useAuthUser";
import { EditProfileFormData, editProfileSchema } from "@/schema/user";
import PageWrapper from "@/components/PageWrapper";

export default function EditProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string>("");
  const router = useRouter();
  const { user, loading } = useAuthUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    clearErrors,
    setValue,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
  });

  // Set form values when user data loads
  React.useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("mobile", user.mobile || "");
      setAvatarPreview(user.avatar);
    }
  }, [user, setValue]);

  const handleAvatarChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          setUploadError("Please select a valid image file");
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setUploadError("Image size must be less than 5MB");
          return;
        }

        setUploadError("");
        setAvatarFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatarPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const onSubmit = useCallback(
    async (data: EditProfileFormData) => {
      setIsSubmitting(true);
      clearErrors("root");

      try {
        console.log(user);

        const updatedData = {
          id: user?.id || "",
          name: data.name,
          email: data.email,
          avatar: fileInputRef.current?.files?.[0] as Blob,
          mobile: data.mobile || "",
        };

        console.log("Updating profile with data:", updatedData);

        await updatedUser(updatedData);

        router.push(ROUTES.profile);
      } catch (error) {
        console.error("Profile update error:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to update profile. Please try again.";

        setError("root", {
          type: "manual",
          message: errorMessage,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [clearErrors, setError, router, user]
  );

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <User className="h-16 w-16 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">
            Please sign in to edit your profile
          </p>
        </div>
      </div>
    );
  }

  const hasChanges = isDirty || avatarFile;

  return (
    <PageWrapper>
      <PageHeader title="Edit Profile" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Avatar Section */}
        <AppCard>
          <div className="flex items-start gap-6">
            <div className="relative">
              <AppAvatar
                src={avatarPreview || user.avatar || NO_PROFILE_IMAGE}
                width={100}
                height={100}
                fallback={user.name?.charAt(0) || "U"}
              />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-medium text-sm">
                  Change your profile picture
                </h3>
                <p className="text-xs text-muted-foreground">
                  JPG or PNG, Max size 5MB.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload new picture
              </Button>

              {uploadError && (
                <p className="text-sm text-red-600">{uploadError}</p>
              )}
            </div>
          </div>
        </AppCard>

        {/* Personal Information */}
        <AppCard>
          <div className="space-y-4">
            {/* Name */}
            <FormField error={errors.name?.message}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className={errors.name ? "border-destructive pl-10" : "pl-10"}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </FormField>

            {/* Email */}
            <FormField error={errors.email?.message}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  disabled
                  className={errors.email ? "border-red-500 pl-10" : "pl-10"}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </FormField>

            {/* Mobile */}
            <FormField error={errors.mobile?.message}>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Phone Number
                <span className="text-muted-foreground ml-1">(Optional)</span>
              </label>
              <div className="relative">
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register("mobile")}
                  className={errors.mobile ? "border-red-500 pl-10" : "pl-10"}
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </FormField>
          </div>
        </AppCard>

        {/* Root error */}
        {errors.root && <ErrorComponent errorMessage={errors.root.message} />}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={!hasChanges || isSubmitting}
          >
            {isSubmitting ? "Saving..." : <>Update Profile</>}
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
}
