import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GlowAI — The World's First AI Wellness Mirror",
  description:
    "GlowAI is an AI-powered wellness intelligence platform that uses your face as a gateway to understanding your overall well-being. See beyond your skin. Discover your wellness.",
  keywords: [
    "AI wellness",
    "skin analysis",
    "glow score",
    "wellness mirror",
    "beauty AI",
    "skincare",
    "health tracking",
  ],
  openGraph: {
    title: "GlowAI — The World's First AI Wellness Mirror",
    description:
      "See Beyond Your Skin. Discover Your Wellness. AI-powered wellness intelligence that connects beauty with lifestyle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={inter.variable}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
