import { motion } from "framer-motion";

function TimelineItem({ item, index, memory }) {
  const isLeft = index % 2 === 0;
  return (
    <div
      className={`flex items-start gap-0 flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} pl-10 md:pl-0`}
      >
        <div
          className="glass rounded-xl overflow-hidden inline-block"
          style={{ maxWidth: 360, boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
        >
          {memory && (
            <div className="h-40 overflow-hidden">
              <img
                src={memory.image}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-5">
            <p
              className="font-serif font-light mb-1"
              style={{ color: "var(--gold)", fontSize: "1.5rem" }}
            >
              {item.year}
            </p>
            <p className="font-serif italic text-cream/70 text-base leading-relaxed">
              {item.label}
            </p>
          </div>
        </div>
      </motion.div>
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-4 h-4 rounded-full border-2 z-10"
          style={{
            background: "var(--wine)",
            borderColor: "var(--rose)",
            boxShadow: "0 0 12px rgba(196,116,138,0.5)",
          }}
        />
      </div>
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default function Timeline({ memories, config }) {
  return (
    <section
      id="timeline"
      className="relative py-20 md:py-32 px-4 md:px-8"
      style={{
        background: "linear-gradient(to bottom, #0d0608, #130609, #0d0608)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold/50 font-sans text-xs tracking-[0.3em] uppercase mb-4"
        >
          আমাদের পরিচয়
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-serif text-cream font-light"
          style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)" }}
        >
          {config.timelineTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 font-serif italic text-cream/45 text-base"
        >
          {config.timelineSubtitle}
        </motion.p>
      </div>
      <div className="max-w-4xl mx-auto relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line" />
        <div className="md:hidden absolute left-3 top-0 bottom-0 w-px timeline-line" />
        <div className="flex flex-col gap-12 md:gap-16">
          {config.timelineItems.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              memory={memories.find((m) => m.id === item.photoId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
