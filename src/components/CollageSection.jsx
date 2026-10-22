import { useState } from "react";
import { motion } from "framer-motion";

const POSITIONS = [
  { x: -30, y: 0, rotate: -6, z: 5 },
  { x: 80, y: 30, rotate: 4, z: 4 },
  { x: -90, y: 80, rotate: -3, z: 3 },
  { x: 10, y: 100, rotate: 6, z: 2 },
  { x: 95, y: -20, rotate: -5, z: 6 },
];

function CollagePhoto({ memory, pos, index }) {
  const [dragging, setDragging] = useState(false);
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: -150, right: 150, top: -120, bottom: 120 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      initial={{
        x: pos.x,
        y: pos.y,
        rotate: pos.rotate,
        scale: 0.9,
        opacity: 0,
      }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.04, zIndex: 20 }}
      whileDrag={{ scale: 1.06, zIndex: 30 }}
      style={{
        position: "absolute",
        zIndex: dragging ? 30 : pos.z,
        cursor: dragging ? "grabbing" : "grab",
        width: "clamp(120px,22vw,180px)",
      }}
      className="polaroid select-none"
    >
      <img
        src={memory.image}
        alt={memory.caption}
        draggable={false}
        style={{
          width: "100%",
          aspectRatio: "3/4",
          objectFit: "cover",
          display: "block",
        }}
      />
      <p className="font-script text-charcoal/60 text-xs text-center mt-1 px-1 leading-snug">
        {memory.caption}
      </p>
    </motion.div>
  );
}

export default function CollageSection({ memories }) {
  const collageMems = memories.filter((m) => m.collage).slice(0, 5);
  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0d0608, #100608, #0d0608)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold/50 font-sans text-xs tracking-[0.3em] uppercase mb-4"
          >
            Collected together
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-serif text-cream font-light"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
          >
            A little collection of my favourite memories.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 font-script text-rose/50 text-lg"
          >
            Drag them around ♡
          </motion.p>
        </div>
        <div
          className="relative mx-auto"
          style={{ height: "clamp(320px,50vw,480px)", maxWidth: 560 }}
        >
          {collageMems.map((m, i) => (
            <CollagePhoto
              key={m.id}
              memory={m}
              pos={POSITIONS[i] || POSITIONS[0]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
