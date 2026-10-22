import { motion } from "framer-motion";
export default function QuoteSection({ quote, index = 0 }) {
  const isEven = index % 2 === 0;
  return (
    <section
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{
        background: isEven
          ? "linear-gradient(to bottom, #0d0608, #1a0610, #0d0608)"
          : "linear-gradient(to bottom, #0d0608, #0e0a04, #0d0608)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isEven
            ? "radial-gradient(ellipse at 60% 50%, rgba(107,31,58,0.12) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 40% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div
            className="w-8 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
          />
        </motion.div>
        <motion.blockquote
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="font-serif font-light text-cream whitespace-pre-line leading-relaxed"
          style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", lineHeight: 1.35 }}
        >
          {quote.text}
        </motion.blockquote>
        {quote.source && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 font-script text-rose/60 text-lg"
          >
            — {quote.source}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <div
            className="w-8 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
