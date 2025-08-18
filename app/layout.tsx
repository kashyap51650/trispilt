import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
