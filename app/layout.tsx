import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comments",
  description:
    "This project is a web application created using Next.js, TypeScript, and Tailwind CSS. The application allows users to view, add, and delete comments on a website. The main functionality is centered around enabling users to share their thoughts, questions, and feedback on web pages and receive responses from other users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
