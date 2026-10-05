import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Studio — Creator Growth for LinkedIn + X",
  description:
    "Turn professional expertise into trusted LinkedIn and X content with local AI.",
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
