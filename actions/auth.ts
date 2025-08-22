import { auth, db } from "@/lib/firebase";
import { LoginResponse, UserInfo } from "@/types";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  applyActionCode,
  checkActionCode,
  reload,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createUser, uploadAvatar } from "./user";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar?: Blob;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  try {
    const { name, email, password, phone, avatar } = data;

    // Create user with Firebase Auth
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // upload avatar if provided
    let avatarUrl = "";
    if (avatar) {
      avatarUrl = await uploadAvatar(
        new Blob([avatar], { type: "image/jpeg" })
      );
    }

    // Update the user's profile with their name
    await updateProfile(user, {
      displayName: name,
      photoURL: avatarUrl,
    });

    // Prepare user data for Firestore
    const userData: UserInfo = {
      id: user.uid,
      name: name,
      email: email.toLowerCase(),
      avatar: avatarUrl ?? "",
      mobile: phone,
    };

    // Create user document in Firestore
    await createUser(userData);

    return {
      user: {
        id: user.uid,
        name: name,
        email: user.email,
        avatar: avatarUrl,
        mobile: phone,
      },
      success: true,
      message: "User registered successfully",
      emailVerificationSent: false,
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

export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const { email, password } = data;

    // Sign in with Firebase Auth
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    const status = await checkEmailVerificationStatus();

    if (status.isVerified === false) {
      return {
        success: false,
        message: "Email not verified. Please check your inbox.",
        emailVerified: false,
      };
    }

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
      emailVerified: user.emailVerified,
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

// Email verification functions
export const sendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user logged in");
    }

    const actionCodeSettings = {
      url: "http://localhost:3000/verify-email?verified=true",
      handleCodeInApp: true,
    };

    await sendEmailVerification(user, actionCodeSettings);

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error: any) {
    console.error("Error sending verification email:", error);

    let errorMessage = "Failed to send verification email";

    if (error.code === "auth/too-many-requests") {
      errorMessage =
        "Too many requests. Please wait before requesting another verification email";
    } else if (error.code === "auth/user-disabled") {
      errorMessage = "This account has been disabled";
    }

    throw new Error(errorMessage);
  }
};

export const verifyEmailWithCode = async (actionCode: string) => {
  try {
    // Check if the action code is valid
    const info = await checkActionCode(auth, actionCode);

    // Apply the action code to verify the email
    await applyActionCode(auth, actionCode);

    // Reload the user to get updated email verification status
    if (auth.currentUser) {
      await reload(auth.currentUser);
    }

    return {
      success: true,
      message: "Email verified successfully",
      email: info.data.email,
    };
  } catch (error: any) {
    console.error("Error verifying email:", error);

    let errorMessage = "Failed to verify email";

    if (error.code === "auth/invalid-action-code") {
      errorMessage = "Invalid or expired verification code";
    } else if (error.code === "auth/expired-action-code") {
      errorMessage = "Verification code has expired";
    } else if (error.code === "auth/user-disabled") {
      errorMessage = "This account has been disabled";
    }

    throw new Error(errorMessage);
  }
};

export const checkEmailVerificationStatus = async (): Promise<{
  isVerified: boolean;
  email: string | null;
}> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user logged in");
    }

    // Reload user to get fresh email verification status
    await reload(user);

    return {
      isVerified: user.emailVerified,
      email: user.email,
    };
  } catch (error: any) {
    console.error("Error checking email verification status:", error);
    throw new Error("Failed to check verification status");
  }
};
