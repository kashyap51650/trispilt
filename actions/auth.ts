import { auth } from "@/lib/firebase";
import { UserInfo } from "@/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUser } from "./user";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
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
