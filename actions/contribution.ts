import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

type ContributionData = {
  amount: number;
  date?: Date;
  month?: string;
};

export const createContribution = async (data: ContributionData) => {
  try {
    const uniqueId = `${auth.currentUser?.uid}_${new Date().getTime()}`;

    const docRef = doc(db, "contributions", uniqueId);

    await setDoc(docRef, {
      id: uniqueId,
      amount: data.amount,
      date: data.date ? data.date : new Date(),
      userId: auth.currentUser?.uid,
      month: data.month ? data.month : new Date().toISOString().slice(0, 7), // YYYY-MM
    });

    return {
      success: true,
      message: `Contribution of $${data.amount} added successfully!`,
    };
  } catch (error) {
    console.error("Error creating contribution:", error);
    throw new Error("Failed to create contribution");
  }
};
