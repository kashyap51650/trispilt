import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserInfo } from "@/types";
import { db } from "@/lib/firebase";

export function useAuthUser() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: User | null) => {
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser({
              ...userDoc.data(),
              id: firebaseUser.uid,
              avatar: userDoc.data().profileUrl,
            } as UserInfo);
          } else {
            // Optional: create default user data or handle missing case
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || "User",
              email: firebaseUser.email || "",
              avatar: firebaseUser.photoURL || "/uiface-1.jpg",
              mobile: "",
            });
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
