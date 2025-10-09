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
  keywords: "Srishti Jaiswal, Software Engineer, Full-Stack Developer, AI Developer, React, TypeScript, Next.js, Machine Learning, Portfolio, Web Development, AI/ML, Java, Python, JavaScript",
  authors: [{ name: "Srishti Jaiswal" }],
  creator: "Srishti Jaiswal",
  publisher: "Srishti Jaiswal",
  robots: "index, follow",
  openGraph: {
    title: "Srishti Jaiswal - Software Engineer & AI Developer",
    description: "Aspiring Software Engineer | Full-Stack Developer | Building Intelligent Systems with AI",
    type: "website",
    url: "https://srishti-portfolio.vercel.app",
    siteName: "Srishti Jaiswal Portfolio",
    images: [
      {
        url: "/images/profile-photo.jpg",
        width: 1200,
        height: 630,
        alt: "Srishti Jaiswal - Software Engineer & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Srishti Jaiswal - Software Engineer & AI Developer",
    description: "Aspiring Software Engineer | Full-Stack Developer | Building Intelligent Systems with AI",
    images: ["/images/profile-photo.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e293b",
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
