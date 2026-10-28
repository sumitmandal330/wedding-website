import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  CheckCircle2,
  Heart,
} from 'lucide-react';
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

export const EngagementExperience = ({ onBack, backLabel = 'Wedding Invitation' }) => {
  const prefersReducedMotion = useReducedMotion();
  const { engagement, couple } = weddingData;
  const photos = (engagement.photos || []).filter((photo) => ![6, 7].includes(photo.id));

  // Active states
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

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

  const handleShare = () => {
    const text = `🌸 Cherished memories from the Engagement & Ashirwadi Celebration of ${couple.bride} & ${couple.groom} (Celebrated on ${engagement.date})! View album:`;
    if (navigator.share) {
      navigator.share({ title: 'Engagement & Ashirwadi Album', text, url: 'https://wedding-website-nu-two-23.vercel.app/' }).catch(() => {});
    } else {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' https://wedding-website-nu-two-23.vercel.app/')}`,
        '_blank'
      );
    }
  };

  const photoSections = [
    { title: 'The Rings', subtitle: 'A promise held close, and the little details that made it theirs.', ids: [6, 15, 19] },
    { title: 'Pooja', subtitle: 'Sacred rituals and the blessings that began this new chapter.', ids: [14, 2] },
    { title: 'The Ring Exchange', subtitle: 'The moment two hands, and two futures, came together.', ids: [7, 8, 17, 22] },
    { title: 'Joyful Celebrations', subtitle: 'The laughter, sweetness and spontaneous moments in between.', ids: [9, 16, 18, 21] },
    { title: 'A Mother’s Blessing', subtitle: 'A loving touch and a lifetime of prayers.', ids: [23] },
    { title: 'Family, Together', subtitle: 'Family, blessings and shared moments that felt like home.', ids: [4, 5, 10, 11, 13, 3, 12, 25] },
    { title: 'A New Beginning', subtitle: 'Side by side, hand in hand, and ready for everything ahead.', ids: [20] },
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
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7A1F2B] text-[#FFF9F0] border border-[#ECC875] text-xs font-display uppercase tracking-wider font-semibold hover:bg-[#54111B] transition-all cursor-pointer shadow-sm active:scale-95"
            title={`Return to ${backLabel}`}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ECC875]" />
            <span className="hidden sm:inline">{backLabel}</span>
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
            {couple.bride} &amp; {couple.groom}
          </h2>

          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C9A45C]" />
            <span className="text-[#C9A45C] text-lg font-serif">❦</span>
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C9A45C]" />
          </div>

          {/* Confirmed Date Badge */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : .7, delay: prefersReducedMotion ? 0 : .52, ease: [0.22, 1, 0.36, 1] }}
            className="engagement-celebrated-date"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ECC875]" />
            <span>Celebrated with love</span>
            <i aria-hidden="true">✦</i>
            <span>{engagement.date} · {engagement.day}</span>
          </motion.div>

          <p className="font-serif text-sm sm:text-base text-[#6B5B57] italic leading-relaxed px-4">
            "{engagement.message}"
          </p>
        </motion.div>
        {/* SECTIONED ENGAGEMENT ALBUM */}
        <div className="mb-14">
          <div className="text-center mb-10 sm:mb-14">
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
                    {sectionPhotos.map((photo, index) => {
                      const photoAspectRatio = photo.orientation === 'landscape' ? '3 / 2' : '2 / 3';
                      return (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.45, delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                        onClick={() => setActivePhotoIndex(photos.findIndex((item) => item.id === photo.id))}
                        style={{ aspectRatio: photoAspectRatio }}
                        className="group relative rounded-2xl overflow-hidden border border-[#C9A45C]/50 hover:border-[#C9A45C] bg-[#30080E] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]" loading="lazy" decoding="async" />
                      </motion.div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        

        {/* Personal wedding invitation from the couple */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.7 }}
          aria-labelledby="engagement-wedding-invitation-title"
          className="relative mx-auto mb-10 grid w-full max-w-4xl grid-cols-1 items-center gap-4 overflow-hidden rounded-3xl border-2 border-[#C9A45C] bg-gradient-to-br from-[#30080E] via-[#54111B] to-[#25050A] p-3 shadow-2xl sm:mb-12 sm:gap-5 sm:p-5 md:grid-cols-[0.85fr_1.15fr] lg:p-6"
        >
          <CornerFiligree position="top-left" />
          <CornerFiligree position="top-right" />
          <CornerFiligree position="bottom-left" />
          <CornerFiligree position="bottom-right" />

          <div className="relative mx-auto w-full max-w-[210px] rounded-[1.4rem] border border-[#ECC875] bg-[#ECC875] p-1.5 shadow-xl sm:max-w-[250px] lg:max-w-[310px]">
            <img
              src="/images/engagement/wedding-invitation-couple.jpeg"
              alt="Shikha and Abinash, warmly inviting you to celebrate their wedding"
              className="block aspect-[5/8] w-full rounded-[1.1rem] object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="relative z-10 px-2 py-2 text-center sm:px-4 sm:py-5">
            <p className="mb-3 font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ECC875] sm:text-xs">
              A heartfelt invitation
            </p>
            <h2 id="engagement-wedding-invitation-title" className="font-heading text-2xl font-medium text-[#FFF2D2] sm:text-3xl">
              Aapka intezaar rahega
            </h2>
            <div className="mx-auto my-3 flex max-w-[220px] items-center justify-center gap-3 text-[#ECC875]" aria-hidden="true">
              <span className="h-px flex-1 bg-[#ECC875]/50" />
              <Heart className="h-4 w-4 fill-current" />
              <span className="h-px flex-1 bg-[#ECC875]/50" />
            </div>
            <blockquote className="font-serif text-base italic leading-relaxed text-[#FFF9F0] sm:text-lg lg:text-xl">
              “Khushiyon ke is naye safar mein, aapka saath zaroor ho;
              <br className="hidden sm:block" />
              hamari shaadi mein zaroor aaiyega— aapke aashirwad se har pal khaas hoga.”
            </blockquote>
            <p className="mx-auto mt-3 max-w-xl font-serif text-sm leading-relaxed text-[#F5EBDD]/85 sm:text-base">
              Hum dono ko aapki maujoodgi aur aashirwad ka besabri se intezaar rahega.
            </p>
            <p className="mt-3 font-heading text-base text-[#ECC875] sm:text-lg">— Shikha &amp; Abinash</p>
          </div>
        </motion.section>

        {/* BOTTOM NAVIGATION CTA */}
        <div className="text-center pt-6 border-t border-[#C9A45C]/30 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A1F2B] via-[#651520] to-[#54111B] text-[#FFF9F0] border border-[#ECC875] text-xs font-display uppercase tracking-widest font-semibold hover:brightness-110 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#ECC875]" />
            <span>Return to {backLabel}</span>
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
                className="relative max-h-[65vh] sm:max-h-[72vh] flex items-center justify-center rounded-2xl overflow-hidden border-2 border-[#ECC875]/60 shadow-2xl"
              >
                <img
                  src={photos[activePhotoIndex].src}
                  alt={photos[activePhotoIndex].alt}
                  className="max-h-[65vh] sm:max-h-[72vh] w-auto max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
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
                      loading="lazy"
                      decoding="async"
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
