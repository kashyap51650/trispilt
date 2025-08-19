"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SplashPage: React.FC = () => {
  const router = useRouter();

  // Auto-redirect to dashboard after a short delay
  useEffect(() => {
    const t = setTimeout(() => router.replace("/dashboard"), 2000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Background gradient and glow accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-foreground/5 to-transparent" />
      </div>

      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 py-10 text-center">
        {/* Floating brand art */}
        <div className="relative h-32 w-full max-w-xs">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Image
              src="/3dicons-rupee.png"
              alt="Rupee icon"
              width={64}
              height={64}
              className="drop-shadow-xl animate-bounce"
              priority
            />
          </div>
          <div className="absolute right-2 top-0">
            <Image
              src="/3dicons-wallet.png"
              alt="Wallet icon"
              width={96}
              height={96}
              className="drop-shadow-xl animate-bounce"
              priority
            />
          </div>
        </div>

        {/* Branding */}
        <div>
          <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            Group Finance Management
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage contributions, track expenses, and grow together
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary/40 border-t-primary" />
          <p className="text-xs text-muted-foreground">Loading dashboard…</p>
        </div>

        {/* CTA fallback if user wants to skip */}
        <div className="pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            aria-label="Continue to dashboard"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
