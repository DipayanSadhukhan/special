import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Particle canvas ────────────────────────────────────────────────────── */
function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.4 + 0.3;
        this.vy = -(Math.random() * 0.3 + 0.07);
        this.vx = (Math.random() - 0.5) * 0.1;
        this.life = 0;
        this.maxLife = Math.random() * 220 + 100;
        this.isHeart = Math.random() < 0.04;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife || this.y < -10) this.reset();
      }
      draw() {
        const a = Math.min(
          this.life / 40,
          1 - (this.life - this.maxLife + 40) / 40,
          0.5,
        );
        ctx.globalAlpha = Math.max(0, a);
        if (this.isHeart) {
          ctx.fillStyle = "#c4748a";
          ctx.font = `${this.r * 6}px serif`;
          ctx.fillText("♡", this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(201,168,76,0.7)";
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }

    resize();
    window.addEventListener("resize", resize);
    const count = window.innerWidth < 768 ? 30 : 70;
    const particles = Array.from({ length: count }, () => {
      const p = new Particle();
      p.life = Math.random() * p.maxLife;
      return p;
    });

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
}

const fade = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease: "easeOut" },
});

/* ── Arch Photo Frame ───────────────────────────────────────────────────── */
function ArchFrame({ imageSrc, label, delay, side }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      style={{
        position: "relative",
        width: "clamp(160px, 20vw, 340px)",
        flexShrink: 0,
      }}
    >
      {/* Arch photo */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "9999px 9999px 0 0",
          overflow: "hidden",
          aspectRatio: "3/4",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              transform: side === "left" ? "scaleX(-1)" : "none",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(196,116,138,0.3)",
              fontSize: "2rem",
            }}
          >
            ♡
          </div>
        )}
        {/* Bottom smoky fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "15%",
            background:
              "linear-gradient(to top, #0d0608 0%, rgba(13,6,8,0.6) 20%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
export default function Hero({ config }) {
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  // Read the two hero photos from config, fallback to null (shows placeholder)
  const leftPhoto = config.heroPhotoLeft || null;
  const rightPhoto = config.heroPhotoRight || null;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 40%, #3a0e22 0%, #1a0610 40%, #0d0608 70%)",
      }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(107,31,58,0.22) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Particles */}
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />

      {/* ── Main layout: left arch | center copy | right arch ────────────── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-8 py-12 md:py-0">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-4 md:gap-8">
          {/* Left arch */}
          <div className="hidden lg:flex flex-shrink-0 items-end pb-0">
            <ArchFrame
              imageSrc={leftPhoto}
              label={config.heroPhotoLeftLabel || "Sokhi's portrait"}
              delay={0.5}
              side="left"
            />
          </div>

          {/* Center copy */}
          <div className="flex-1 flex flex-col items-center text-center px-2 md:px-6 pb-10 md:pb-16">
            <motion.p
              {...fade(0.2)}
              className="text-rose/60 font-sans text-xs tracking-[0.3em] uppercase mb-5"
              style={{ letterSpacing: "0.22em" }}
            >
              {config.heroEyebrow}
            </motion.p>

            <motion.p
              {...fade(0.35)}
              className="font-script text-cream/70 text-lg md:text-xl mb-3"
              style={{ letterSpacing: "0.01em" }}
            >
              {config.heroSub}
            </motion.p>

            <motion.h1
              {...fade(0.5)}
              className="font-serif font-light text-cream"
              style={{
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                lineHeight: 1.05,
                letterSpacing: "0.1em",
              }}
            >
              {config.event1}
              <br />
              {config.event2},
              <br />
              <span
                style={{
                  color: "var(--blush)",
                  filter: "drop-shadow(0 0 12px rgba(232,180,188,0.6))",
                  letterSpacing: "0em",
                }}
              >
                {config.name}
              </span>
            </motion.h1>

            {/* Divider with heart */}
            <motion.div {...fade(0.7)} className="flex items-center gap-3 my-6">
              <div
                className="w-10 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--rose))",
                }}
              />
              <span
                style={{
                  color: "var(--rose)",
                  fontSize: "0.8rem",
                  filter: "drop-shadow(0 0 6px rgba(196,116,138,0.6))",
                }}
              >
                ♡
              </span>
              <div
                className="w-10 h-px"
                style={{
                  background:
                    "linear-gradient(to left, transparent, var(--rose))",
                }}
              />
            </motion.div>

            <motion.p
              {...fade(0.85)}
              className="font-sans font-light text-cream/60 text-sm md:text-base leading-relaxed max-w-sm"
            >
              তোমার আগমন পৃথিবীটাকে বেশ সুন্দর করেছে, <br />
              এই ছোট্ট জায়গাটুকু শুধুই তোমার জন্য—কিছু ভালোবাসা, একমুঠো স্মৃতি
              আর হাজারো শুভকামনা নিয়ে…
            </motion.p>

            {/* CTA button */}
            <motion.a
              {...fade(1.0)}
              href="#memories"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#memories")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-sans text-sm cursor-pointer transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(196,116,138,0.85), rgba(232,180,188,0.75))",
                color: "#1a0610",
                fontWeight: 500,
                letterSpacing: "0.04em",
                boxShadow: "0 4px 24px rgba(196,116,138,0.3)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 6px 32px rgba(196,116,138,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              চলো গল্পের পথে
            </motion.a>

            <motion.p
              {...fade(1.15)}
              className="mt-5 font-script text-cream/30 text-sm"
            >
              শুধু তোমার জন্য
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-10 flex items-center gap-4"
            >
              <div
                className="w-12 h-px"
                style={{ background: "rgba(245,237,232,0.15)" }}
              />
              <p
                className="font-sans text-cream/20 text-xs tracking-widest"
                style={{ letterSpacing: "0.2em" }}
              >
                এগিয়ে এসো
              </p>
              <div
                className="w-16 h-px"
                style={{
                  background:
                    "linear-gradient(to right, rgba(245,237,232,0.15), rgba(245,237,232,0.05))",
                }}
              />
              <p
                className="font-sans text-cream/20 text-xs tracking-widest"
                style={{ letterSpacing: "0.2em" }}
              >
                অনেক গপ্প বাকি
              </p>
              <div
                className="w-12 h-px"
                style={{ background: "rgba(245,237,232,0.15)" }}
              />
            </motion.div>
          </div>

          {/* Right arch */}
          <div className="hidden lg:flex flex-shrink-0 items-end pb-0">
            <ArchFrame
              imageSrc={rightPhoto}
              label={config.heroPhotoRightLabel || "Another favourite photo"}
              delay={0.65}
              side="right"
            />
          </div>
        </div>
      </div>

      {/* Mobile: two small arches side by side below text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1.0 }}
        className="md:hidden flex justify-center items-end gap-3 pb-10 px-8"
      >
        <div style={{ width: "42vw", maxWidth: 150 }}>
          <ArchFrame
            imageSrc={leftPhoto}
            label="Portrait"
            delay={0}
            side="left"
            width="42vw"
          />
        </div>
        <div style={{ width: "42vw", maxWidth: 150 }}>
          <ArchFrame
            imageSrc={rightPhoto}
            label="Portrait"
            delay={0.15}
            side="right"
            width="42vw"
          />
        </div>
      </motion.div>
    </section>
  );
}
