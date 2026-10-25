import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { weddingData } from '../data/wedding';

export const Countdown = () => {
  const prefersReducedMotion = useReducedMotion();
  const calculateTimeLeft = () => {
    try {
      const targetTime = new Date(weddingData.wedding.targetDateISO).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (isNaN(targetTime) || diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isExpired: false,
      };
    } catch {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'Days', val: timeLeft.days },
    { label: 'Hours', val: timeLeft.hours },
    { label: 'Minutes', val: timeLeft.minutes },
    { label: 'Seconds', val: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <div className="text-center mb-3">
        <p className="font-display text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#ECC875] font-semibold">
          Auspicious Countdown
        </p>
        <p className="font-serif text-xs text-[#F5EBDD]/90 italic mt-0.5">
          Until 5 December 2026
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {items.map((item) => (
          <motion.div
            key={item.label}
            className="countdown-cell bg-[#2D090F]/70 backdrop-blur-sm border border-[#ECC875]/50 rounded-2xl py-3 px-2 sm:py-4 text-center shadow-inner"
            whileHover={prefersReducedMotion ? undefined : { y: -3, borderColor: 'rgba(255,226,170,.85)' }}
          >
            <motion.div key={item.val} initial={prefersReducedMotion ? false : { y: 7, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.22 }} className="font-heading text-2xl sm:text-4xl font-bold text-[#ECC875] tracking-tight">
              {String(item.val).padStart(2, '0')}
            </motion.div>
            <div className="font-display text-[9px] sm:text-[11px] uppercase tracking-wider text-[#F5EBDD]/80 mt-1">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
