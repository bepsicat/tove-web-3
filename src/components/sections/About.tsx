"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const headingWords =
    "Situated just next to Kodbyen. The perfect place to start your night — or never leave.".split(
      " "
    );

  return (
    <section
      ref={ref}
      className="bg-tan text-brown px-6 py-24 md:px-12 lg:px-24 lg:py-32 overflow-hidden"
      id="about"
    >
      <motion.div className="max-w-3xl mx-auto" style={{ y }}>
        {/* Heading with word-by-word reveal */}
        <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-snug font-normal mb-8">
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.035,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {word === "—" ? <>&mdash;</> : word}
            </motion.span>
          ))}
        </p>

        {/* Body text with horizontal line reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.div
            className="w-full h-px bg-brown/20 mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <p className="text-lg md:text-xl leading-relaxed font-light text-brown/80">
            Natural wines sourced by Allez Allez. Cocktails made right. Music that
            supports conversation, not dominates it.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
