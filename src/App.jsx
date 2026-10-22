import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import birthdayConfig from "./data/birthdayConfig";
import memories from "./data/memories";

import IntroScreen from "./components/IntroScreen";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import MusicPlayer from "./components/MusicPlayer";
import MemoryGallery from "./components/MemoryGallery";
import QuoteSection from "./components/QuoteSection";
import MomentsSection from "./components/MomentsSection";
import CinematicPhoto from "./components/CinematicPhoto";
import CollageSection from "./components/CollageSection";
import Timeline from "./components/Timeline";
import BirthdayMessage from "./components/BirthdayMessage";
import FinalPhoto from "./components/FinalPhoto";
import Celebration from "./components/Celebration";

function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div id="cursor-glow" ref={ref} aria-hidden="true" />;
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    const el = audioRef.current;
    if (el) {
      el.volume = 0;
      el.play()
        .then(() => {
          setIsPlaying(true);
          let v = 0;
          const fade = setInterval(() => {
            v = Math.min(v + 0.04, 0.7);
            el.volume = v;
            if (v >= 0.7) clearInterval(fade);
          }, 100);
        })
        .catch(() => {});
    }
  };

  const cinematicPhotos = memories.filter(
    (m) => m.type === "cinematic" && !m.isFinal,
  );

  return (
    <>
      <CursorGlow />
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen
            key="intro"
            onComplete={handleIntroComplete}
            config={birthdayConfig}
          />
        )}
      </AnimatePresence>
      {introComplete && (
        <>
          <Navigation />
          <MusicPlayer
            config={birthdayConfig}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
          <main>
            <Hero config={birthdayConfig} />
            <MemoryGallery memories={memories} config={birthdayConfig} />
            <QuoteSection quote={birthdayConfig.quotes[0]} index={0} />
            {cinematicPhotos[0] && (
              <CinematicPhoto
                memory={cinematicPhotos[0]}
                caption=""
              />
            )}
            <MomentsSection memories={memories} config={birthdayConfig} />
            <QuoteSection quote={birthdayConfig.quotes[1]} index={1} />
            {/* <CollageSection memories={memories} /> */}
            {/* <QuoteSection quote={birthdayConfig.quotes[2]} index={2} /> */}
            <Timeline memories={memories} config={birthdayConfig} />
            {cinematicPhotos[1] && (
              <CinematicPhoto
                memory={cinematicPhotos[1]}
                caption=""
              />
            )}
            <QuoteSection quote={birthdayConfig.quotes[3]} index={3} />
            <BirthdayMessage config={birthdayConfig} />
            <FinalPhoto memories={memories} config={birthdayConfig} />
            <Celebration />
          </main>
        </>
      )}
    </>
  );
}
