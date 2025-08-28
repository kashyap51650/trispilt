// components/AuthWrapper.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase"; // your firebase config
import { ROUTES } from "@/constants";

type Props = {
  children: React.ReactNode;
};

export default function AuthWrapper({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        router.replace(ROUTES.getStarted); // redirect if not logged in
      } else {
        router.replace(ROUTES.dashboard); // redirect if logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}
