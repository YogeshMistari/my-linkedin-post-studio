import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Studio by Data With Anurag",
  description:
    "A LinkedIn and X creator studio by Anurag Srivastava, Founder of Data With Anurag.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
