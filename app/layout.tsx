import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { sfPro, inter } from "./fonts";
import { Suspense } from "react";
import Script from 'next/script';

import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Ganalytics from './ganalytics';
import cx from "classnames";

interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

export const metadata = {
  title: "SolidityNirvana",
  description:
    "The ultimate guide to Solidity",
  twitter: {
    card: "summary_large_image",
    title: "SolidityNirvana",
    description:
      "The ultimate guide to Solidity",
    creator: "@SolidityNirvana",
  },
  metadataBase: new URL("https://soliditynirvana.com"),
  themeColor: "#000",
};

const locales = [
  'en', 'ja', 'zh', 'de', 'hi', 'fr', 'ko', 'pt', 'it', 'es', 'id', 'nl', 'tr', 'tl', 'pl',
  'sv', 'bg', 'ro', 'ar', 'cs', 'el', 'fi', 'hr', 'ms', 'sk', 'da', 'ta', 'uk', 'ru'
]

export default async function RootLayout({children, params: {locale}}) {
  return (
    <html lang={locale}>
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-orange-100 via-green to-green-200" />
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center py-32">
          {children}
        </main>
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Footer />
        </Suspense>
        <Analytics />
        
        <Ganalytics />
      </body>
    </html>
  );
}
