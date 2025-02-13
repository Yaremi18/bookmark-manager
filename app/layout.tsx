import type { Metadata } from "next";
import { Italiana } from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookmarker",
  description: "App to save your bookmarks",
  icons: [
    {
      url: "/logo.png",
      rel: "icon",
      type: "image/png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={italiana.className}>{children}</body>
    </html>
  );
}
