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

export const getFullMonthAndYear = (month: string) => {
  const [year, monthNum] = month.split("-");
  const monthNames: { [key: string]: string } = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  return `${monthNames[monthNum]} ${year}`;
};

export const formateAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};
