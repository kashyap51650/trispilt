import { auth, db } from "@/lib/firebase";
import { UpdateProfileData, UserInfo } from "@/types";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const createUser = async (data: UserInfo) => {
  try {
    const { id, name, email, avatar, mobile } = data;

    const userDoc = doc(db, "users", id);

    return await setDoc(userDoc, {
      id: id,
      name: name,
      email: email,
      profileUrl: avatar,
      mobile: mobile,
    });
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const updatedUser = async (data: UpdateProfileData) => {
  try {
    const { id, name, email, avatar, mobile } = data;

    const userDoc = doc(db, "users", id);

    // upload avatar if provided
    let avatarUrl = "";

    if (avatar) {
      avatarUrl = await uploadAvatar(avatar);
    }

    const user = auth.currentUser!;

    await updateProfile(user, {
      displayName: name,
      ...(avatarUrl && { photoURL: avatarUrl }),
    });

    return await setDoc(
      userDoc,
      {
        name: name,
        email: email,
        ...(avatarUrl !== "" && { profileUrl: avatarUrl }),
        mobile: mobile,
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

export const getUser = async (userId: string) => {
  try {
    const userDoc = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      throw new Error("User not found");
    }

    return userSnapshot.data() as UserInfo;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const uploadAvatar = async (file: Blob) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();

    const url = data.data;

    console.log("Image upload response:", data);
    return url;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};
