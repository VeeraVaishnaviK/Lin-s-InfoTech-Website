import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import LenisProvider from "@/components/animations/LenisProvider";
import ScrollProgress from "@/components/animations/ScrollProgress";
import Preloader from "@/components/animations/Preloader";
import CustomCursor from "@/components/animations/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lin's InfoTech | AI Solutions Company",
  description: "A premium AI-powered technology agency specializing in AI solutions, web development, and automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Preloader />
          <CustomCursor />
          <LenisProvider>
            <ScrollProgress />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
