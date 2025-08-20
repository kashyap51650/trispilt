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
    <div className="relative overflow-hidden">
      {/* Background gradient and glow accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-foreground/5 to-transparent" />
      </div>

      <div className="flex h-screen flex-col items-center justify-center gap-6 py-10 text-center">
        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <Image
            src="/icons/icon-512x512.png"
            alt="Rupee icon"
            width={64}
            height={64}
            className="drop-shadow-xl"
            priority
          />
        </div>
        {/* Branding */}
        <div>
          <h1 className="text-primary text-2xl font-extrabold tracking-tight ">
            Trisplit
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
