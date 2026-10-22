import { useState } from "react";
import { motion } from "framer-motion";
import PhotoLightbox from "./PhotoLightbox";

export default function MomentsSection({ memories, config }) {
  const moments = memories.filter((m) => m.moment);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  return (
    <section
      id="moments"
      className="relative py-20 md:py-32 px-4 md:px-8"
      style={{
        background: "linear-gradient(to bottom, #0d0608, #150a0d, #0d0608)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold/50 font-sans text-xs tracking-[0.3em] uppercase mb-4"
        >
          A collection
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-serif text-cream font-light"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}
        >
          {config.momentsTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-4 font-serif italic text-cream/45 text-base"
        >
          {config.momentsSubtitle}
        </motion.p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {moments.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
            className="flex flex-col gap-3 cursor-pointer group"
            onClick={() => setLightboxIdx(i)}
            role="button"
            tabIndex={0}
            aria-label={`Open: ${m.momentCaption}`}
            onKeyDown={(e) => e.key === "Enter" && setLightboxIdx(i)}
          >
            <div
              className="overflow-hidden rounded-lg"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={m.image}
                alt={m.momentCaption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div>
              {m.date && (
                <p
                  className="text-cream/25 font-sans text-xs tracking-widest mb-1"
                  style={{ letterSpacing: "0.15em" }}
                >
                  {m.date}
                </p>
              )}
              <p className="font-script text-cream/70 text-lg leading-snug">
                {m.momentCaption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {lightboxIdx !== null && (
        <PhotoLightbox
          memories={moments}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % moments.length)}
          onPrev={() =>
            setLightboxIdx((lightboxIdx - 1 + moments.length) % moments.length)
          }
        />
      )}
    </section>
  );
}
