import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Maximize2,
  Camera,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/wedding';

// Ornate Indian Corner Filigree for Royal Photo Frames
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
      className={`absolute ${classes} w-6 h-6 pointer-events-none z-20 text-[#ECC875] opacity-80`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12 C2 5 5 2 12 2" />
        <path d="M2 20 C2 10 10 2 20 2" strokeDasharray="1.5 2" />
        <circle cx="4" cy="4" r="1.5" fill="#ECC875" />
      </svg>
    </div>
  );
};

export const EngagementExperience = ({ onBackToWedding }) => {
  const { engagement, couple, wedding } = weddingData;
  const photos = engagement.photos || [];

  // Active states
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [likes, setLikes] = useState({ 1: 52, 2: 68, 3: 84, 4: 76, 5: 63, 6: 45, 7: 59 });
  const [likedMap, setLikedMap] = useState({});

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % photos.length);
      } else if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, photos.length]);

  // Confetti / Rose Petal Shower celebration
  const triggerCelebration = (e) => {
    if (e) e.stopPropagation();
    try {
      confetti({
        particleCount: 55,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#ECC875', '#C9A45C', '#E57373', '#7A1F2B', '#FFE082', '#FFFFFF'],
      });
    } catch {
      // ignore
    }
  };

  // Heart like interaction with celebratory floaters
  const handleLike = (e, photoId) => {
    e.stopPropagation();
    const isLiked = likedMap[photoId];

    setLikes((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + (isLiked ? -1 : 1),
    }));

    setLikedMap((prev) => ({
      ...prev,
      [photoId]: !isLiked,
    }));

    if (!isLiked) {
      triggerCelebration();
    }
  };

  const handleShare = () => {
    const text = `🌸 Cherished memories from the Engagement & Ashirwadi Celebration of ${couple.groom} & ${couple.bride} (Celebrated on ${engagement.date})! View album:`;
    if (navigator.share) {
      navigator.share({ title: 'Engagement & Ashirwadi Album', text, url: window.location.href }).catch(() => {});
    } else {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + window.location.href)}`,
        '_blank'
      );
    }
  };

  const photoSections = [
    { title: 'The Rings', subtitle: 'A promise held close, and the little details that made it theirs.', ids: [6, 15, 19] },
    { title: 'Ashirwad & Pooja', subtitle: 'Sacred rituals and the blessings that began this new chapter.', ids: [2, 14] },
    { title: 'The Ring Exchange', subtitle: 'The moment two hands, and two futures, came together.', ids: [7, 8, 17] },
    { title: 'Family, Together', subtitle: 'The people who made the celebration feel like home.', ids: [4, 5, 10, 11, 13, 20] },
    { title: "Elders’ Ashirwad", subtitle: 'The warmth, wisdom and blessings of the generations before them.', ids: [3, 12] },
    { title: 'Joyful Celebrations', subtitle: 'The laughter, sweetness and spontaneous moments in between.', ids: [1, 9, 16, 18, 21] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#FFF9F0] text-[#302522] py-8 sm:py-14 px-4 sm:px-6 relative overflow-x-hidden selection:bg-[#7A1F2B] selection:text-[#FFF9F0]"
    >
      {/* Background Decorative Mandala Watermark */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.035] flex items-center justify-center z-0"
      >
        <div className="w-[600px] h-[600px] rounded-full border-[18px] border-[#7A1F2B] rotate-45 scale-125" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* TOP BAR: Return and share controls */}
        <div className="flex items-center justify-between gap-2 mb-8 pb-4 border-b border-[#C9A45C]/30">
          <button
            onClick={onBackToWedding}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7A1F2B] text-[#FFF9F0] border border-[#ECC875] text-xs font-display uppercase tracking-wider font-semibold hover:bg-[#54111B] transition-all cursor-pointer shadow-sm active:scale-95"
            title="Return to Wedding Invitation"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ECC875]" />
            <span className="hidden sm:inline">Wedding Invitation</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Share Invitation */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/40 text-xs font-semibold hover:bg-[#25D366]/20 transition-all cursor-pointer shadow-sm active:scale-95"
              title="Share with family & friends"
            >
              <Share2 className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden xs:inline">Share</span>
            </button>
          </div>
        </div>

        {/* ROYAL INVOCATION & GRAND HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          {/* Auspicious Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#7A1F2B]/10 via-[#C9A45C]/20 to-[#7A1F2B]/10 border border-[#C9A45C]/50 mb-3 text-xs font-display uppercase tracking-[0.2em] text-[#7A1F2B] font-semibold shadow-inner">
            <span className="text-[#C9A45C]">✦</span>
            <span>॥ {engagement.hindiCeremonyName} ॥</span>
            <span className="text-[#C9A45C]">✦</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl text-[#7A1F2B] font-bold tracking-tight">
            The Engagement &amp; Ashirwadi of
          </h1>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl text-gold-gradient font-bold tracking-tight mt-1">
            {couple.groom} &amp; {couple.bride}
          </h2>

          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C9A45C]" />
            <span className="text-[#C9A45C] text-lg font-serif">❦</span>
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C9A45C]" />
          </div>

          {/* Confirmed Date Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A1F2B] text-[#FFF9F0] border border-[#ECC875] text-xs font-display uppercase tracking-widest font-semibold shadow-md mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ECC875]" />
            <span>Celebrated on {engagement.date} (Saturday)</span>
          </div>

          <p className="font-serif text-sm sm:text-base text-[#6B5B57] italic leading-relaxed px-4">
            "{engagement.message}"
          </p>
        </motion.div>
        {/* SECTIONED ENGAGEMENT ALBUM */}
        <div className="mb-14">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7A1F2B]/10 border border-[#C9A45C]/30 text-[11px] font-display uppercase tracking-widest text-[#7A1F2B] font-semibold mb-2">
              <Camera className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Memories of Forever &bull; 7 March 2026</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl text-[#7A1F2B] font-bold">Engagement &amp; Ashirwadi Album</h2>
            <p className="font-serif text-xs sm:text-sm text-[#6B5B57] italic mt-2">A celebration told in chapters. Tap any photograph to view it up close.</p>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {photoSections.map((section, sectionIndex) => {
              const sectionPhotos = section.ids.map((id) => photos.find((photo) => photo.id === id)).filter(Boolean);
              if (!sectionPhotos.length) return null;
              return (
                <section key={section.title} aria-labelledby={`engagement-section-${sectionIndex}`}>
                  <div className="flex items-center gap-4 mb-5 sm:mb-7">
                    <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A45C]/60" />
                    <div className="text-center shrink-0">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#A27B36] font-semibold">Chapter {String(sectionIndex + 1).padStart(2, '0')}</p>
                      <h3 id={`engagement-section-${sectionIndex}`} className="font-heading text-2xl sm:text-3xl text-[#7A1F2B] font-bold mt-1">{section.title}</h3>
                      <p className="font-serif text-xs sm:text-sm text-[#6B5B57] italic mt-1">{section.subtitle}</p>
                    </div>
                    <span className="hidden sm:block h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A45C]/60" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {sectionPhotos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.45, delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                        onClick={() => setActivePhotoIndex(photos.findIndex((item) => item.id === photo.id))}
                        className="group relative aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-[#C9A45C]/50 hover:border-[#C9A45C] bg-[#30080E] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        <CornerFiligree position="top-left" />
                        <CornerFiligree position="top-right" />
                        <CornerFiligree position="bottom-left" />
                        <CornerFiligree position="bottom-right" />
                        <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
                          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-sheen" />
                        </div>
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1 rounded-full bg-[#1A050B]/80 text-[#ECC875] border border-[#ECC875]/70 text-[10px] font-display uppercase tracking-widest font-semibold backdrop-blur-md shadow-sm">{photo.tag}</span>
                        </div>
                        <div className="absolute top-4 right-4 z-20">
                          <button onClick={(e) => handleLike(e, photo.id)} className={`p-2 rounded-full backdrop-blur-md border transition-transform active:scale-75 shadow-sm ${likedMap[photo.id] ? 'bg-[#7A1F2B]/90 border-[#ECC875] text-[#ECC875]' : 'bg-black/40 hover:bg-black/60 border-white/30 text-white'}`} title="Send love and blessings" aria-label={`Send love and blessings for ${photo.title}`} aria-pressed={!!likedMap[photo.id]}>
                            <Heart className={`w-3.5 h-3.5 ${likedMap[photo.id] ? 'fill-[#ECC875] text-[#ECC875]' : ''}`} />
                          </button>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 bg-gradient-to-t from-[#140207] via-[#1A050B]/85 to-transparent flex flex-col justify-end">
                          <p className="font-heading text-base sm:text-lg font-bold text-[#FFF9F0] group-hover:text-[#ECC875] transition-colors">{photo.title}</p>
                          <p className="font-serif text-xs text-[#F5EBDD]/80 italic line-clamp-1 mt-0.5">{photo.subtitle || photo.quote}</p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#C9A45C]/30 text-[11px] text-[#ECC875]">
                            <span className="inline-flex items-center gap-1 font-display tracking-wider"><Maximize2 className="w-3 h-3" /><span>Tap to enlarge</span></span>
                            <span className="text-white/70 font-sans">&#9829; {likes[photo.id] || 45} blessings</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════════
            ROYAL COMMEMORATIVE PATRIKA / SMRITI PATRIKA (7 MARCH 2026)
            ═══════════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F5EBDD] border-2 border-[#C9A45C]/70 p-6 sm:p-9 shadow-xl mb-12 text-center overflow-hidden"
        >
          {/* Subtle Corner Filigree */}
          <CornerFiligree position="top-left" />
          <CornerFiligree position="top-right" />
          <CornerFiligree position="bottom-left" />
          <CornerFiligree position="bottom-right" />

          {/* Golden Royal Crest Icon */}
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-b from-[#7A1F2B] to-[#4F131B] border-2 border-[#ECC875] flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-[#ECC875]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="9" cy="12" r="5" />
              <circle cx="15" cy="12" r="5" />
              <path d="M12 7 L12 5" strokeLinecap="round" />
            </svg>
          </div>

          <p className="font-display text-xs uppercase tracking-[0.25em] text-[#7A1F2B] font-bold mb-1">
            शुभ सगाई एवं आशीर्वाद स्मृति पत्र
          </p>
          <h3 className="font-heading text-2xl sm:text-3xl text-[#302522] font-semibold mb-2">
            Engagement &amp; Ashirwadi Memorial
          </h3>

          <div className="space-y-3 py-4 border-y border-[#C9A45C]/30 text-xs sm:text-sm text-[#302522] my-4">
            <div className="flex items-center justify-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#7A1F2B]" />
              <span className="font-bold text-[#7A1F2B] text-base">
                7 March 2026 (शनिवार • Saturday)
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Clock className="w-4 h-4 text-[#7A1F2B]" />
              <span className="font-medium text-[#4A3B37]">
                Auspicious Shubh Muhurat • सानंद संपन्न
              </span>
            </div>
            <div className="flex items-start justify-center gap-2.5 max-w-md mx-auto">
              <MapPin className="w-4 h-4 text-[#7A1F2B] shrink-0 mt-0.5" />
              <span className="font-medium text-[#4A3B37] text-center">
                {engagement.venue}
              </span>
            </div>
          </div>

          {/* Shloka & Blessing note */}
          <p className="font-serif text-xs sm:text-sm text-[#6B5B57] italic leading-relaxed px-4 mb-4">
            "ईश्वर की असीम अनुकम्पा और पूज्य गुरुजनों व बुजुर्गों के शुभाशीर्वाद से सगाई एवं आशीर्वाद समारोह हर्षोल्लास के साथ संपन्न हुआ।"
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <a
              href={wedding.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF3E8] text-[#7A1F2B] border border-[#C9A45C]/60 text-xs font-display uppercase tracking-wider font-semibold transition-all shadow-sm active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5 text-[#7A1F2B]" />
              <span>View Venue on Maps</span>
            </a>
          </div>
        </motion.div>

        {/* BOTTOM NAVIGATION CTA */}
        <div className="text-center pt-6 border-t border-[#C9A45C]/30 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBackToWedding}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A1F2B] via-[#651520] to-[#54111B] text-[#FFF9F0] border border-[#ECC875] text-xs font-display uppercase tracking-widest font-semibold hover:brightness-110 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#ECC875]" />
            <span>Return to Wedding Invitation</span>
          </button>
        </div>
      </div>

      {/* THEATER-GRADE FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhotoIndex !== null && photos[activePhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 backdrop-blur-xl p-3 sm:p-6"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Bar inside Lightbox */}
            <div
              className="w-full max-w-5xl flex items-center justify-between z-20 pb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#ECC875]/20 border border-[#ECC875]/60 text-xs font-display text-[#ECC875] tracking-widest uppercase font-semibold">
                  {photos[activePhotoIndex].tag}
                </span>
                <span className="text-xs text-white/70 font-sans tracking-wider">
                  0{activePhotoIndex + 1} / 0{photos.length} • 7 March 2026
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Central Stage: Left Button, High-Res Image, Right Button */}
            <div
              className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(
                    (activePhotoIndex - 1 + photos.length) % photos.length
                  );
                }}
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 text-white bg-black/60 hover:bg-black/90 border border-[#ECC875]/50 rounded-full transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6 text-[#ECC875]" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
                }}
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 text-white bg-black/60 hover:bg-black/90 border border-[#ECC875]/50 rounded-full transition-all hover:scale-110 cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6 text-[#ECC875]" />
              </button>

              <motion.div
                key={activePhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-h-[65vh] sm:max-h-[72vh] flex items-center justify-center rounded-2xl overflow-hidden border-2 border-[#ECC875]/60 shadow-2xl"
              >
                <img
                  src={photos[activePhotoIndex].src}
                  alt={photos[activePhotoIndex].alt}
                  className="max-h-[65vh] sm:max-h-[72vh] w-auto max-w-full object-contain"
                />
              </motion.div>
            </div>

            {/* Bottom Caption & Interactive Filmstrip Ribbon */}
            <div
              className="w-full max-w-3xl flex flex-col items-center text-center z-20 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="font-heading text-lg sm:text-2xl text-[#ECC875] font-semibold">
                {photos[activePhotoIndex].title}
              </h4>
              <p className="font-serif text-xs sm:text-sm text-white/80 italic max-w-xl mt-0.5">
                "{photos[activePhotoIndex].caption}"
              </p>

              {/* Filmstrip Thumbnail Strip */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 overflow-x-auto max-w-full py-1">
                {photos.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      idx === activePhotoIndex
                        ? 'border-[#ECC875] scale-110 shadow-lg ring-2 ring-[#ECC875]/50'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={p.src}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EngagementExperience;
