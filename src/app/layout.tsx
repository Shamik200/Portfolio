import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../../components/providers";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { EasterEggs } from "../../components/easter-eggs";
import { CursorFollower } from "../../components/cursor-follower";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shamik Munjani - Software Engineer | AI/ML | Android | Competitive Programmer",
  description: "Software Engineer specializing in AI/ML, Android development, and competitive programming. Building intelligent solutions with Python, TensorFlow, Kotlin, and modern web technologies. Expert in algorithmic problem-solving with 1400+ Codeforces rating.",
  keywords: "Shamik Munjani, Software Engineer, AI/ML Developer, Android Developer, Competitive Programming, Python, TensorFlow, PyTorch, Kotlin, React, Next.js, Machine Learning, Algorithms, Codeforces, LeetCode",
  authors: [{ name: "Shamik Munjani" }],
  creator: "Shamik Munjani",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shamik-portfolio.vercel.app",
    title: "Shamik Munjani - Software Engineer | AI/ML | Android | Competitive Programmer",
    description: "Software Engineer specializing in AI/ML, Android development, and competitive programming with 1400+ Codeforces rating.",
    siteName: "Shamik Munjani Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shamik Munjani - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shamik Munjani - Software Engineer | AI/ML | Android | Competitive Programmer",
    description: "Software Engineer specializing in AI/ML, Android development, and competitive programming with 1400+ Codeforces rating.",
    images: ["/og-image.jpg"],
    creator: "@ShamikMunjani",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <Providers>
          <CursorFollower />
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <EasterEggs />
        </Providers>
      </body>
    </html>
  );
}
