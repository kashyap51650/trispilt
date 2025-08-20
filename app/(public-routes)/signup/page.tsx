"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

const SignupPage: React.FC = () => {
  const [avatar, setAvatar] = useState<string>("/uiface-1.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setAvatar(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" flex flex-col justify-center h-full">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-secondary/20 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-transparent" />
      </div>
      <div className="mb-6 px-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-primary">
          Sign up
        </h1>
        <p className="text-muted-foreground">Register your account</p>
      </div>
      <div className="w-full items-center justify-center max-w-md rounded-xl border bg-card/80 p-8 shadow-lg">
        <form className="space-y-6">
          {/* Profile photo upload */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Image
                src={avatar}
                height={80}
                width={80}
                alt="profile-photo"
                className="rounded-full h-25 w-25 object-cover"
              />
              <button
                type="button"
                className="absolute z-20 bottom-0 right-0 flex rounded-full bg-primary p-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/40"
                onClick={() => fileInputRef.current?.click()}
              >
                <PencilIcon className="w-3 h-3" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name */}
          <div>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
            />
          </div>

          {/* Phone */}
          <div>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              required
              autoComplete="tel"
            />
          </div>

          {/* Password */}
          <div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password "
              required
              autoComplete="new-password"
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </div>
      <div>
        <p className="mt-4 ms-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
