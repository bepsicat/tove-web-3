"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import Logo from "@/components/ui/Logo";

const heroImages = Array.from({ length: 11 }, (_, i) => `/images/hero-${i + 1}.webp`);
const SLIDE_DURATION = 6000; // 6s per slide — slow

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [advance]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brown"
    >
      {/* Carousel background with parallax + slow zoom */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={heroImages[current]}
              alt=""
              fill
              className="object-cover"
              priority={current === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        {/* Preload next image */}
        <link
          rel="preload"
          as="image"
          href={heroImages[(current + 1) % heroImages.length]}
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-brown/50" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo with gentle breathing */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30, scale: 1.08 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ scale: [1, 1.015, 1] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h1 className="sr-only">Tove</h1>
            <Logo
              className="w-[280px] md:w-[420px] lg:w-[500px] mx-auto"
              fill="#ECBB69"
            />
          </motion.div>
        </motion.div>

        {/* Tagline — words fade in one by one */}
        <motion.p
          className="text-white/80 text-lg md:text-xl leading-relaxed font-light max-w-xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.6 } },
          }}
        >
          {"Re-opened in 2024, Tove is Vesterbro's living room. Classic beers. Modern drinks. Delicate wine. Fair prices."
            .split(" ")
            .map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
        </motion.p>

        {/* Hours — soft fade with divider growing */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/60 text-sm tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span>Tue&ndash;Thu: 16&ndash;00</span>
          <motion.span
            className="hidden sm:block w-px bg-white/30"
            initial={{ height: 0 }}
            animate={{ height: 16 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          />
          <span>Fri&ndash;Sat: 14&ndash;02</span>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
