import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Mulish } from "next/font/google";
import NavigationFooter from "@/components/NavigationFooter";

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
          "h-screen flex flex-col font-sans",
          "bg-background text-foreground w-full relative max-w-xl mx-auto"
        )}
      >
        <div className="flex-grow rounded-md">{children}</div>
      </body>
    </html>
  );
}
