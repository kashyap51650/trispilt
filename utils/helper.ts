import { CURRENT_YEAR } from "@/constants";
import { Months } from "@/types";

export const getFormatedMonth = (monthIndex: Months, year?: string): string => {
  const monthNames: { [key in Months]: string } = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
  };
  console.log("Month Index:", monthIndex);
  console.log("Year:", year);
  return `${year || CURRENT_YEAR}-${monthNames[monthIndex]}`; // YYYY-MM format
};

export const getMonthNameFromDate = (date: Date): Months => {
  const monthNames: Months[] = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return monthNames[date.getMonth()];
};
