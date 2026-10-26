import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Sun,
  Sparkles,
  Heart,
  Navigation,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Utensils,
  Flame,
  Music,
  Check,
  Copy,
  Maximize2,
  Eye,
  EyeOff,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/wedding';
import { Countdown } from './Countdown';
import { ScratchCard } from './ScratchCard';

// Ornate Corner Filigree Ornament
const CornerFiligree = ({ position = 'top-left' }) => {
  const classes = {
    'top-left': 'top-2.5 left-2.5',
    'top-right': 'top-2.5 right-2.5 rotate-90',
    'bottom-left': 'bottom-2.5 left-2.5 -rotate-90',
    'bottom-right': 'bottom-2.5 right-2.5 rotate-180',
  }[position];

  return (
    <div
      aria-hidden="true"
      className={`absolute ${classes} w-6 h-6 pointer-events-none z-20 text-[#ECC875] opacity-70`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12 C2 5 5 2 12 2" />
        <path d="M2 20 C2 10 10 2 20 2" strokeDasharray="1.5 2" />
        <circle cx="4" cy="4" r="1.5" fill="#ECC875" />
      </svg>
    </div>
  );
};

export const WeddingExperience = ({ onBackToDoors, onOpenEngagement }) => {
  const prefersReducedMotion = useReducedMotion();
  const { wedding, couple, engagement } = weddingData;
  const ringExchangePhotos = engagement.photos.filter((photo) => (
    photo.src.includes('ring-exchange') || photo.src.includes('ring-detail')
  )).filter((_, index) => index === 1 || index === 3);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [selectedRitualTab, setSelectedRitualTab] = useState('all');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [allDatesRevealed, setAllDatesRevealed] = useState(false);

  const toggleRevealAllDates = () => {
    const next = !allDatesRevealed;
    setAllDatesRevealed(next);
    if (next) {
      try {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ECC875', '#FFE082', '#FFD54F', '#7A1F2B', '#FFFFFF'],
        });
      } catch {
        // ignore
      }
    }
  };

  const getCeremonyTheme = (colorTheme) => {
    switch (colorTheme) {
      case 'amber':
        return {
          accentBg: 'from-[#F59E0B]/20 via-[#FBBF24]/10 to-transparent',
          badgeBg: 'bg-[#F59E0B]/15 text-[#B45309] border-[#F59E0B]/40',
          pillBg: 'from-[#B45309] to-[#F59E0B]',
          iconColor: 'text-[#D97706]',
          borderGlow: 'hover:border-[#F59E0B]',
          dotBg: 'bg-[#F59E0B]',
          accentText: 'text-[#B45309]',
        };
      case 'rose':
        return {
          accentBg: 'from-[#E11D48]/20 via-[#FB7185]/10 to-transparent',
          badgeBg: 'bg-[#E11D48]/15 text-[#9F1239] border-[#E11D48]/40',
          pillBg: 'from-[#9F1239] to-[#E11D48]',
          iconColor: 'text-[#BE185D]',
          borderGlow: 'hover:border-[#E11D48]',
          dotBg: 'bg-[#E11D48]',
          accentText: 'text-[#9F1239]',
        };
      case 'emerald':
        return {
          accentBg: 'from-[#10B981]/20 via-[#34D399]/10 to-transparent',
          badgeBg: 'bg-[#10B981]/15 text-[#047857] border-[#10B981]/40',
          pillBg: 'from-[#047857] to-[#10B981]',
          iconColor: 'text-[#059669]',
          borderGlow: 'hover:border-[#10B981]',
          dotBg: 'bg-[#10B981]',
          accentText: 'text-[#047857]',
        };
      case 'purple':
        return {
          accentBg: 'from-[#9333EA]/20 via-[#C084FC]/10 to-transparent',
          badgeBg: 'bg-[#9333EA]/15 text-[#7E22CE] border-[#9333EA]/40',
          pillBg: 'from-[#7E22CE] to-[#9333EA]',
          iconColor: 'text-[#9333EA]',
          borderGlow: 'hover:border-[#9333EA]',
          dotBg: 'bg-[#9333EA]',
          accentText: 'text-[#7E22CE]',
        };
      default:
        return {
          accentBg: 'from-[#7A1F2B]/20 via-[#991B1B]/10 to-transparent',
          badgeBg: 'bg-[#7A1F2B]/15 text-[#7A1F2B] border-[#ECC875]/70',
          pillBg: 'from-[#54111B] to-[#7A1F2B]',
          iconColor: 'text-[#ECC875]',
          borderGlow: 'hover:border-[#ECC875]',
          dotBg: 'bg-[#7A1F2B]',
          accentText: 'text-[#7A1F2B]',
        };
    }
  };

  const getCeremonyIcon = (icon) => {
    switch (icon) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#D97706]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#BE185D]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#059669]" />;
      case 'Music':
        return <Music className="w-5 h-5 text-[#9333EA]" />;
      default:
        return <Heart className="w-5 h-5 text-[#ECC875] fill-current" />;
    }
  };

  const handleShare = () => {
    const text = `🌸 You are joyfully invited to the Wedding Celebrations of ${couple.groom} & ${couple.bride} (3 - 5 December 2026)! Scratch to reveal ceremony dates & view invitation:`;
    if (navigator.share) {
      navigator.share({ title: `${couple.groom} & ${couple.bride} Wedding Invitation`, text, url: 'https://wedding-website-nu-two-23.vercel.app/' }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' https://wedding-website-nu-two-23.vercel.app/')}`, '_blank');
    }
  };

  const copyVenueAddress = () => {
    navigator.clipboard.writeText(wedding.venue);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const filteredCeremonies =
    selectedRitualTab === 'all'
      ? wedding.ceremonies
      : wedding.ceremonies.filter((c) => c.id === selectedRitualTab);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#FFF9F0] text-[#302522] py-8 sm:py-14 px-4 sm:px-6 relative overflow-x-hidden selection:bg-[#7A1F2B] selection:text-[#FFF9F0]"
    >
      {/* Background Decorative Mandala Watermark */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.035] flex items-center justify-center z-0"
      >
        <div className="w-[650px] h-[650px] rounded-full border-[20px] border-[#7A1F2B] rotate-45 scale-125" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C9A45C]/30">
          <button
            onClick={onBackToDoors}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7A1F2B] text-[#FFF9F0] border border-[#ECC875] text-xs font-display uppercase tracking-wider font-semibold hover:bg-[#54111B] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ECC875]" />
            <span className="hidden sm:inline">Royal Gateway</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/40 text-xs font-semibold hover:bg-[#25D366]/20 transition-all cursor-pointer active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden xs:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Grand Wedding Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#7A1F2B]/10 via-[#C9A45C]/20 to-[#7A1F2B]/10 border border-[#C9A45C]/50 mb-3 text-xs font-display uppercase tracking-[0.2em] text-[#7A1F2B] font-semibold shadow-inner">
            <span className="text-[#C9A45C]">✦</span>
            <span>॥ শুভ বিবাহ মহোৎসব • Bengali Wedding Invitation ॥</span>
            <span className="text-[#C9A45C]">✦</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl text-[#7A1F2B] font-bold tracking-tight">
            {couple.groom} &amp; {couple.bride}
          </h1>

          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#C9A45C]" />
            <span className="text-[#C9A45C] text-xl font-serif">❦</span>
            <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#C9A45C]" />
          </div>

          <p className="font-serif text-sm sm:text-base text-[#6B5B57] italic leading-relaxed px-4">
            "{wedding.welcomeNote}"
          </p>
        </motion.div>

        {/* Confirmed Date & Venue Highlight Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative bg-gradient-to-b from-[#30080E] via-[#54111B] to-[#25050A] text-[#FFF9F0] rounded-3xl p-6 sm:p-9 border-2 border-[#ECC875] shadow-2xl text-center mb-12 overflow-hidden gold-glow-card"
        >
          {/* Corner Filigree */}
          <CornerFiligree position="top-left" />
          <CornerFiligree position="top-right" />
          <CornerFiligree position="bottom-left" />
          <CornerFiligree position="bottom-right" />

          {/* Golden Shimmer Sweeper */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-sheen" />
          </div>

          <p className="font-display text-xs uppercase tracking-[0.3em] text-[#ECC875] font-semibold mb-2">
            ✦ Save The Auspicious Date ✦
          </p>

          {/* Animated Big Date Display */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15, delay: 0.3 }}
            className="wedding-date-scratch-shell my-3 mx-auto w-full max-w-md"
          >
            <div>
              <p className="font-heading text-lg sm:text-xl text-[#FFF9F0] mb-3">
                Every Beautiful Story Has a Special Day
              </p>
              <ScratchCard
                id="main-wedding-date"
                date={wedding.date}
                day={wedding.ceremonies.find((ceremony) => ceremony.isMainEvent)?.day || wedding.day}
                time={wedding.ceremonies.find((ceremony) => ceremony.isMainEvent)?.time || 'Wedding ceremony'}
                ceremonyName="Our Wedding Day"
                bengaliName="Our Wedding Day"
                promptTitle="Scratch to Reveal Our Wedding Date"
                promptInstruction="Scratch gently to uncover the date"
                allowRescratch={false}
                isFeatured
              />
              <span className="hidden block text-xs font-display uppercase tracking-widest text-[#F5EBDD]/90 mt-1">
                Saturday • শুভ লগ্ন ও সম্প্রদান
              </span>
            </div>
          </motion.div>

          {/* Live Countdown Component */}
          <div className="my-5">
            <Countdown />
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════════════
            CEREMONIES SECTION WITH SCRATCH-TO-REVEAL DATES & AUTHENTIC BENGALI IMAGES
            Sequence:
            1. Haldi (3 Dec | 3:00 PM)
            2. Aiburobhat (4 Dec | 1:00 PM)
            3. Mehndi (4 Dec | 5:00 PM)
            4. Sangeet (4 Dec | 6:00 PM)
            5. Marriage (5 Dec | 7:00 PM)
            ═══════════════════════════════════════════════════════════════════════════ */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#7A1F2B]/10 border border-[#C9A45C]/40 text-[11px] font-display uppercase tracking-widest text-[#7A1F2B] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Sacred Wedding Rituals &amp; Timeline</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl text-[#7A1F2B] font-bold">
              Ceremonies in Divine Sequence
            </h2>
            <p className="font-serif text-xs sm:text-sm text-[#6B5B57] italic mt-1.5 max-w-xl mx-auto">
              Scratch each ceremony card below with your mouse or finger to unveil the auspicious date and time!
            </p>

            {/* Quick Interactive Timeline Tabs & Master Reveal-All Control */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-2 rounded-2xl bg-[#FAF3E8] border border-[#C9A45C]/30">
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {[
                  { id: 'all', label: 'All 5 Ceremonies' },
                  { id: 'haldi', label: '01 Haldi' },
                  { id: 'aiburobhat', label: '02 Aiburobhat' },
                  { id: 'mehndi', label: '03 Mehndi' },
                  { id: 'sangeet', label: '04 Sangeet' },
                  { id: 'marriage', label: '05 Marriage' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedRitualTab(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-display uppercase tracking-wider transition-all cursor-pointer font-semibold ${
                      selectedRitualTab === tab.id
                        ? 'bg-[#7A1F2B] text-[#ECC875] border border-[#ECC875] shadow-sm scale-105'
                        : 'bg-white/70 text-[#6B5B57] border border-[#C9A45C]/30 hover:border-[#ECC875]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Master Reveal All Toggle */}
              <button
                onClick={toggleRevealAllDates}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#ECC875] via-[#C9A45C] to-[#B38D43] text-[#302522] text-xs font-display uppercase tracking-wider font-bold shadow-sm hover:brightness-105 transition-all cursor-pointer active:scale-95 shrink-0"
                title={allDatesRevealed ? 'Hide All Dates' : 'Reveal All Dates'}
              >
                {allDatesRevealed ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide All Dates</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Reveal All Dates</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LIST OF 5 CEREMONIES IN EXACT SEQUENCE */}
          <div className="space-y-10">
            <AnimatePresence mode="popLayout">
              {filteredCeremonies.map((ceremony, index) => {
                const theme = getCeremonyTheme(ceremony.colorTheme);
                const isMain = ceremony.isMainEvent;
                const isImageLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={ceremony.id}
                    layout
                    initial={{ opacity: 0, y: 35, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className={`relative rounded-3xl p-5 sm:p-8 border-2 transition-all duration-300 shadow-xl overflow-hidden ${
                      isMain
                        ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#F5EBDD] border-[#ECC875] ring-2 ring-[#ECC875]/50'
                        : `bg-gradient-to-b from-[#FFFDF9] to-[#FAF3E8] border-[#C9A45C]/60 ${theme.borderGlow}`
                    }`}
                  >
                    {/* Corner Ornaments */}
                    <CornerFiligree position="top-left" />
                    <CornerFiligree position="top-right" />
                    <CornerFiligree position="bottom-left" />
                    <CornerFiligree position="bottom-right" />

                    {/* Top Accent Glow Ribbon */}
                    <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${theme.accentBg}`} />

                    {/* Top Badge Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                      <div className="flex items-center gap-2">
                        {/* Sequence Number Badge */}
                        <span className="w-8 h-8 rounded-full bg-[#7A1F2B] text-[#ECC875] border border-[#ECC875] flex items-center justify-center font-heading text-xs font-bold shadow-sm">
                          {ceremony.sequenceDisplay}
                        </span>

                        <div>
                          <span className="font-serif text-sm font-bold text-[#7A1F2B]">
                            {ceremony.bengaliName}
                          </span>
                          <span className="text-[11px] text-[#6B5B57] font-display uppercase tracking-widest ml-2">
                            • {ceremony.bengaliSubtext || ceremony.name}
                          </span>
                        </div>
                      </div>

                      {/* Main Ceremony Badge */}
                      {isMain ? (
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7A1F2B] text-[#ECC875] border border-[#ECC875] text-[10px] font-display uppercase tracking-widest font-bold shadow-md">
                          <Flame className="w-3.5 h-3.5 fill-current text-amber-300 animate-pulse" />
                          <span>The Grand Vivah • মহা লগ্ন</span>
                        </div>
                      ) : (
                        <span className={`text-[10px] font-display uppercase tracking-wider px-3 py-1 rounded-full border font-semibold ${theme.badgeBg}`}>
                          {ceremony.dressCode}
                        </span>
                      )}
                    </div>

                    {/* TWO-COLUMN LUXURY LAYOUT: IMAGE ON ONE SIDE, DETAILS & SCRATCH ON OTHER */}
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-center ${isImageLeft ? '' : 'lg:flex-row-reverse'}`}>
                      {/* CEREMONY AUTHENTIC IMAGE COLUMN */}
                      <div className={`lg:col-span-5 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div
                          onClick={() => {
                            // Find photo index or view this ceremony photo
                            const pIndex = wedding.photos.findIndex((p) => p.src === ceremony.image);
                            setActivePhotoIndex(pIndex >= 0 ? pIndex : 0);
                          }}
                          className="group relative rounded-2xl overflow-hidden border-2 border-[#ECC875] shadow-lg aspect-[16/11] sm:aspect-[4/3] bg-[#30080E] cursor-pointer"
                        >
                          <img
                            src={ceremony.image}
                            alt={`${ceremony.name} celebration`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />

                          {/* Shimmer Light Sweeper on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
                            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-sheen" />
                          </div>

                          {/* Top Corner Watermark Badge */}
                          <div className="absolute top-3 left-3 z-20">
                            <span className="px-3 py-1 rounded-full bg-[#1A050B]/85 text-[#ECC875] border border-[#ECC875]/80 text-[10px] font-display uppercase tracking-widest font-semibold backdrop-blur-md shadow-sm">
                              {ceremony.sequenceDisplay} • {ceremony.name}
                            </span>
                          </div>

                          {/* Bottom Enlarge Pill */}
                          <div className="absolute bottom-3 right-3 z-20">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-white text-[10px] font-sans backdrop-blur-md border border-white/30 transition-all">
                              <Maximize2 className="w-3 h-3 text-[#ECC875]" />
                              <span>Enlarge</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* DETAILS & SCRATCH-TO-REVEAL COLUMN */}
                      <div className={`lg:col-span-7 flex flex-col justify-between ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                        {/* Ceremony Title & Icon */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-full bg-white border border-[#C9A45C]/50 flex items-center justify-center shadow-sm">
                              {getCeremonyIcon(ceremony.icon)}
                            </div>
                            <h3 className="font-heading text-2xl sm:text-3xl text-[#7A1F2B] font-bold tracking-tight">
                              {ceremony.name}
                            </h3>
                          </div>

                          <p className="font-serif text-xs sm:text-sm text-[#C9A45C] font-semibold italic">
                            "{ceremony.shloka || ceremony.tagline}"
                          </p>
                        </div>

                        {/* Description */}
                        <p className="font-serif text-xs sm:text-sm text-[#6B5B57] leading-relaxed mb-4">
                          {ceremony.description}
                        </p>

                        {/* ──────────────────────────────────────────────────────────
                            INTERACTIVE SCRATCH-TO-REVEAL CARD FOR DATE & TIME
                            ────────────────────────────────────────────────────────── */}
                        <div className="mb-4">
                          <ScratchCard
                            id={ceremony.id}
                            date={ceremony.date}
                            day={ceremony.day}
                            time={ceremony.time}
                            ceremonyName={ceremony.name}
                            bengaliName={ceremony.bengaliName}
                            colorTheme={ceremony.colorTheme}
                            isGloballyRevealed={allDatesRevealed}
                          />
                        </div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative bg-gradient-to-b from-[#FFFDF9] to-[#F5EBDD] border-2 border-[#C9A45C]/60 rounded-3xl p-6 sm:p-9 shadow-xl mb-12 text-center">
          <CornerFiligree position="top-left" />
          <CornerFiligree position="top-right" />
          <CornerFiligree position="bottom-left" />
          <CornerFiligree position="bottom-right" />

          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-b from-[#7A1F2B] to-[#4F131B] border-2 border-[#ECC875] text-[#ECC875] flex items-center justify-center mb-3 shadow-md">
            <MapPin className="w-6 h-6" />
          </div>

          <p className="font-display text-xs uppercase tracking-[0.25em] text-[#7A1F2B] font-bold mb-1">
            Confirmed Wedding Venue
          </p>
          <h3 className="font-heading text-xl sm:text-2xl text-[#302522] font-semibold mb-2">
            {wedding.venue}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={wedding.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A1F2B] text-[#FFF9F0] border border-[#ECC875] text-xs font-display uppercase tracking-widest font-semibold hover:bg-[#54111B] transition-all shadow-md active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5 text-[#ECC875]" />
              <span>Open in Google Maps</span>
            </a>

            <button
              onClick={copyVenueAddress}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#FAF3E8] text-[#7A1F2B] border border-[#C9A45C]/60 text-xs font-display uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#7A1F2B]" />
                  <span>Copy Full Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Engagement memories invitation */}
        <motion.section
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.75, ease: 'easeOut' }}
          aria-labelledby="engagement-memories-title"
          className="engagement-invite relative flex flex-col items-center gap-7 rounded-[2rem] p-5 sm:p-8 lg:p-12 mb-12 overflow-hidden"
        >
          <div className="engagement-invite-ornament" aria-hidden="true" />
          <div className="relative z-10 w-full text-center py-3">
            <p className="font-display text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#8C6935] font-semibold mb-3">
              A Chapter of Love
            </p>
            <h2 id="engagement-memories-title" className="font-heading text-3xl sm:text-4xl xl:text-5xl leading-tight text-[#54111B] font-medium">
              Welcome to Our <span className="text-[#9E7933] italic">Engagement</span> Memories
            </h2>
            <div className="engagement-divider my-5" aria-hidden="true"><span>❦</span></div>
            <p className="font-serif text-lg sm:text-xl text-[#4D3932] leading-relaxed">
              A beautiful beginning, a promise of forever, and moments we will cherish for a lifetime.
            </p>
            <p className="font-serif text-base sm:text-lg text-[#6B5B57] leading-relaxed mt-3">
              Join us in reliving the joy, laughter, and love from our engagement ceremony through these precious memories.
            </p>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, delay: prefersReducedMotion ? 0 : 0.12 }}
            className="engagement-photo-pair relative mx-auto w-full max-w-[420px]"
          >
            {ringExchangePhotos.map((photo, index) => (
              <div className="engagement-photo-frame relative m-0" key={photo.id}>
                <div className="engagement-photo-arch overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.035]"
                    loading="lazy"
                  />
                </div>
                <span className="engagement-photo-caption">
                  {index === 0 ? 'A promise, held close' : 'The ring exchange'}
                </span>
              </div>
            ))}
          </motion.div>

          <button
            type="button"
            onClick={onOpenEngagement}
            className="engagement-gallery-cta relative z-10 inline-flex items-center justify-center gap-3 rounded-full px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-display uppercase tracking-[0.12em] font-semibold"
          >
            <span>Explore Our Engagement Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.section>

        {/* Return to Royal Gateway Button */}
        <div className="text-center pt-4 border-t border-[#C9A45C]/30 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBackToDoors}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A1F2B] via-[#651520] to-[#54111B] text-[#FFF9F0] border border-[#ECC875] text-xs font-display uppercase tracking-widest font-semibold hover:brightness-110 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ECC875]" />
            <span>Return to Royal Gateway</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && wedding.photos[activePhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setActivePhotoIndex(null)}
          >
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-4 right-4 p-2 text-white bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-all"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex(
                  (activePhotoIndex - 1 + wedding.photos.length) % wedding.photos.length
                );
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-white bg-black/60 hover:bg-black/90 border border-[#ECC875]/40 rounded-full cursor-pointer transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-[#ECC875]" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((activePhotoIndex + 1) % wedding.photos.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white bg-black/60 hover:bg-black/90 border border-[#ECC875]/40 rounded-full cursor-pointer transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-[#ECC875]" />
            </button>

            <div
              className="max-w-2xl max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={wedding.photos[activePhotoIndex].src}
                alt={wedding.photos[activePhotoIndex].alt}
                className="max-h-[70vh] w-auto rounded-2xl border-2 border-[#ECC875]/60 object-contain shadow-2xl"
              />
              <p className="font-heading text-lg text-[#ECC875] mt-3">
                {wedding.photos[activePhotoIndex].title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeddingExperience;
