import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Waveform({ playing }) {
  return (
    <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="waveform-bar"
          style={{
            height: playing ? `${[60, 90, 50, 80, 40][i - 1]}%` : "30%",
            animationPlayState: playing ? "running" : "paused",
            opacity: playing ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

export default function MusicPlayer({
  config,
  audioRef,
  isPlaying,
  setIsPlaying,
}) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, audioRef]);

  // useEffect(() => {
  //   const el = audioRef.current;
  //   if (!el) return;
  //   const onTime = () => setProgress(el.currentTime);
  //   const onMeta = () => setDuration(el.duration || 0);
  //   const onEnded = () => {
  //     setIsPlaying(false);
  //     setProgress(0);
  //   };
  //   el.addEventListener("timeupdate", onTime);
  //   el.addEventListener("loadedmetadata", onMeta);
  //   el.addEventListener("ended", onEnded);
  //   return () => {
  //     el.removeEventListener("timeupdate", onTime);
  //     el.removeEventListener("loadedmetadata", onMeta);
  //     el.removeEventListener("ended", onEnded);
  //   };
  // }, [audioRef, setIsPlaying]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      });
  }, [audioRef, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, audioRef]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setProgress(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnded);
    };
  }, [audioRef, setIsPlaying]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const seek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime =
      ((e.clientX - rect.left) / rect.width) * duration;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${Math.floor(s % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.7 }}
      className="fixed bottom-5 right-5 z-40"
      style={{ maxWidth: expanded ? 280 : "auto" }}
    >
      <audio ref={audioRef} src={config.music.src} preload="metadata" autoplay loop />
      <div
        className="glass rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(201,168,76,0.2)" }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(107,31,58,0.6)", color: "var(--blush)" }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="currentColor"
              >
                <rect x="2" y="1" width="3.5" height="12" rx="1" />
                <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="currentColor"
              >
                <path d="M3 1.5L13 7 3 12.5Z" />
              </svg>
            )}
          </button>
          <div
            className="flex flex-col gap-0.5 cursor-pointer min-w-0"
            onClick={() => setExpanded((v) => !v)}
          >
            <span
              className="font-sans text-xs text-cream/80 truncate"
              style={{ maxWidth: 140 }}
            >
              {config.music.title}
            </span>
            <Waveform playing={isPlaying} />
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-cream/30 hover:text-cream/60 transition-colors text-xs"
          >
            {/* {expanded ? "▲" : "▼"} */}
          </button>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="exp"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-4 pb-3"
            >
              <div
                className="relative w-full h-1 rounded-full cursor-pointer mt-1 mb-2"
                style={{ background: "rgba(255,255,255,0.1)" }}
                onClick={seek}
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: duration ? `${(progress / duration) * 100}%` : "0%",
                    background:
                      "linear-gradient(to right, var(--wine), var(--rose))",
                  }}
                />
              </div>
              <div
                className="flex justify-between text-cream/30 font-sans mb-3"
                style={{ fontSize: "0.65rem" }}
              >
                <span>{fmt(progress)}</span>
                <span>{fmt(duration)}</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-cream/40 text-xs">♪</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 cursor-pointer"
                  style={{ accentColor: "var(--rose)" }}
                  aria-label="Volume"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
