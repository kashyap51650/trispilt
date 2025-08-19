"use client";
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-secondary/20 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-transparent" />
      </div>

      <div className="py-6 px-4">
        <Image
          src={"/3dicons-rupee.png"}
          height={100}
          width={100}
          alt="login-icon"
          className="mb-4"
        />
        <h1 className="text-2xl font-extrabold tracking-tight text-primary">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">Login to your account</p>
      </div>

      <div className="w-full rounded-xl border bg-card/50 p-8 shadow-lg">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/dashboard");
          }}
        >
          {/* Email */}
          <div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password "
              autoComplete="new-password"
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </div>

      <div>
        <p className="mt-4 ms-4 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
