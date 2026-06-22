import { useState, useEffect } from "react";
import { CountdownTime } from "../types";

interface CountdownProps {
  targetDate: string; // ISO string e.g., '2026-11-14T21:00:00'
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setIsCompleted(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (isCompleted) {
    return (
      <div className="text-center py-6 animate-pulse">
        <h3 className="font-serif text-3xl text-gold-dark font-semibold tracking-widest uppercase">
          ¡Llegó el gran día!
        </h3>
        <p className="font-sans text-sm text-gray-500 mt-2">
          Te esperamos para celebrar este momento tan mágico.
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 max-w-xl mx-auto py-4">
      {timeUnits.map((unit, idx) => (
        <div key={idx} className="flex flex-col items-center">
          {/* Outer circle with gradient border representing the requested luxury style */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex justify-center items-center bg-white shadow-md border border-celeste-dark/50 hover:border-gold/60 transition-colors duration-300">
            {/* Soft inner gold ring */}
            <div className="absolute inset-1 rounded-full border border-dashed border-gold/30"></div>
            
            {/* Number */}
            <span className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-slate-800 tracking-tight">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          
          {/* Label */}
          <span className="font-sans text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-medium mt-2">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
