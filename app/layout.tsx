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
  title: "Unfold - AI Moodboard Generator",
  description: "AI reasons, UI streams. Watch your creative vision unfold progressively as each design element arrives in real-time.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Unfold - AI Moodboard Generator",
    description: "AI reasons, UI streams. Watch your creative vision unfold progressively as each design element arrives in real-time.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unfold - AI Moodboard Generator",
    description: "AI reasons, UI streams. Watch your creative vision unfold progressively as each design element arrives in real-time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
