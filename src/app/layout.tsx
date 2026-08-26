import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import MotionProvider from "@/components/layout/MotionProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = "https://www.tove.dk/";
const siteTitle = "Tove — Bar on Vesterbro, Copenhagen";
const siteDescription =
  "Tove is a bar on Vesterbro, Copenhagen, serving cocktails, cold beers and natural wine at Gasværksvej 29.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Tove",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        <MotionProvider>
          <div className="grain-overlay">{children}</div>
        </MotionProvider>
      </body>
    </html>
  );
}
