import { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX, Sparkles } from "lucide-react";
import songUrl from "../assets/song.mp3";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(songUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.45;

    // Attempt to play immediately on mount (if browser allows)
    const playAttempt = audioRef.current.play();
    if (playAttempt !== undefined) {
      playAttempt
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch(() => {
          console.log("Autoplay blocked. Adding fallback interaction listeners to start music smoothly.");
        });
    }

    // Playback fallback on first user interaction anywhere on the document
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setShowTooltip(false);
            removeListeners();
          })
          .catch((err) => {
            console.warn("Failed to play on interaction:", err);
          });
      } else {
        removeListeners();
      }
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    // Soft alert tool-tip fade-out after 12 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      removeListeners();
      clearTimeout(timer);
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch((error) => {
          console.warn("Audio autoplay blocked or failed:", error);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Visual audio wave representation / Pulse when not playing */}
      {showTooltip && (
        <div className="bg-white/95 backdrop-blur-md text-xs font-sans font-medium text-slate-700 px-3 py-2 rounded-full border border-gold/40 shadow-xl mb-3 flex items-center gap-2 animate-bounce cursor-pointer" onClick={togglePlayback} id="music-tooltip">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
          <span>¿Querés escuchar música? Tocá acá Sparkle!</span>
        </div>
      )}

      {/* Main floating action button */}
      <button
        onClick={togglePlayback}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative overflow-hidden group ${
          isPlaying
            ? "bg-gradient-to-tr from-sky-400 to-celeste-dark text-slate-800 scale-105"
            : "bg-white border-2 border-gold text-gold hover:bg-gold-light/10"
        }`}
        title={isPlaying ? "Pausar música de fondo" : "Escuchar música de fondo"}
        id="bg-music-toggle-btn"
      >
        {/* Soft rotating gold ring around the music player */}
        <div className={`absolute inset-0 rounded-full border border-dashed border-gold/60 ${isPlaying ? "animate-spin [animation-duration:8s]" : ""}`}></div>

        {/* Music Icon */}
        <div className="relative z-10">
          {isPlaying ? (
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-4 bg-slate-800 rounded-full animate-[bounce_0.8s_infinite]"></span>
              <span className="w-1 h-3 bg-slate-800 rounded-full animate-[bounce_0.6s_infinite_delay-100ms]"></span>
              <span className="w-1 h-5 bg-slate-800 rounded-full animate-[bounce_1s_infinite_delay-200ms]"></span>
              <Volume2 className="w-4 h-4 ml-0.5" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <VolumeX className="w-4 h-4 text-gold" />
              <Music className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 text-gold" />
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
