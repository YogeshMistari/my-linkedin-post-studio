import type { Metadata } from "next";
import { creatorConfig } from "@/config/creator.config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yogesh Post Studio",
  description:
    "A LinkedIn content studio by Yogesh Mistari, focused on Oracle SQL, PL/SQL, application support and Google Cloud learning.",
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
