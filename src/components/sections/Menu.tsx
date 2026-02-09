"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const houseFavorites = [
  { name: "Mikkeller IPA", price: "45/65 DKK", description: "Hops without the attitude." },
  { name: "Angelo Perotti", price: "45/65 DKK", description: "Clean, crisp, Italian." },
  { name: "Toves White", price: "75/325 DKK", description: "Natural white. Bright, mineral, drinks easy." },
  { name: "Vermouth Tonic", price: "75 DKK", description: "Aperitivo energy." },
  { name: "Vodka Mat\u00e9", price: "80 DKK", description: "Caffeinated clarity." },
  { name: "Tove Margarita", price: "90 DKK", description: "Heat. Lime. Salt rim. The way it should be." },
  { name: "Whiskey Sour", price: "90 DKK", description: "Classic. No shortcuts." },
  { name: "Negroni", price: "95 DKK", description: "Bitter. Stirred. Perfect." },
];

const fullMenu = {
  "Bottled Beer": [
    { name: "Carlsberg", price: "32 DKK" },
    { name: "Gr\u00f8n Tuborg", price: "32 DKK" },
    { name: "Tuborg Classic", price: "32 DKK" },
    { name: "Gulddame", price: "35 DKK" },
    { name: "5x Bottles", price: "125 DKK" },
  ],
  "Draught Beer": [
    { name: "Gr\u00f8n Tuborg", price: "35/55 DKK", note: "small/large" },
    { name: "Tuborg Classic", price: "35/55 DKK" },
    { name: "1664 Blanc", price: "40/60 DKK" },
    { name: "Mikkeller IPA", price: "45/65 DKK" },
    { name: "Angelo Perotti", price: "45/65 DKK" },
  ],
  "Non-Alc Beer": [
    { name: "Mikkeller", price: "45 DKK" },
    { name: "Brooklyn", price: "45 DKK" },
  ],
  "Natural Wines": [
    { name: "Toves Red", price: "75/325 DKK", note: "glass/bottle" },
    { name: "Toves White", price: "75/325 DKK" },
    { name: "Toves Orange", price: "75/325 DKK" },
    { name: "Champagne?", price: "1200 DKK" },
  ],
  Mixers: [
    { name: "Vermouth Tonic", price: "75 DKK" },
    { name: "Gin Tonic", price: "80 DKK" },
    { name: "Vodka Mat\u00e9", price: "80 DKK" },
    { name: "Tequila Soda", price: "80 DKK" },
    { name: "Rum Coke", price: "85 DKK" },
  ],
  Cocktails: [
    { name: "Tove Margarita", price: "90 DKK" },
    { name: "Whiskey Sour", price: "90 DKK" },
    { name: "Gin Sour", price: "90 DKK" },
    { name: "Negroni", price: "95 DKK" },
    { name: "Whatever", price: "100 DKK" },
    { name: "Long Island Cowboy", price: "115 DKK" },
  ],
  Snacks: [
    { name: "Chips w. Dip", price: "45 DKK" },
    { name: "Nuts", price: "35 DKK" },
    { name: "Fl\u00e6skesv\u00e6r", price: "35 DKK" },
    { name: "Olives", price: "35 DKK" },
    { name: "Popcorn", price: "35 DKK" },
  ],
};

function MenuItem({
  item,
  index,
}: {
  item: { name: string; price: string; description?: string; note?: string };
  index: number;
}) {
  return (
    <motion.div
      className="group relative py-6"
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="flex justify-between items-start transition-transform duration-500 group-hover:translate-x-2">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-medium">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-brown/60 mt-1 font-light">
              {item.description}
            </p>
          )}
        </div>
        <div className="text-right">
          <span className="text-sm font-medium whitespace-nowrap text-brown/70 transition-colors duration-500 group-hover:text-mustard">
            {item.price}
          </span>
          {item.note && (
            <p className="text-xs text-brown/40 mt-0.5 italic">{item.note}</p>
          )}
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-brown/15"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.06 + 0.3,
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}

export default function Menu() {
  const [showFull, setShowFull] = useState(false);

  return (
    <SectionWrapper className="bg-sage text-brown" id="menu">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-serif text-4xl md:text-5xl mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          House Favorites
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {houseFavorites.map((item, i) => (
            <MenuItem key={item.name} item={item} index={i} />
          ))}
        </div>

        <motion.p
          className="text-center mt-12 text-brown/60 font-light italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Missing something? Ask our bartenders &mdash; they&apos;re both nice and
          very capable.
        </motion.p>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => setShowFull(!showFull)}
            className="inline-block px-8 py-3 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500 ease-out cursor-pointer bg-mustard text-brown hover:bg-mustard/80"
          >
            {showFull ? "Show less" : "View full menu"}
          </button>
        </motion.div>

        {/* Expandable full menu */}
        <AnimatePresence>
          {showFull && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-16 space-y-16">
                {Object.entries(fullMenu).map(([category, items]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h3 className="font-serif text-2xl md:text-3xl mb-8">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                      {items.map((item, i) => (
                        <MenuItem key={item.name} item={item} index={i} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
