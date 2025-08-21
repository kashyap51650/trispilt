import { db } from "@/lib/firebase";
import { UserInfo } from "@/types";
import { doc, setDoc } from "firebase/firestore";

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
