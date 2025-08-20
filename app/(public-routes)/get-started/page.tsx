"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

const GetStartedPage: React.FC = () => {
  return (
    <div className="relative h-[90vh] flex flex-col items-center justify-end px-4">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-secondary/20 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-transparent rounded-4xl" />
      </div>

      {/* Brand logo and tagline */}
      <div className="mb-8 flex flex-col gap-2">
        <Image
          src="/3dicons-rupee.png"
          alt="Wallet"
          width={80}
          height={80}
          priority
        />
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent tracking-tight mb-1">
          Your Ultimate Goal For Financial Success
        </h1>
        <p className="text-base text-muted-foreground max-w-xs">
          Effortlessly manage group contributions, track expenses, and grow
          together.
        </p>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-4 w-full">
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors w-full"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 text-base font-semibold text-primary shadow hover:bg-primary/10 transition-colors w-full"
        >
          Sign Up
        </Link>
      </div>

      {/* Info and illustration */}
      {/* <div className="mt-10 flex flex-col items-center gap-2">
        <Image
          src="/globe.svg"
          alt="Global"
          width={40}
          height={40}
          className="opacity-70"
        />
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Secure, collaborative, and easy to use. Start managing your group’s
          finances today!
        </p>
      </div> */}
    </div>
  );
};

export default GetStartedPage;
