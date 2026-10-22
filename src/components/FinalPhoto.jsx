import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FinalPhoto({ memories, config }) {
  const finalMem =
    memories.find((m) => m.isFinal) || memories[memories.length - 1];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "90vh" }}
    >
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          inset: "-10% 0",
          willChange: "transform",
        }}
      >
        <img
          src={finalMem.image}
          // alt={config.finalCaption}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,4,6,0.9) 0%, rgba(10,4,6,0.35) 45%, rgba(10,4,6,0.55) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-20 px-6 text-center z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="font-serif italic text-cream/60 text-lg md:text-xl mb-4"
        >
          {/* {config.finalCaption} */}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="font-serif font-light text-cream"
          style={{ fontSize: "clamp(2rem,5vw,4rem)", lineHeight: 1.2 }}
        >
          শুভ জন্মদিন,{" "}
          <span style={{ color: "var(--blush)" }}>
            {config.name}
          </span>{" "}
          {/* <span
            style={{
              color: "var(--rose)",
              filter: "drop-shadow(0 0 10px rgba(196,116,138,0.6))",
            }}
          >
            ♡
          </span> */}
        </motion.h2>
      </div>
    </section>
  );
}
