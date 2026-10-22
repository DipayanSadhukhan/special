import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function useCelebration(canvasRef, active) {
  const rafRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.parentElement.offsetWidth;
    const H = canvas.parentElement.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    const COLORS = [
      "#C9A84C",
      "#E8D5A0",
      "#C4748A",
      "#E8B4BC",
      "#F5EDE8",
      "#ffffff",
    ];
    const SHAPES = ["♡", "✦", "·", "✧", "✦"];
    class Confetto {
      constructor() {
        this.reset(true);
      }
      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H * -1 : -20;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = Math.random() * 1.5 + 0.8;
        this.alpha = Math.random() * 0.5 + 0.4;
        this.rot = Math.random() * 360;
        this.vrot = (Math.random() - 0.5) * 3;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        this.size = Math.random() * 12 + 8;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
        this.sway = Math.random() * 0.5;
        this.swayOff = Math.random() * Math.PI * 2;
      }
      update(t) {
        this.x += this.vx + Math.sin(t * 0.01 + this.swayOff) * this.sway;
        this.y += this.vy;
        this.rot += this.vrot;
        this.life++;
        if (this.y > H + 30 || this.life > this.maxLife) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha =
          this.alpha * Math.max(0, 1 - this.life / this.maxLife);
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rot * Math.PI) / 180);
        ctx.font = `${this.size}px serif`;
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.shape, 0, 0);
        ctx.restore();
      }
    }
    const count = window.innerWidth < 768 ? 60 : 140;
    const particles = Array.from({ length: count }, () => new Confetto());
    let t = 0;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      t++;
      particles.forEach((p) => {
        p.update(t);
        p.draw();
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);
}

export default function Celebration() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef(null);
  useCelebration(canvasRef, active);
  return (
    <section
      className="relative py-24 md:py-32 px-6 text-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0610 0%, #0d0608 65%)",
      }}
    >
      {active && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 max-w-xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold/40 font-sans text-xs tracking-[0.3em] uppercase mb-6"
        >
          একটু আনন্দের জন্য
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="text-6xl mb-8"
          style={{
            filter: "drop-shadow(0 0 20px rgba(196,116,138,0.6))",
            color: "var(--rose)",
          }}
          aria-hidden="true"
        >
          {/* ♡ */}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-cream/60 text-lg leading-relaxed mb-10"
        >
          ওই সমস্ত স্মৃতির জন্য যেগুলো ঘটল আর বাকিটা অপেক্ষারত... 
        </motion.p>
        {!active ? (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={() => setActive(true)}
            className="font-sans text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--wine), var(--rose))",
              color: "var(--cream)",
              boxShadow: "0 4px 24px rgba(107,31,58,0.4)",
              letterSpacing: "0.2em",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Celebrate ✦
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setActive(false)}
            className="font-sans text-xs tracking-widest text-cream/25 hover:text-cream/50 transition-colors cursor-pointer"
            style={{ letterSpacing: "0.15em" }}
          >
            ↩ Again
          </motion.button>
        )}
      </div>
    </section>
  );
}
