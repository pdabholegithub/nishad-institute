import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: 'swap', variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], display: 'swap', variable: '--font-outfit' });
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import NextTopLoader from 'nextjs-toploader';
import { AIChatAssistant } from "@/components/ai/AIChatAssistant";
import { WhatsAppButton } from "@/components/marketing/WhatsAppButton";

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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col text-slate-800 dark:text-slate-200">
        <NextTopLoader
          color="#f59e0b"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #f97316,0 0 5px #f97316"
        />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <AIChatAssistant />
        <WhatsAppButton />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
