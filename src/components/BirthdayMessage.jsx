import { motion } from "framer-motion";

export default function BirthdayMessage({ config }) {
  const paragraphs = config.finalMessage.split("\n\n").filter(Boolean);
  return (
    <section
      id="message"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0610 0%, #0d0608 65%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(107,31,58,0.15) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-2xl w-full mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold/40 font-sans text-xs tracking-[0.3em] uppercase text-center mb-8"
        >
          From the heart
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-serif text-cream font-light text-center mb-12"
          style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
        >
          {config.letterTitle}
        </motion.h2>
        <div
          className="glass rounded-2xl p-8 md:p-12"
          style={{ border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <div
            className="w-12 h-px mb-8 mx-auto"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
          />
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: "easeOut" }}
              className="font-serif text-cream/80 leading-relaxed mb-6 last:mb-0"
              style={{
                fontSize: "clamp(0.95rem,2vw,1.1rem)",
                whiteSpace: "pre-line",
                ...(i === paragraphs.length - 1
                  ? {
                      fontStyle: "italic",
                      color: "rgba(232,180,188,0.9)",
                      fontSize: "clamp(1rem,2.5vw,1.3rem)",
                    }
                  : {}),
              }}
            >
              {para}
            </motion.p>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: paragraphs.length * 0.18 + 0.2,
            }}
            className="mt-8 text-center"
          >
            <span
              style={{
                color: "var(--rose)",
                fontSize: "1.5rem",
                filter: "drop-shadow(0 0 8px rgba(196,116,138,0.5))",
              }}
            >
              {/* ♡ */}
            </span>
          </motion.div>
          <div
            className="w-12 h-px mt-8 mx-auto"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 text-center font-script text-cream/30 text-base"
        >
          শুধু তোমার জন্য
        </motion.p>
      </div>
    </section>
  );
}
