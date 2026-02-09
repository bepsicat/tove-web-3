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

export const metadata: Metadata = {
  title: "Tove — Vesterbro's Living Room",
  description:
    "Re-opened in 2024, Tove is Vesterbro's living room. Classic beers. Modern drinks. Delicate wine. Fair prices.",
  metadataBase: new URL("https://tovecph.dk"),
  openGraph: {
    title: "Tove — Vesterbro's Living Room",
    description:
      "Classic beers. Modern drinks. Delicate wine. Fair prices. Gasvaerksvej 29, Copenhagen.",
    locale: "da_DK",
    type: "website",
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
