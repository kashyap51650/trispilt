import { auth, db } from "@/lib/firebase";
import { UserInfo } from "@/types";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createUser } from "./user";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  try {
    const { name, email, password, phone, avatar = "/uiface-1.jpg" } = data;

    // Create user with Firebase Auth
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Update the user's profile with their name
    await updateProfile(user, {
      displayName: name,
      photoURL: avatar,
    });

    // Prepare user data for Firestore
    const userData: UserInfo = {
      id: user.uid,
      name: name,
      email: email.toLowerCase(),
      avatar: avatar,
      mobile: phone,
    };

    // Create user document in Firestore
    await createUser(userData);

    return {
      user: {
        id: user.uid,
        name: name,
        email: user.email,
        avatar: avatar,
        mobile: phone,
      },
      success: true,
      message: "User registered successfully",
    };
  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle specific Firebase Auth errors
    let errorMessage = "Failed to register user";

    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email address is already in use";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password is too weak";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address";
    } else if (error.code === "auth/operation-not-allowed") {
      errorMessage = "Email/password accounts are not enabled";
    }

    throw new Error(errorMessage);
  }
};

export const login = async (data: LoginData) => {
  try {
    const { email, password } = data;

    // Sign in with Firebase Auth
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Get user data from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    let userData: UserInfo | null = null;

    if (!userDoc.exists()) {
      throw new Error("User not found in database. Please register first.");
    }

    userData = userDoc.data() as UserInfo;

    return {
      user: userData,
      success: true,
      message: "Login successful",
    };
  } catch (error: any) {
    console.error("Login error:", error);

    // Handle specific Firebase Auth errors
    let errorMessage = "Failed to login";

    if (error.code === "auth/user-not-found") {
      errorMessage = "No account found with this email address";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address";
    } else if (error.code === "auth/user-disabled") {
      errorMessage = "This account has been disabled";
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Too many failed login attempts. Please try again later";
    } else if (error.code === "auth/invalid-credential") {
      errorMessage = "Invalid email or password";
    }

    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error: any) {
    console.error("Logout error:", error);
    throw new Error("Failed to logout");
  }
};

export const getCurrentUser = async (): Promise<UserInfo | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();

      if (user) {
        try {
          // Get user data from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            resolve(userDoc.data() as UserInfo);
          } else {
            // Create basic user data if document doesn't exist
            const userData: UserInfo = {
              id: user.uid,
              name: user.displayName || "User",
              email: user.email || "",
              avatar: user.photoURL || "/uiface-1.jpg",
              mobile: "",
            };

            await createUser(userData);
            resolve(userData);
          }
        } catch (error) {
          console.error("Error getting current user:", error);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};
