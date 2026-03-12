import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lin's InfoTech | Premier AI & Web Development Agency",
  description: "Next-generation AI solutions, high-end web development, and intelligent automation systems for businesses looking to lead the future.",
  keywords: ["AI Development", "Web Development", "Next.js Agency", "Lin's InfoTech", "Automation Solutions"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased selection:bg-primary/30 selection:text-white`}>
        <div className="flex flex-col min-h-screen relative">
          {/* Background Elements */}
          <div className="fixed inset-0 bg-grid pointer-events-none opacity-[0.03] z-0" />

          <Navbar />
          <main className="flex-grow z-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
