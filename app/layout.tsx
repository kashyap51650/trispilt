import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trispilt - Group Finance Management",
  description: "Manage your group finances efficiently",
  manifest: "/web.manifest",
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
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
