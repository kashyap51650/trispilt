"use client";

import { getCurrentUser } from "@/actions/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SplashPage: React.FC = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Check authentication status and redirect accordingly
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const user = await getCurrentUser();

        if (user) {
          // User is authenticated, redirect to dashboard
          router.replace("/dashboard");
        } else {
          // User is not authenticated, redirect to get-started
          setTimeout(() => {
            router.replace("/get-started");
          }, 1500);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        // On error, redirect to get-started
        setTimeout(() => {
          router.replace("/get-started");
        }, 1500);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient and glow accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-foreground/5 to-transparent" />
      </div>

      <div className="flex h-screen flex-col items-center justify-center gap-6 py-10 text-center">
        {/* App Logo and Branding */}
        <div className="relative">
          <Image
            src="/3dicons-rupee.png"
            alt="App Logo"
            width={120}
            height={120}
            className="drop-shadow-xl animate-pulse"
            priority
          />
        </div>

        {/* App Name */}
        <div>
          <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            TriSpilt
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Group Finance Management
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/40 border-t-primary" />
          <p className="text-sm text-muted-foreground">
            {isChecking ? "Checking authentication..." : "Redirecting..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
