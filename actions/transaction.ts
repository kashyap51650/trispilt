import { FIREBASE_COLLECTIONS } from "@/constants";
import { auth, db } from "@/lib/firebase";
import { TransactionFormData } from "@/schema/amount";
import { TransactionType } from "@/types";
import { formateAmount } from "@/utils/helper";
import { doc, setDoc } from "firebase/firestore";

export const createTransaction = async (
  transactionData: TransactionFormData & { type: TransactionType }
) => {
  try {
    const userId = auth.currentUser?.uid ?? "";
    const userName = auth.currentUser?.displayName ?? "Unknown";
    const uniqueId = `${userId}_${new Date().getTime()}`;

    const docRef = doc(db, FIREBASE_COLLECTIONS.transactions, uniqueId);

    await setDoc(docRef, {
      id: uniqueId,
      userId: userId,
      title: transactionData.title,
      amount: parseFloat(transactionData.amount),
      date: new Date(transactionData.date).toDateString(),
      category: transactionData.category,
      type: transactionData.type,
      by: userName,
    });

    return {
      success: true,
      message: `${
        transactionData.type === TransactionType.INCOME ? "Income" : "Expense"
      } of ${formateAmount(
        parseFloat(transactionData.amount)
      )} added successfully.`,
    };
  } catch (err) {
    console.error("Error adding transaction: ", err);
    return { success: false, message: "Failed to add transaction." };
  }
};
