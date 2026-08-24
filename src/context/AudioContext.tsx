import { createContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import musicUrl from "../assets/Link's Memories Resolve and Grief.mp3";

const audio = new Audio(musicUrl);
audio.loop = true;
audio.volume = 0.35; // default pixel game volume

audio.addEventListener('ended', () => {
  audio.currentTime = 0;
  audio.play().catch((e) => console.log("Autoplay loop blocked:", e));
});

type AudioContextType = {
  isPlaying: boolean;
  toggleMusic: () => void;
};

export const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const userInteracted = useRef(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userInteracted.current) {
        userInteracted.current = true;
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.log("Autoplay blocked:", e));
      }
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </AudioContext.Provider>
  );
}
