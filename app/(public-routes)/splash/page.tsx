"use client";

import Image from "next/image";
import React from "react";

const SplashPage: React.FC = () => {
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
        <div className="relative flex-1 flex items-center">
          <Image
            src="/icons/icon-512x512.png"
            alt="App Logo"
            width={120}
            height={120}
            className="drop-shadow-xl"
            priority
          />
        </div>

        {/* App Name */}
        <div className="items-end">
          <h1 className="text-primary text-2xl font-extrabold tracking-tight ">
            TriSpilt
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
