import { FIREBASE_COLLECTIONS } from "@/constants";
import { auth, db } from "@/lib/firebase";
import { Transaction, TransactionInput, TransactionType } from "@/types";
import { formateAmount } from "@/utils/helper";
import { FirebaseError } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export const getTransactions = async () => {
  try {
    const transactionRef = collection(db, FIREBASE_COLLECTIONS.transactions);

    const response = await getDocs(transactionRef);

    const data = response.docs.map((doc) => doc.data()) as Transaction[];

    if (data.length > 0) {
      return {
        success: true,
        message: "Transactions fetched successfully.",
        data: data,
      };
    } else {
      return {
        success: false,
        message: "No transactions found.",
        data: [],
      };
    }
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof FirebaseError
          ? `Firebase Error - ${err.message}`
          : "Unknown error",
      data: [],
    };
  }
};

export const getSingleTransaction = async (id: string) => {
  try {
    const docRef = doc(db, FIREBASE_COLLECTIONS.transactions, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        message: "Transaction fetched successfully.",
        data: docSnap.data() as Transaction,
      };
    } else {
      return {
        success: false,
        message: "Transaction not found.",
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof FirebaseError
          ? `Firebase Error - ${err.message}`
          : "Unknown error",
      data: null,
    };
  }
};

export const createTransaction = async (transactionData: TransactionInput) => {
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
      data: uniqueId,
    };
  } catch (err) {
    console.error("Error adding transaction: ", err);
    return { success: false, message: "Failed to add transaction." };
  }
};

export const editTransaction = async (transactionData: TransactionInput) => {
  try {
    const docRef = doc(
      db,
      FIREBASE_COLLECTIONS.transactions,
      transactionData.id || ""
    );

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return {
        success: false,
        message: "Transaction not found.",
      };
    }

    await setDoc(docRef, {
      ...docSnap.data(),
      title: transactionData.title,
      amount: parseFloat(transactionData.amount),
      date: new Date(transactionData.date).toDateString(),
      category: transactionData.category,
    });

    return {
      success: true,
      message: `Transaction updated successfully.`,
      data: transactionData.id,
    };
  } catch (err) {
    console.error("Error updating transaction: ", err);
    return { success: false, message: "Failed to update transaction." };
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const docRef = doc(db, FIREBASE_COLLECTIONS.transactions, id);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return {
        success: false,
        message: "Transaction not found.",
      };
    }

    await deleteDoc(docRef);

    return {
      success: true,
      message: `Transaction deleted successfully.`,
    };
  } catch (err) {
    console.error("Error deleting transaction: ", err);
    return { success: false, message: "Failed to delete transaction." };
  }
};
