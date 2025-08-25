import { FIREBASE_COLLECTIONS } from "@/constants";
import { auth, db } from "@/lib/firebase";
import { Contribution, Months } from "@/types";
import { getFormatedMonth } from "@/utils/helper";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

type ContributionData = {
  amount: number;
  date?: string;
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
      data.date && String(new Date(data.date).getFullYear())
    );

    const existingContributions = await getContributionByMonth(month, userId);

    if (existingContributions.length > 0) {
      return {
        success: false,
        message: "You have already contributed for this month.",
      };
    }

    const docRef = doc(db, FIREBASE_COLLECTIONS.contributions, uniqueId);

    await setDoc(docRef, {
      id: uniqueId,
      amount: data.amount,
      date: data.date ? data.date : new Date().toDateString(),
      userId: userId,
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

export const fetchContributions = async (): Promise<Contribution[]> => {
  try {
    const contributionsRef = collection(db, FIREBASE_COLLECTIONS.contributions);
    const querySnapshot = await getDocs(contributionsRef);

    const data = await Promise.all(
      querySnapshot.docs.map(async (document) => {
        const contributionData = document.data();

        const userRef = doc(
          db,
          FIREBASE_COLLECTIONS.users,
          contributionData.userId
        );

        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        return {
          id: document.id,
          ...contributionData,
          user: {
            id: userData?.id,
            name: userData?.name,
            avatar: userData?.profileUrl,
          },
        } as Contribution;
      })
    );

    return data;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    throw new Error("Failed to fetch contributions");
  }
};

export const fetchUserContributions = async (
  userId: string
): Promise<Contribution[]> => {
  try {
    const contributionsRef = collection(db, FIREBASE_COLLECTIONS.contributions);
    const q = query(contributionsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    let userData: DocumentData | undefined;

    const data = await Promise.all(
      querySnapshot.docs.map(async (document) => {
        const contributionData = document.data();

        if (!userData) {
          const userRef = doc(
            db,
            FIREBASE_COLLECTIONS.users,
            contributionData.userId
          );
          const userSnap = await getDoc(userRef);
          userData = userSnap.data();
        }

        return {
          id: document.id,
          ...contributionData,
          user: {
            id: userData?.id,
            name: userData?.name,
            avatar: userData?.profileUrl,
          },
        } as Contribution;
      })
    );
    return data;
  } catch (error) {
    console.error("Error fetching user contributions:", error);
    throw new Error("Failed to fetch user contributions");
  }
};
