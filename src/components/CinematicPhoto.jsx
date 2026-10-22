import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CinematicPhoto({ memory, caption }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  if (!memory) return null;
  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "85vh" }}
    >
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          inset: "-12% 0",
          willChange: "transform",
        }}
      >
        <img
          src={memory.image}
          alt={memory.caption}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,4,6,0.75) 0%, rgba(10,4,6,0.2) 50%, rgba(10,4,6,0.45) 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-end justify-center pb-14 px-6 text-center z-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.0 }}
          className="font-serif italic text-cream/75 max-w-xl leading-relaxed"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
        >
          {caption || memory.caption}
        </motion.p>
      </div>
    </section>
  );
}
