import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen({ onComplete, config }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleTap = () => {
    setPhase(3);
    setTimeout(onComplete, 900);
  };

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, #1a0810 0%, #0d0608 70%)",
          }}
          onClick={phase === 2 ? handleTap : undefined}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(107,31,58,0.18) 0%, transparent 65%)",
            }}
          />

          <div className="relative flex flex-col items-center gap-6 px-8 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="text-4xl mb-2 select-none"
              style={{
                filter: "drop-shadow(0 0 18px rgba(196,116,138,0.7))",
                color: "#c4748a",
              }}
            >
              {/* ♡ */}
              🌸
            </motion.div>

            {phase >= 0 && (
              <motion.p
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9 }}
                className="font-serif text-lg text-cream/70"
                style={{ letterSpacing: "0.2em" }}
              >
                {config.introCaption}
              </motion.p>
            )}

            {phase >= 1 && (
              <motion.h1
                initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.0 }}
                className="font-serif text-3xl md:text-5xl text-cream font-light"
                style={{ lineHeight: 1.3 }}
              >
                {config.intro1}
                {config.intro2}
                <br />
                {config.intro3}
              </motion.h1>
            )}

            {phase >= 2 && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                onClick={handleTap}
                className="mt-8 flex items-center gap-2 text-rose/80 font-sans text-sm tracking-widest uppercase cursor-pointer border border-rose/25 px-6 py-3 rounded-full hover:border-rose/60 hover:text-rose transition-all duration-300"
                style={{ letterSpacing: "0.15em" }}
              >
                <span>{config.tapToBegin}</span>
                <span
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(196,116,138,0.6))",
                  }}
                >
                  {/* ♫ */}
                </span>
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
