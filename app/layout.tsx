import type { Metadata } from "next";
import { creatorConfig } from "@/config/creator.config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Studio by Data With Anurag",
  description:
    "A LinkedIn and X creator studio by Anurag Srivastava, Founder of Data With Anurag.",
  icons: {
    icon: creatorConfig.app.faviconPath,
    shortcut: creatorConfig.app.faviconPath,
    apple: creatorConfig.app.faviconPath,
  },
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
