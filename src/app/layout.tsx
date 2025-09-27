import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Srishti Jaiswal - Software Engineer & AI Developer",
  description: "Aspiring Software Engineer | Full-Stack Developer | Building Intelligent Systems with AI. Recent B.Tech Computer Science graduate with experience in React, TypeScript, AI/ML, and scalable system design.",
  keywords: "Srishti Jaiswal, Software Engineer, Full-Stack Developer, AI Developer, React, TypeScript, Next.js, Machine Learning, Portfolio",
  authors: [{ name: "Srishti Jaiswal" }],
  openGraph: {
    title: "Srishti Jaiswal - Software Engineer & AI Developer",
    description: "Aspiring Software Engineer | Full-Stack Developer | Building Intelligent Systems with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
