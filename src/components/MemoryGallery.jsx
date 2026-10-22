import { useState } from "react";
import { motion } from "framer-motion";
import useInView from "../hooks/useInView";
import PhotoLightbox from "./PhotoLightbox";

function LazyImg({ src, alt, className, style }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      style={style}
      onLoad={() => setLoaded(true)}
      loading="lazy"
    />
  );
}

function PhotoCard({
  memory,
  onClick,
  size = "medium",
  rotate = 0,
  delay = 0,
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const isPolaroid = size === "small" && Math.abs(rotate) > 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, rotate: rotate * 0.5 }}
      animate={inView ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        rotate: rotate * 0.3,
        transition: { duration: 0.25 },
      }}
      className={`cursor-pointer overflow-hidden ${isPolaroid ? "polaroid" : "rounded-lg"}`}
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
      onClick={() => onClick(memory)}
      role="button"
      tabIndex={0}
      aria-label={`View: ${memory.caption}`}
      onKeyDown={(e) => e.key === "Enter" && onClick(memory)}
    >
      <div className="relative overflow-hidden">
        <LazyImg
          src={memory.image}
          alt={memory.caption}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        <div
          className="absolute inset-0 flex items-end p-3 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(10,4,6,0.8) 0%, transparent 55%)",
          }}
        >
          <p className="font-serif italic text-cream/90 md:text-sm leading-snug"
          style={{ fontSize: '0.5rem' }}>
            {memory.caption}
          </p>
        </div>
      </div>
      {isPolaroid && (
        <p className="font-script text-charcoal/70  md:text-sm text-center mt-1 px-1 leading-tight"
          style={{ fontSize: '0.5rem' }}>
          {memory.caption}
        </p>
      )}
    </motion.div>
  );
}

function LayoutA({ photos, onOpen }) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto" }}
    >
      {photos[0] && (
        <div style={{ gridColumn: "1/3" }} className="h-72 md:h-96">
          <PhotoCard
            memory={photos[0]}
            onClick={onOpen}
            size="large"
            delay={0}
          />
        </div>
      )}
      {photos[1] && (
        <div className="h-52 md:h-64">
          <PhotoCard
            memory={photos[1]}
            onClick={onOpen}
            size="small"
            rotate={-2}
            delay={0.1}
          />
        </div>
      )}
      {photos[2] && (
        <div className="h-52 md:h-64">
          <PhotoCard
            memory={photos[2]}
            onClick={onOpen}
            size="small"
            rotate={1.5}
            delay={0.15}
          />
        </div>
      )}
    </div>
  );
}

function LayoutB({ photos, onOpen }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {photos.slice(0, 3).map((m, i) => (
          <div key={m.id} className="h-44 md:h-56">
            <PhotoCard
              memory={m}
              onClick={onOpen}
              size="small"
              rotate={[-2, 1, -1][i]}
              delay={i * 0.08}
            />
          </div>
        ))}
      </div>
      {photos[3] && (
        <div className="h-64 md:h-80">
          <PhotoCard
            memory={photos[3]}
            onClick={onOpen}
            size="cinematic"
            delay={0.25}
          />
        </div>
      )}
    </div>
  );
}

function LayoutC({ photos, onOpen }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "55% 1fr" }}>
      {photos[0] && (
        <div className="h-80 md:h-[26rem] row-span-2">
          <PhotoCard
            memory={photos[0]}
            onClick={onOpen}
            size="portrait"
            rotate={-1}
            delay={0}
          />
        </div>
      )}
      {photos[1] && (
        <div className="h-36 md:h-48">
          <PhotoCard
            memory={photos[1]}
            onClick={onOpen}
            size="small"
            rotate={2}
            delay={0.1}
          />
        </div>
      )}
      {photos[2] && (
        <div className="h-36 md:h-48">
          <PhotoCard
            memory={photos[2]}
            onClick={onOpen}
            size="small"
            rotate={-1.5}
            delay={0.18}
          />
        </div>
      )}
    </div>
  );
}

function LayoutD({ photos, onOpen }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {photos[0] && (
        <div className="h-56 md:h-72">
          <PhotoCard
            memory={photos[0]}
            onClick={onOpen}
            size="medium"
            rotate={1}
            delay={0}
          />
        </div>
      )}
      {photos[1] && (
        <div className="h-56 md:h-72 mt-8">
          <PhotoCard
            memory={photos[1]}
            onClick={onOpen}
            size="medium"
            rotate={-1.5}
            delay={0.1}
          />
        </div>
      )}
    </div>
  );
}

export default function MemoryGallery({ memories, config }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const photos = memories.filter((m) => !m.collage && !m.isFinal);
  const groups = [];
  let i = 0;
  const layouts = ["A", "B", "C", "D", "A", "B", "C"];
  while (i < photos.length) {
    const size = [3, 4, 3, 2, 4, 3][groups.length % 6] || 3;
    groups.push({
      photos: photos.slice(i, i + size),
      layout: layouts[groups.length % layouts.length],
    });
    i += size;
  }

  return (
    <section
      id="memories"
      className="relative py-20 px-4 md:px-8"
      style={{
        background: "linear-gradient(to bottom, #0d0608, #120408, #0d0608)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold/50 font-sans text-xs tracking-[0.3em] uppercase mb-4"
        >
          {config.memoryIntroCaption}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-cream font-light"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          {config.memoryIntroTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-5 font-serif italic text-cream/50 text-lg whitespace-pre-line"
        >
          {config.memoryIntroBody}
        </motion.p>
      </div>
      <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
        {groups.map((g, gi) => (
          <div key={gi}>
            {g.layout === "A" && (
              <LayoutA
                photos={g.photos}
                onOpen={(m) =>
                  setLightboxIdx(photos.findIndex((x) => x.id === m.id))
                }
              />
            )}
            {g.layout === "B" && (
              <LayoutB
                photos={g.photos}
                onOpen={(m) =>
                  setLightboxIdx(photos.findIndex((x) => x.id === m.id))
                }
              />
            )}
            {g.layout === "C" && (
              <LayoutC
                photos={g.photos}
                onOpen={(m) =>
                  setLightboxIdx(photos.findIndex((x) => x.id === m.id))
                }
              />
            )}
            {g.layout === "D" && (
              <LayoutD
                photos={g.photos}
                onOpen={(m) =>
                  setLightboxIdx(photos.findIndex((x) => x.id === m.id))
                }
              />
            )}
          </div>
        ))}
      </div>
      {lightboxIdx !== null && (
        <PhotoLightbox
          memories={photos}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % photos.length)}
          onPrev={() =>
            setLightboxIdx((lightboxIdx - 1 + photos.length) % photos.length)
          }
        />
      )}
    </section>
  );
}