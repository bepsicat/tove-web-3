"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

type BookingType = "" | "weekday" | "weekend" | "private";

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function Booking() {
  const [bookingType, setBookingType] = useState<BookingType>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <SectionWrapper className="bg-brown text-white" id="booking">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <motion.h2
            className="font-serif text-4xl md:text-5xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Come by
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                label: "Name",
                type: "text",
                placeholder: "Your name",
                required: true,
              },
              {
                label: "Email",
                type: "email",
                placeholder: "your@email.com",
                required: true,
              },
            ].map((field, i) => (
              <motion.div
                key={field.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fieldVariants}
              >
                <label className="block text-sm uppercase tracking-wider text-white/60 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder:text-white/30 focus:border-mustard focus:outline-none transition-colors duration-500"
                  placeholder={field.placeholder}
                />
              </motion.div>
            ))}

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
            >
              <label className="block text-sm uppercase tracking-wider text-white/60 mb-2">
                What are you looking for?
              </label>
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value as BookingType)}
                className="w-full bg-transparent border-b border-white/30 pb-2 text-white focus:border-mustard focus:outline-none transition-colors duration-500 cursor-pointer"
              >
                <option value="" className="text-brown">
                  Select...
                </option>
                <option value="weekday" className="text-brown">
                  Weekday reservation
                </option>
                <option value="weekend" className="text-brown">
                  Weekend visit
                </option>
                <option value="private" className="text-brown">
                  Private event
                </option>
              </select>
            </motion.div>

            <AnimatePresence>
              {bookingType === "weekend" && (
                <motion.p
                  className="text-mustard text-sm font-light leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  We don&apos;t take bookings after 17:30 on Fri/Sat &mdash; first
                  come, first served.
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
            >
              <label className="block text-sm uppercase tracking-wider text-white/60 mb-2">
                Message
              </label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder:text-white/30 focus:border-mustard focus:outline-none transition-colors duration-500 resize-none"
                placeholder="Tell us what you need"
              />
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
            >
              <Button variant="primary" type="submit">
                Send inquiry
              </Button>
            </motion.div>
          </form>
        </div>

        {/* Map & Directions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-serif text-2xl mb-6">Find us</h3>
          <p className="text-white/70 font-light mb-6">
            Gasv&aelig;rksvej 29, 1656 K&oslash;benhavn V
          </p>

          <div className="aspect-[4/3] bg-brown-light rounded-sm overflow-hidden mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2250.1!2d12.5555!3d55.6665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652530fc4b5e3c7%3A0x8711de28a2ad5b28!2sGasv%C3%A6rksvej%2029%2C%201656%20K%C3%B8benhavn!5e0!3m2!1sen!2sdk!4v1"
              className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tove — Gasværksvej 29, Copenhagen"
            />
          </div>

          <motion.div
            className="space-y-2 text-sm text-white/60 font-light"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
            }}
          >
            {[
              "Bus 1A, 10 \u2014 Gasv\u00e6rksvej stop",
              "Metro \u2014 K\u00f8benhavn H (12 min walk)",
              "S-train \u2014 K\u00f8benhavn H / Dybb\u00f8lsbro",
            ].map((line) => (
              <motion.p
                key={line}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
