import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { sfPro, inter } from "./fonts";
import { Suspense } from "react";
import { Metadata } from "next";

import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Ganalytics from './ganalytics';
import cx from "classnames";

interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

export const metadata: Metadata = {
  title: "SolidityNirvana | Ultimate Guide to Solidity",
  description:
    "Learn solidity with comprehensive guides and videos, this is a hands-on programming course with foundry-rs",
  keywords:
    [
      "Solidity", "SolidityNirvana", "Solidity guide", "Solidity tutorial", "Solidity examples", "Learn Solidity",
      "Solidity course", "Solidity foundry", "best solidity course 2024", "learn solidity"
  ],
  twitter: {
    card: "summary_large_image",
    title: "SolidityNirvana",
    description:
      "The ultimate guide to Solidity",
    creator: "@SolidityNirvana",
  },
  openGraph: {
    type: "website",
    url: "https://soliditynirvana.com",
    siteName: "SolidityNirvana",
    images: [
      {
        url: "https://www.soliditynirvana.com/_next/image?url=%2Fwaterfall.png&w=640&q=75",
        width: 640,
        height: 640,
        alt: "SolidityNirvana",
      },
    ],
    title: "SolidityNirvana | Ultimate Guide to Solidity",
    description: "Learn solidity today with the ultimate guide, 2024",
  },
  metadataBase: new URL("https://soliditynirvana.com"),
  themeColor: "#000",
};

const locales = ['en', 'ar', 'zh', 'fr', 'de', 'hi', 'id', 'pt', 'ru', 'es', 'tr']

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
