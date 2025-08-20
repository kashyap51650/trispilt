import { db } from "@/lib/firebase";
import { UserInfo } from "@/types";
import { doc, setDoc } from "firebase/firestore";

export const createUser = async (data: UserInfo) => {
  try {
    const { id, name, email, avatar, mobile } = data;

    const res = await setDoc(doc(db, "users", id), {
      id: id,
      name: name,
      email: email,
      profileUrl: avatar,
      mobile: mobile,
    });

    return res;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};
