import { FIREBASE_COLLECTIONS } from "@/constants";
import { auth, db } from "@/lib/firebase";
import { Months } from "@/types";
import { getFormatedMonth, getMonthNameFromDate } from "@/utils/helper";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

type ContributionData = {
  amount: number;
  date?: Date;
  month: Months;
};

const getContributionByMonth = async (month: string, userId: string) => {
  const q = query(
    collection(db, FIREBASE_COLLECTIONS.contributions),
    where("month", "==", month),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const createContribution = async (data: ContributionData) => {
  try {
    const uniqueId = `${auth.currentUser?.uid}_${new Date().getTime()}`;
    const userId = auth.currentUser?.uid ?? "";

    const month = getFormatedMonth(
      data.month,
      data.date && String(data.date.getFullYear())
    );

    const existingContributions = await getContributionByMonth(month, userId);

    if (existingContributions.length > 0) {
      return {
        success: false,
        message: "You have already contributed for this month.",
      };
    }

    const docRef = doc(db, "contributions", uniqueId);

    await setDoc(docRef, {
      id: uniqueId,
      amount: data.amount,
      date: data.date ? data.date : new Date(),
      userId: auth.currentUser?.uid,
      month: month,
    });

    return {
      success: true,
      message: `Contribution of $${data.amount} for ${month} added successfully!`,
    };
  } catch (error) {
    console.error("Error creating contribution:", error);
    throw new Error("Failed to create contribution");
  }
};
