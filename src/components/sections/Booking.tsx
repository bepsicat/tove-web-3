"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

// 14:00 → 23:45 in 15-min steps
const timeSlots = Array.from({ length: 40 }, (_, i) => {
  const mins = 14 * 60 + i * 15;
  const h = Math.floor(mins / 60).toString().padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
});

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const selectedDay = date ? new Date(date + "T12:00:00").getDay() : -1;
  const isFriOrSat = selectedDay === 5 || selectedDay === 6;
  const isWeekendBlocked = isFriOrSat && time !== "" && time >= "17:30";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isWeekendBlocked) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date, time, message }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <SectionWrapper className="bg-brown text-white" id="booking">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              We&apos;ll be in touch.
            </h2>
            <p className="text-white/60 font-light text-lg">
              Your inquiry has been sent. We&apos;ll reply to{" "}
              <span className="text-mustard">{email}</span> shortly.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>
    );
  }

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
            {/* Name */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
            >
              <label className="block text-sm uppercase tracking-wider text-white/60 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder:text-white/30 focus:border-mustard focus:outline-none transition-colors duration-500"
                placeholder="Your name"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
            >
              <label className="block text-sm uppercase tracking-wider text-white/60 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder:text-white/30 focus:border-mustard focus:outline-none transition-colors duration-500"
                placeholder="your@email.com"
              />
            </motion.div>

            {/* Date + Time */}
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
              className="grid grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm uppercase tracking-wider text-white/60 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-transparent border-b border-white/30 pb-2 text-white focus:border-mustard focus:outline-none transition-colors duration-500 [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-sm uppercase tracking-wider text-white/60 mb-2">
                  Arrival
                </label>
                <select
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 pb-2 text-white focus:border-mustard focus:outline-none transition-colors duration-500 cursor-pointer"
                >
                  <option value="" className="text-brown">Select...</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="text-brown">
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Fri/Sat cutoff warning */}
            <AnimatePresence>
              {isFriOrSat && !isWeekendBlocked && (
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
              {isWeekendBlocked && (
                <motion.p
                  className="text-red-300 text-sm font-light leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Walk-ins only after 17:30 on Fri/Sat &mdash; no reservations.
                  See you then!
                </motion.p>
              )}
            </AnimatePresence>

            {/* Message */}
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 pb-2 text-white placeholder:text-white/30 focus:border-mustard focus:outline-none transition-colors duration-500 resize-none"
                placeholder="Tell us what you need"
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
            >
              <Button
                variant="primary"
                type="submit"
                disabled={isWeekendBlocked || status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send inquiry"}
              </Button>
              {status === "error" && (
                <p className="mt-3 text-red-300 text-sm font-light">
                  Something went wrong. Try emailing us directly at{" "}
                  <a
                    href="mailto:kontakt@tove.dk"
                    className="underline underline-offset-2"
                  >
                    kontakt@tove.dk
                  </a>
                </p>
              )}
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
              src="https://maps.google.com/maps?q=Gasv%C3%A6rksvej+29%2C+1656+K%C3%B8benhavn+V%2C+Denmark&output=embed"
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
