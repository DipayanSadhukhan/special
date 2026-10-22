import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Memories", href: "#memories" },
  { label: "Moments", href: "#moments" },
  { label: "Timeline", href: "#timeline" },
  { label: "Message", href: "#message" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(true);
  const [last, setLast] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 60 || y < last);
      setLast(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [last]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.4 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="nav"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-30"
        >
          <div
            className="glass hidden md:flex items-center gap-1 px-4 py-2.5 rounded-full"
            style={{ border: "1px solid rgba(201,168,76,0.15)" }}
          >
            {NAV.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`px-4 py-1.5 rounded-full font-sans text-xs transition-all duration-300 ${isActive ? "text-cream" : "text-cream/40 hover:text-cream/70"}`}
                  style={{
                    letterSpacing: "0.12em",
                    background: isActive
                      ? "rgba(107,31,58,0.5)"
                      : "transparent",
                    fontSize: "0.72rem",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="glass md:hidden flex items-center justify-center w-10 h-10 rounded-full text-cream/60"
            style={{ border: "1px solid rgba(201,168,76,0.15)" }}
          >
            {open ? "✕" : "≡"}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22 }}
                className="absolute top-14 right-0 glass rounded-xl overflow-hidden min-w-36 md:hidden"
                style={{ border: "1px solid rgba(201,168,76,0.15)" }}
              >
                {NAV.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="w-full text-left px-5 py-3 font-sans text-xs text-cream/70 hover:text-cream hover:bg-white/5 transition-colors"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
