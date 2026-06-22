import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TwinkleSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
}

interface InteractiveSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  type: "star" | "diamond" | "circle";
  rotateSpeed: number;
}

interface GoldDust {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
}

// Highly stylized luxury vector of a celestial arabesque star medallion
const OrnateStarArabesque = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={className} style={style}>
    <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]">
      {/* Outer elegant lace and dot contour */}
      <circle cx="50" cy="50" r="44" stroke="url(#sparkleGoldGrad)" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="40" stroke="url(#sparkleGoldGrad)" strokeWidth="1.2" fill="none" />
      <circle cx="50" cy="50" r="37" stroke="url(#sparkleGoldGrad)" strokeWidth="0.6" fill="none" />
      
      {/* Eight symmetrical celestial spear arabesques */}
      <g transform="translate(50, 50)">
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 45})`}>
            {/* Royal spearhead tip */}
            <path d="M0 -40 C2 -32 2 -22 0 -18 C-2 -22 -2 -32 0 -40 Z" fill="url(#sparkleGoldGrad)" />
            {/* Elegant swirling scrolls on the sides */}
            <path d="M0 -30 C5 -26 8 -20 5 -16 C2 -12 1 -18 0 -22" stroke="url(#sparkleGoldGrad)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M0 -30 C-5 -26 -8 -20 -5 -16 C-2 -12 -1 -18 0 -22" stroke="url(#sparkleGoldGrad)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            
            {/* Secondary tiny pearls */}
            <circle cx="5" cy="-16" r="1" fill="url(#sparkleGoldGrad)" />
            <circle cx="-5" cy="-16" r="1" fill="url(#sparkleGoldGrad)" />
          </g>
        ))}
      </g>

      {/* Inner celestial star ornament */}
      <circle cx="50" cy="50" r="13" stroke="url(#sparkleGoldGrad)" strokeWidth="0.8" fill="none" />
      <circle cx="50" cy="50" r="10" stroke="url(#sparkleGoldGrad)" strokeWidth="0.5" fill="none" strokeDasharray="1 1" />
      
      {/* Master 4-pointed radiant star of Bethlehem at the core */}
      <path d="M50 28 L53.5 46.5 L72 50 L53.5 53.5 L50 72 L46.5 53.5 L28 50 L46.5 46.5 Z" fill="url(#sparkleGoldGrad)" />
      
      {/* Brilliant center diamonds */}
      <circle cx="50" cy="50" r="3" fill="#FFFFFF" className="animate-pulse" />
      <circle cx="50" cy="38" r="1" fill="#FFFFFF" />
      <circle cx="50" cy="62" r="1" fill="#FFFFFF" />
      <circle cx="38" cy="50" r="1" fill="#FFFFFF" />
      <circle cx="62" cy="50" r="1" fill="#FFFFFF" />
    </svg>
  </div>
);

// 4-pointed sparkle star SVG paths
const SparkleStar = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="url(#sparkleGoldGrad)">
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

// 8-pointed star SVG
const LuxuryStar8 = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style}>
    <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" fill="url(#sparkleGoldGrad)" />
    <path d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z" fill="#FFFBEB" opacity="0.6" />
  </svg>
);

// Gilded diamond SVG
const LuxuryDiamond = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="url(#sparkleGoldGrad)">
    <path d="M12 2 L22 12 L12 22 L2 12 Z" />
    <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
  </svg>
);

export default function ButterflyParticles() {
  const [twinkleSparkles, setTwinkleSparkles] = useState<TwinkleSparkle[]>([]);
  const [clickSparkles, setClickSparkles] = useState<InteractiveSparkle[]>([]);
  const [goldDust, setGoldDust] = useState<GoldDust[]>([]);

  useEffect(() => {
    // Generate beautiful twinkle locations
    const initialTwinkles: TwinkleSparkle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 92 + 4,
      y: Math.random() * 90 + 5,
      size: Math.random() * 12 + 10, // 10px to 22px
      delay: Math.random() * -12,
      duration: Math.random() * 4 + 4, // 4s to 8s loop
      rotation: Math.random() * 360,
      scale: Math.random() * 0.4 + 0.8,
    }));
    setTwinkleSparkles(initialTwinkles);

    // Generate beautiful falling gold dust particles (de arriba abajo)
    const initialDust: GoldDust[] = Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1.2, // 1.2px to 4.2px
      delay: Math.random() * -24, // pre-distributed vertically
      duration: Math.random() * 9 + 11, // 11s to 20s
      driftX: Math.random() * 90 - 45, // -45px to 45px wiggle
    }));
    setGoldDust(initialDust);
  }, []);

  // Listen to clicks anywhere on the page to spawn glowing explosion stars
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      // Spawn 5 glorious sparkles
      const newSparkles = Array.from({ length: 5 }).map((_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 60 + 40;
        const types: ("star" | "diamond" | "circle")[] = ["star", "diamond", "circle"];
        
        return {
          id: Date.now() + index + Math.random(),
          x,
          y,
          size: Math.random() * 9 + 13, // 13px to 22px
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 20, // drift upward a bit initially
          type: types[Math.floor(Math.random() * types.length)],
          rotateSpeed: Math.random() * 180 - 90,
        };
      });

      setClickSparkles((prev) => [...prev, ...newSparkles].slice(-40));
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Soft auto sparkles appearing dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      const rx = Math.random() * 100;
      const ry = Math.random() * 100;

      const randomSpark = Array.from({ length: 3 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: rx,
        y: ry,
        size: Math.random() * 6 + 12,
        vx: Math.random() * 40 - 20,
        vy: -Math.random() * 40 - 20,
        type: "star" as const,
        rotateSpeed: Math.random() * 100 - 50,
      }));

      setClickSparkles((prev) => [...prev, ...randomSpark].slice(-40));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Global CSS Styles for Sparkling stars & Gold Dust */}
      <style>{`
        @keyframes shineTwinkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          40%, 60% {
            transform: scale(var(--target-scale)) rotate(var(--target-rotate));
            opacity: var(--target-opacity);
            filter: drop-shadow(0 0 6px rgba(253, 211, 94, 0.8));
          }
          50% {
            transform: scale(calc(var(--target-scale) * 1.25)) rotate(calc(var(--target-rotate) + 20deg));
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(254, 243, 199, 1));
          }
        }
        .ambient-twinkle-sparkle {
          animation: shineTwinkle var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
          will-change: transform, opacity;
        }

        @keyframes goldDustFall {
          0% {
            transform: translateY(-10vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift-x)) rotate(360deg);
            opacity: 0;
          }
        }
        .gold-dust-particle {
          animation: goldDustFall var(--duration) linear infinite;
          animation-delay: var(--delay);
          will-change: transform, opacity;
        }
      `}</style>

      {/* SVG Defs for Golden Gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="sparkleGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FDE68A" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
        </defs>
      </svg>

      {/* BACKGROUND LAYER: Behind the cards (z-0) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Soft, ultra-luxurious Ornate Arabesque Star Medallions watermarked on the Celeste background */}
        <OrnateStarArabesque className="absolute top-[5%] left-[4%] md:left-[10%] w-24 h-24 md:w-36 md:h-36 opacity-[0.20] md:opacity-[0.25] rotate-[-10deg] animate-[pulse_11s_ease-in-out_infinite]" />
        <OrnateStarArabesque className="absolute top-[18%] right-[3%] md:right-[8%] w-28 h-28 md:w-40 md:h-40 opacity-[0.22] md:opacity-[0.28] rotate-[15deg] animate-[pulse_13s_ease-in-out_infinite]" />
        <OrnateStarArabesque className="absolute top-[43%] left-[2%] md:left-[5%] w-20 h-20 md:w-32 md:h-32 opacity-[0.16] md:opacity-[0.20] rotate-[-20deg] animate-[pulse_15s_ease-in-out_infinite]" />
        <OrnateStarArabesque className="absolute top-[67%] right-[3%] md:right-[9%] w-26 h-26 md:w-36 md:h-36 opacity-[0.22] md:opacity-[0.28] rotate-[25deg] animate-[pulse_10s_ease-in-out_infinite]" />
        <OrnateStarArabesque className="absolute bottom-[13%] left-[3%] md:left-[7%] w-24 h-24 md:w-34 md:h-34 opacity-[0.18] md:opacity-[0.24] rotate-[-15deg] animate-[pulse_12s_ease-in-out_infinite]" />
        <OrnateStarArabesque className="absolute bottom-[3%] right-[4%] md:right-[11%] w-30 h-30 md:w-44 md:h-44 opacity-[0.22] md:opacity-[0.30] rotate-[8deg] animate-[pulse_14s_ease-in-out_infinite]" />

        {/* Dynamic slow-falling golden dust particles of various sizes */}
        {goldDust.map((dust) => (
          <div
            key={`gold-dust-${dust.id}`}
            className="absolute rounded-full bg-gradient-to-br from-white via-amber-200 to-yellow-500 opacity-0 gold-dust-particle"
            style={
              {
                left: `${dust.left}%`,
                width: `${dust.size}px`,
                height: `${dust.size}px`,
                "--duration": `${dust.duration}s`,
                "--delay": `${dust.delay}s`,
                "--drift-x": `${dust.driftX}px`,
                boxShadow: "0 0 6px rgba(251, 191, 36, 0.75)",
              } as React.CSSProperties
            }
          />
        ))}

        {/* Dynamic twinkling ambient star sparkles */}
        {twinkleSparkles.map((sparkle) => (
          <div
            key={`twinkle-${sparkle.id}`}
            className="absolute ambient-twinkle-sparkle"
            style={
              {
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                "--duration": `${sparkle.duration}s`,
                "--delay": `${sparkle.delay}s`,
                "--target-scale": sparkle.scale,
                "--target-rotate": `${sparkle.rotation}deg`,
                "--target-opacity": Math.random() * 0.4 + 0.55, // 0.55 to 0.95 opacity
              } as React.CSSProperties
            }
          >
            {sparkle.id % 2 === 0 ? (
              <SparkleStar className="w-full h-full" />
            ) : (
              <LuxuryStar8 className="w-full h-full" />
            )}
          </div>
        ))}
      </div>

      {/* FOREGROUND LAYER: Twinkles dancing above/around user interaction (z-30) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
        <AnimatePresence>
          {clickSparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute select-none"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
              }}
              initial={{
                scale: 0.1,
                rotate: Math.random() * 360,
                opacity: 1,
              }}
              animate={{
                x: [0, s.vx * 0.4, s.vx],
                y: [0, s.vy * 0.5, s.vy + 20], // subtle gravity drop style
                scale: [0.1, 1.4, 0.4],
                rotate: [0, s.rotateSpeed * 0.5, s.rotateSpeed],
                opacity: [1, 0.95, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.5,
                ease: "easeOut",
              }}
            >
              <div 
                className="w-full h-full"
                style={{
                  filter: "drop-shadow(0px 1px 7px rgba(251, 191, 36, 0.9))"
                }}
              >
                {s.type === "star" ? (
                  <SparkleStar className="w-full h-full" />
                ) : s.type === "diamond" ? (
                  <LuxuryDiamond className="w-full h-full" />
                ) : (
                  <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-white via-yellow-200 to-amber-400" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
