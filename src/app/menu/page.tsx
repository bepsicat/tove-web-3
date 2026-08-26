import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Logo from "@/components/ui/Logo";
import {
  menuStructuredData,
  menuUrl,
  siteName,
} from "@/lib/site";

const menuTitle = "Drinks Menu | Tove — Vesterbro, Copenhagen";
const menuDescription =
  "Explore the drinks menu at Tove on Vesterbro, with cocktails, draught and bottled beer, natural wine, non-alcoholic drinks and snacks.";

export const metadata: Metadata = {
  title: menuTitle,
  description: menuDescription,
  alternates: {
    canonical: menuUrl,
  },
  openGraph: {
    title: menuTitle,
    description: menuDescription,
    url: menuUrl,
    siteName,
    locale: "en_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: menuTitle,
    description: menuDescription,
  },
};

const fullMenu = {
  "Long Drinks": [
    { name: "Vermouth Tonic", price: "75 DKK" },
    { name: "Gin & Tonic", price: "80 DKK" },
    { name: "Vodka Maté", price: "80 DKK" },
    { name: "Tequila Soda", price: "80 DKK" },
    { name: "Cuba Libre", price: "85 DKK" },
  ],
  Cocktails: [
    { name: "Paloma", price: "85 DKK" },
    { name: "Gin Hass", price: "85 DKK" },
    { name: "Tove Margarita", price: "90 DKK" },
    { name: "Whiskey Sour", price: "90 DKK" },
    { name: "Vermouth Sour", price: "90 DKK" },
    { name: "Gin Sour", price: "90 DKK" },
    { name: "Negroni", price: "95 DKK" },
    { name: "Long Island Cowboy", price: "120 DKK" },
  ],
  Shots: [
    { name: "Tove Special", price: "30 / 250 DKK" },
    { name: "Ferrari", price: "30 / 250 DKK" },
    { name: "Fernet", price: "30 / 250 DKK" },
    { name: "Sambuca", price: "30 / 250 DKK" },
    { name: "House Tequila", price: "30 / 250 DKK" },
    { name: "1942 Don Julio", price: "100 DKK" },
  ],
  "Bottled Beer": [
    { name: "Carlsberg", price: "32 DKK" },
    { name: "Grøn Tuborg", price: "32 DKK" },
    { name: "Tuborg Classic", price: "32 DKK" },
    { name: "Gulddame", price: "35 DKK" },
    { name: "5x Bottles", price: "135 DKK" },
  ],
  "Draught Beer": [
    { name: "Grøn Tuborg", price: "35/55 DKK" },
    { name: "Tuborg Classic", price: "35/55 DKK" },
    { name: "1664 Blanc", price: "40/60 DKK" },
    { name: "Mikkeller IPA", price: "45/65 DKK" },
    { name: "Angelo Perotti", price: "45/65 DKK" },
  ],
  "Non-Alcoholic": [
    { name: "Beer", price: "45 DKK" },
    { name: "Kombucha", price: "45 DKK" },
  ],
  "Natural Wines": [
    { name: "Red", price: "75/325 DKK" },
    { name: "White", price: "75/325 DKK" },
    { name: "Orange", price: "75/325 DKK" },
    { name: "Bubbles", price: "Ask in the bar" },
  ],
  Snacks: [
    { name: "Chips w. Dip", price: "40 DKK" },
    { name: "Nuts", price: "35 DKK" },
    { name: "Pork Crackling", price: "35 DKK" },
    { name: "Olives", price: "35 DKK" },
  ],
};

export default function MenuPage() {
  return (
    <>
      <JsonLd data={menuStructuredData} />
      <main className="min-h-screen bg-sage text-brown">
        <header className="bg-brown px-6 py-8 text-white md:px-12 lg:px-24">
          <nav
            aria-label="Menu page navigation"
            className="mx-auto flex max-w-5xl items-center justify-between"
          >
            <Link href="/" aria-label="Tove home">
              <Logo className="w-28 md:w-36" fill="#ECBB69" />
            </Link>
            <Link
              href="/"
              className="text-sm uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-mustard"
            >
              Back to home
            </Link>
          </nav>
        </header>

        <div className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
          <header className="mb-16 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-brown/50">
              Gasværksvej 29 · Vesterbro
            </p>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">
              Drinks menu
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-brown/70 md:text-xl">
              Cocktails made right, cold beers, natural wine and a few good
              snacks. Prices are in Danish kroner.
            </p>
          </header>

          <div className="space-y-16">
            {Object.entries(fullMenu).map(([category, items]) => (
              <section key={category} aria-labelledby={`menu-${category.toLowerCase().replaceAll(" ", "-")}`}>
                <h2
                  id={`menu-${category.toLowerCase().replaceAll(" ", "-")}`}
                  className="mb-6 font-serif text-3xl md:text-4xl"
                >
                  {category}
                </h2>
                <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                  {items.map((item) => (
                    <div
                      key={`${category}-${item.name}`}
                      className="flex items-start justify-between gap-6 border-b border-brown/15 py-5"
                    >
                      <h3 className="text-base font-medium">{item.name}</h3>
                      <span className="whitespace-nowrap text-sm text-brown/70">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="mt-20 border-t border-brown/20 pt-10 text-brown/70">
            <h2 className="font-serif text-2xl text-brown">Reservations</h2>
            <p className="mt-3 max-w-2xl font-light leading-relaxed">
              Reservations are welcome throughout opening hours Tuesday to
              Thursday. On Friday and Saturday, reservations are available for
              arrivals up to 17:30; after that, it&apos;s walk-ins only.
            </p>
            <Link
              href="/#booking"
              className="mt-6 inline-block bg-mustard px-7 py-3 text-sm font-medium uppercase tracking-[0.15em] text-brown transition-colors hover:bg-mustard/80"
            >
              Book a table
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}
