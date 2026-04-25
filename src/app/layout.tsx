import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: 'swap' });
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import NextTopLoader from 'nextjs-toploader';
import { AIChatAssistant } from "@/components/ai/AIChatAssistant";

export const metadata: Metadata = {
  title: "Nishad IT Solutions | Master Your Future",
  description: "Industry-leading IT training institute specializing in QA Automation, Full-stack Development, and DevOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.className}`}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col text-slate-800 dark:text-slate-200">
        <NextTopLoader
          color="#3b82f6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
        />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <AIChatAssistant />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
