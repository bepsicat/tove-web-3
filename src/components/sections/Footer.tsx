"use client";

import { motion } from "framer-motion";

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-teal text-white px-6 py-20 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Address */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
        >
          <h3 className="font-serif text-2xl mb-4">Tove</h3>
          <p className="text-white/60 font-light text-sm leading-relaxed">
            Gasv&aelig;rksvej 29
            <br />
            1656 K&oslash;benhavn V
            <br />
            Denmark
          </p>
        </motion.div>

        {/* Hours */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
        >
          <h4 className="text-sm uppercase tracking-wider text-white/40 mb-4">
            Hours
          </h4>
          <div className="space-y-1 text-sm text-white/60 font-light">
            <p>Tue&ndash;Thu: 16&ndash;00</p>
            <p>Fri&ndash;Sat: 14&ndash;02</p>
            <p>Sun&ndash;Mon: Closed</p>
          </div>
        </motion.div>

        {/* Instagram */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
        >
          <h4 className="text-sm uppercase tracking-wider text-white/40 mb-4">
            Follow along
          </h4>
          <a
            href="https://instagram.com/tovecph"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-mustard hover:text-white transition-colors duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-sm">@tovecph</span>
          </a>
          <p className="mt-4 text-sm text-white/40 font-light leading-relaxed">
            See what&apos;s going on at the bar.
          </p>
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/10 text-center">
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.p
            className="font-serif text-xl text-white/50 italic"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Come by. Stay a while.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
