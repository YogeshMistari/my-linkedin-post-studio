import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Studio — LinkedIn + X",
  description: "Personal content copilot for LinkedIn and X.",
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
