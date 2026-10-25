import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingData } from '../data/wedding';

export const RoyalDoors = ({ onSelectChoice }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleDoorClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Either leaf opens the wedding rituals page after the same door animation.
    setTimeout(() => {
      onSelectChoice('wedding');
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-[#300B11] via-[#4F131B] to-[#20060B] text-[#FFF9F0] relative overflow-hidden select-none">
      {/* Decorative Palace Arch Silhouette */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15">
        <div className="w-[90vw] max-w-[850px] h-[95vh] border-4 border-[#ECC875] rounded-t-full" />
      </div>

      {/* Header Info */}
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-20 mb-4 sm:mb-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 8, letterSpacing: '0.42em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.3em' }}
          transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[11px] sm:text-xs uppercase text-[#ECC875] font-semibold mb-1"
        >
          Wedding Invitation
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-2xl sm:text-4xl text-[#FFF9F0] font-medium tracking-tight"
        >
          {weddingData.couple.bride} weds {weddingData.couple.groom}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-xs sm:text-sm text-[#F5EBDD]/85 italic mt-1"
        >
          Together with their families, they invite you to celebrate their wedding.
        </motion.p>
      </motion.div>

      {/* Grand Arch Frame & 3D Double Doors Container */}
      <div className="relative w-full max-w-xl h-[480px] sm:h-[580px] perspective-[1200px] flex items-center justify-center z-10 px-2">
        {/* Palace Arch Border Structure */}
        <div className="absolute inset-0 rounded-t-full border-4 border-[#ECC875] bg-[#1F050A] shadow-[0_0_50px_rgba(201,164,92,0.3)] overflow-hidden flex">
          {/* Bengali wedding scene revealed behind the opening doors */}
          <motion.img
            src={weddingData.couple.heroImage}
            alt=""
            aria-hidden="true"
            className="royal-marriage-reveal absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.07 }}
            animate={isOpening ? { opacity: 0.94, scale: 1 } : { opacity: 0, scale: 1.07 }}
            transition={{ duration: 2.3, ease: [0.38, 0, 0.22, 1] }}
          />
          {/* Warm inner glow behind doors */}
          <div className="absolute inset-0 bg-radial from-[#ECC875]/40 via-[#7A1F2B]/60 to-[#20060B] flex flex-col items-center justify-center text-center p-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isOpening ? { scale: 1.1, opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.38, 0, 0.22, 1] }}
            >
              <Sparkles className="w-12 h-12 text-[#ECC875] mx-auto mb-2 animate-spin" />
              <p className="font-heading text-3xl font-bold text-[#FFF9F0]">
                Wedding Ceremony
              </p>
            </motion.div>
          </div>
          <motion.div
            className="royal-door-white-light absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isOpening
              ? { opacity: [0, 0.82, 0.42], scale: [0.7, 1.05, 1.42] }
              : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 2.5, ease: [0.38, 0, 0.22, 1] }}
            aria-hidden="true"
          />

          {/* LEFT DOOR: GROOM */}
          <motion.div
            initial={false}
            animate={
              isOpening
                ? { rotateY: -115, x: '-5%', opacity: 0.3 }
                : { rotateY: 0, x: '0%', opacity: 1 }
            }
            transition={{ duration: 2.5, ease: [0.38, 0, 0.22, 1] }}
            style={{ transformOrigin: 'left center' }}
            onClick={handleDoorClick}
            className={`relative w-1/2 h-full bg-gradient-to-r from-[#54111B] via-[#651520] to-[#7A1F2B] border-r-2 border-[#ECC875] shadow-2xl flex flex-col justify-between p-4 sm:p-6 cursor-pointer transition-all group ${
              isOpening ? 'pointer-events-none' : 'hover:brightness-110'
            }`}
          >
            {/* Ornate Gold Woodwork Panels */}
            <div className="absolute inset-3 sm:inset-4 border-2 border-[#C9A45C]/70 rounded-tl-full flex flex-col justify-between p-3 pointer-events-none">
              {/* Top Arch Motif */}
              <div className="text-center">
                <span className="text-[#ECC875] text-xs">✦</span>
              </div>

              {/* Central Jaali Pattern */}
              <div className="my-auto text-center opacity-85">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border-2 border-[#ECC875] flex items-center justify-center bg-[#4F131B]/80 group-hover:scale-105 transition-transform shadow-inner">
                  {/* Engagement Ring Motif */}
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#ECC875]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="14" r="7" />
                    <path d="M12 7 L14 4 L10 4 Z" fill="#ECC875" />
                    <circle cx="12" cy="3" r="1.5" fill="#FFF9F0" />
                  </svg>
                </div>
                <span className="mt-3 block font-display text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#ECC875] font-semibold">Groom</span>
                <h3 className="mt-1 font-heading text-base sm:text-xl font-bold text-[#FFF9F0] group-hover:text-[#ECC875] transition-colors leading-tight">
                  {weddingData.couple.groom}
                </h3>
              </div>

              {/* Bottom Studs */}
              <div className="flex justify-around text-[#ECC875] text-[10px]">
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>
            </div>

            {/* Antique Left Handle */}
            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-16 rounded-l-full bg-gradient-to-r from-[#C9A45C] to-[#ECC875] shadow-md border border-[#9E7933] flex items-center justify-center">
              <div className="w-1.5 h-6 bg-[#7A1F2B] rounded-full" />
            </div>
          </motion.div>

          {/* RIGHT DOOR: WEDDING */}
          <motion.div
            initial={false}
            animate={
              isOpening
                ? { rotateY: 115, x: '5%', opacity: 0.3 }
                : { rotateY: 0, x: '0%', opacity: 1 }
            }
            transition={{ duration: 2.5, ease: [0.38, 0, 0.22, 1] }}
            style={{ transformOrigin: 'right center' }}
            onClick={handleDoorClick}
            className={`relative w-1/2 h-full bg-gradient-to-l from-[#54111B] via-[#651520] to-[#7A1F2B] border-l-2 border-[#ECC875] shadow-2xl flex flex-col justify-between p-4 sm:p-6 cursor-pointer transition-all group ${
              isOpening ? 'pointer-events-none' : 'hover:brightness-110'
            }`}
          >
            {/* Ornate Gold Woodwork Panels */}
            <div className="absolute inset-3 sm:inset-4 border-2 border-[#C9A45C]/70 rounded-tr-full flex flex-col justify-between p-3 pointer-events-none">
              {/* Top Arch Motif */}
              <div className="text-center">
                <span className="text-[#ECC875] text-xs">✦</span>
              </div>

              {/* Central Jaali Pattern */}
              <div className="my-auto text-center opacity-85">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border-2 border-[#ECC875] flex items-center justify-center bg-[#4F131B]/80 group-hover:scale-105 transition-transform shadow-inner">
                  {/* Sacred Vivah / Mandap Knot Motif */}
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#ECC875] fill-current" />
                </div>
                <span className="mt-3 block font-display text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#ECC875] font-semibold">Bride</span>
                <h3 className="mt-1 font-heading text-base sm:text-xl font-bold text-[#FFF9F0] group-hover:text-[#ECC875] transition-colors leading-tight">
                  {weddingData.couple.bride}
                </h3>
              </div>

              {/* Bottom Studs */}
              <div className="flex justify-around text-[#ECC875] text-[10px]">
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>
            </div>

            {/* Antique Right Handle */}
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-16 rounded-r-full bg-gradient-to-l from-[#C9A45C] to-[#ECC875] shadow-md border border-[#9E7933] flex items-center justify-center">
              <div className="w-1.5 h-6 bg-[#7A1F2B] rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoyalDoors;
