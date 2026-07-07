import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lin's InfoTech | Premium AI Solutions & Web Development",
  description: "Lin's InfoTech is a premium technology agency specializing in custom AI solutions, high-performance web development, and intelligent workflow automation for modern businesses.",
  keywords: ["AI solutions", "Web Development", "Next.js", "AI Agency", "Automation", "Lin's InfoTech", "Custom Software"],
  openGraph: {
    title: "Lin's InfoTech | Premium AI Solutions",
    description: "Building Intelligent AI Solutions for Modern Businesses.",
    url: "https://linsinfotech.in",
    siteName: "Lin's InfoTech",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
