import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoLightbox({
  memories,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) {
  const memory = memories[currentIndex];
  const [touchStartX, setTouchStartX] = useState(null);

  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!memory) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: "rgba(10,4,6,0.95)",
          backdropFilter: "blur(20px)",
        }}
        onClick={onClose}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const d = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(d) > 50) d > 0 ? onPrev() : onNext();
          setTouchStartX(null);
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center text-cream/60 hover:text-cream transition-colors z-10"
          aria-label="Close"
        >
          ✕
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 md:left-8 w-11 h-11 rounded-full glass flex items-center justify-center text-cream/60 hover:text-cream transition-colors z-10"
          aria-label="Previous"
          style={{ fontSize: "1.5rem" }}
        >
          ‹
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 md:right-8 w-11 h-11 rounded-full glass flex items-center justify-center text-cream/60 hover:text-cream transition-colors z-10"
          aria-label="Next"
          style={{ fontSize: "1.5rem" }}
        >
          ›
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="relative flex flex-col items-center max-w-5xl w-full px-16 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={memory.image}
              alt={memory.caption}
              className="max-h-[75vh] max-w-full object-contain rounded-lg"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }}
            />
            <div className="mt-4 text-center">
              {memory.date && (
                <p
                  className="text-cream/35 font-sans text-xs tracking-widest uppercase mb-1"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {memory.date}
                </p>
              )}
              {memory.caption && (
                <p className="font-serif italic text-cream/70 text-base md:text-lg">
                  {memory.caption}
                </p>
              )}
            </div>
            <p className="mt-3 text-cream/25 font-sans text-xs">
              {currentIndex + 1} / {memories.length}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
