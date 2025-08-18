import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Group Finance Management",
  description: "Manage your group finances efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mulish.variable}>
      <body
        className={cn(
          "min-h-screen font-sans",
          "bg-background text-foreground"
        )}
      >
        <div className="max-w-xl mx-auto p-8 xs:p-10 border rounded-md">
          {children}
        </div>
      </body>
    </html>
  );
}
