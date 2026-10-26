import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bell, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

// Reusable Authentic Brass Temple Diya with Soft Ambient Flame
const AmbientDiya = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col items-center pointer-events-none select-none z-10 ${className}`}
    >
      {/* Subtle Flickering Diya Flame */}
      <div className="relative flex flex-col items-center mb-0.5">
        {/* Soft Golden Ambient Aura */}
        <div className="absolute -top-3 w-8 h-10 bg-amber-300/25 rounded-full blur-md animate-pulse pointer-events-none" />

        {/* Flame Body */}
        <div className="relative w-3.5 h-6 animate-flame">
          <div
            className="w-full h-full bg-gradient-to-t from-[#E65100] via-[#FF9800] to-[#FFD54F]"
            style={{ borderRadius: '50% 50% 20% 20% / 80% 80% 20% 20%' }}
          />
          <div
            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-3.5 bg-gradient-to-t from-[#FFE082] via-[#FFF9C4] to-[#FFFFFF]"
            style={{ borderRadius: '50% 50% 30% 30% / 80% 80% 20% 20%' }}
          />
        </div>

        {/* Cotton Wick (Baati) */}
        <div className="w-0.5 h-1 bg-[#422006] rounded-t-sm" />
      </div>

      {/* Brass Diya Bowl (Peetal Diya) */}
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-3 bg-gradient-to-r from-[#8C6D23] via-[#ECC875] to-[#8C6D23] rounded-full border-t border-[#FFF2C2]/60 shadow-sm flex items-center justify-center">
          <div className="w-7 h-1 bg-[#594311] rounded-full opacity-60" />
        </div>
        <div className="w-5 h-1.5 bg-gradient-to-r from-[#6B5319] via-[#C9A45C] to-[#6B5319] rounded-b-sm" />
        <div className="w-8 h-1 bg-gradient-to-r from-[#594311] via-[#ECC875] to-[#594311] rounded-full shadow-md" />
      </div>

      {/* Subtle Rose & Jasmine Petal Base */}
      <div className="flex gap-0.5 -mt-0.5 opacity-70">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E57373]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD54F]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#E57373]" />
      </div>
    </div>
  );
};

// Reusable Auspicious Sacred Laddu (Motichoor Prasad with Vark, Pista & Paan Leaf)
const GoldenLaddu = () => {
  return (
    <div className="relative flex items-center justify-center my-0.5 pointer-events-none select-none">
      {/* Soft Golden Aura Glow behind the Laddu */}
      <div className="absolute w-12 h-12 rounded-full bg-amber-400/25 blur-md animate-pulse pointer-events-none" />

      <svg
        width="42"
        height="42"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md select-none"
      >
        <defs>
          {/* Motichoor Saffron Laddu Body Gradient */}
          <radialGradient id="ladduGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="25%" stopColor="#FBC02D" />
            <stop offset="55%" stopColor="#F57F17" />
            <stop offset="85%" stopColor="#E65100" />
            <stop offset="100%" stopColor="#BF360C" />
          </radialGradient>
          {/* Silver/Gold Vark Foil Gradient */}
          <linearGradient id="varkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E0E0E0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>
          {/* Paan Leaf Gradient */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81C784" />
            <stop offset="50%" stopColor="#388E3C" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>
          {/* Brass Katori / Plate Gradient */}
          <linearGradient id="katoriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E1" />
            <stop offset="35%" stopColor="#ECC875" />
            <stop offset="75%" stopColor="#B38D43" />
            <stop offset="100%" stopColor="#6D4C13" />
          </linearGradient>
        </defs>

        {/* Auspicious Green Paan Leaf Underlay */}
        <path
          d="M24 43 C14 43 10 35 14 30 C18 25 24 29 24 43 Z"
          fill="url(#leafGrad)"
          opacity="0.9"
        />
        <path
          d="M24 43 C34 43 38 35 34 30 C30 25 24 29 24 43 Z"
          fill="url(#leafGrad)"
          opacity="0.9"
        />

        {/* Ornate Golden Brass Plate / Pedestal */}
        <ellipse cx="24" cy="38" rx="17" ry="4.5" fill="url(#katoriGrad)" stroke="#ECC875" strokeWidth="0.8" />
        <ellipse cx="24" cy="37.5" rx="14" ry="3" fill="#5C3D10" opacity="0.45" />

        {/* Shadow under Laddu */}
        <ellipse cx="24" cy="36" rx="10" ry="3" fill="#422006" opacity="0.35" />

        {/* Round Motichoor Laddu Body */}
        <circle cx="24" cy="24" r="12" fill="url(#ladduGrad)" />

        {/* Motichoor Boondi Pearls Texture Details */}
        <circle cx="21" cy="18" r="1.3" fill="#FFF59D" opacity="0.9" />
        <circle cx="26" cy="19" r="1.3" fill="#FFE082" opacity="0.85" />
        <circle cx="18" cy="22" r="1.3" fill="#FFF176" opacity="0.85" />
        <circle cx="23" cy="23" r="1.5" fill="#FFF9C4" opacity="0.95" />
        <circle cx="28" cy="24" r="1.3" fill="#FFD54F" opacity="0.8" />
        <circle cx="17" cy="27" r="1.2" fill="#FFB74D" opacity="0.75" />
        <circle cx="21" cy="28" r="1.4" fill="#FFE082" opacity="0.85" />
        <circle cx="26" cy="28" r="1.5" fill="#FFA726" opacity="0.9" />
        <circle cx="30" cy="26" r="1.2" fill="#FF9800" opacity="0.8" />
        <circle cx="24" cy="32" r="1.3" fill="#F57C00" opacity="0.85" />
        <circle cx="20" cy="32" r="1.2" fill="#E65100" opacity="0.75" />
        <circle cx="28" cy="32" r="1.2" fill="#E65100" opacity="0.75" />

        {/* Shimmering Silver / Gold Vark Foil Flecks */}
        <polygon points="20,16 23,15 22,18 19,17" fill="url(#varkGrad)" />
        <polygon points="24,20 27,19 26,22 23,21" fill="url(#varkGrad)" />
        <polygon points="17,23 19,22 18,25 16,24" fill="url(#varkGrad)" />

        {/* Pista (Pistachio) & Kesar (Saffron) Garnish on top */}
        <ellipse cx="24" cy="13.2" rx="1.8" ry="1.1" fill="#43A047" transform="rotate(-15 24 13.2)" />
        <ellipse cx="23.5" cy="13" rx="0.9" ry="0.5" fill="#A5D6A7" transform="rotate(-15 23.5 13)" />
        <path d="M25 12.8 C26 12 27 12.5 27.5 13.8" stroke="#D84315" strokeWidth="0.8" strokeLinecap="round" />

        {/* Auspicious Divine Sparkle */}
        <path d="M29 10.5 L30 8 L31 10.5 L33.5 11.5 L31 12.5 L30 15 L29 12.5 L26.5 11.5 Z" fill="#FFF9C4" opacity="0.95" />
      </svg>
    </div>
  );
};

export const WelcomeScreen = ({ onEnter }) => {
  // Blessing lifecycle states:
  // 'idle'      -> Awaiting guest interaction; prompt displayed; entry button hidden
  // 'blessing'  -> 2.5s graceful blessing animation active; clicks blocked to prevent restart
  // 'completed' -> Blessing completed; reveals "Enter Wedding Invitation" button
  const [blessingPhase, setBlessingPhase] = useState('idle');
  const [isHoveringFeet, setIsHoveringFeet] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shockwaveKey, setShockwaveKey] = useState(0);

  const feetRef = useRef(null);
  const promptPillRef = useRef(null);
  const timerRef = useRef(null);

  // Clean up any pending blessing timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Synthesize a gentle, authentic Indian Temple Brass Bell (Pooja Ghanti)
  // using harmonic partials (D5 Fundamental ~587.33 Hz, minor 3rd, 5th, and octave)
  const playTempleBell = () => {
    if (!soundEnabled) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.48, now);
      masterGain.connect(ctx.destination);

      // Acoustic brass bell partials with natural exponential decay
      const bellPartials = [
        { freq: 293.66, gain: 0.10, decay: 2.8, type: 'sine' },       // Low hum tone
        { freq: 587.33, gain: 0.40, decay: 3.5, type: 'sine' },       // Prime / Fundamental
        { freq: 588.65, gain: 0.24, decay: 3.2, type: 'sine' },       // Acoustic shimmer / beating
        { freq: 700.00, gain: 0.18, decay: 2.5, type: 'sine' },       // Tierce (minor 3rd)
        { freq: 880.00, gain: 0.15, decay: 2.2, type: 'sine' },       // Quint (5th)
        { freq: 1174.66, gain: 0.30, decay: 2.6, type: 'sine' },      // Nominal / Octave
        { freq: 1176.20, gain: 0.18, decay: 2.4, type: 'sine' },      // Beating octave
        { freq: 1760.00, gain: 0.12, decay: 1.8, type: 'sine' },      // Superoctave
        { freq: 2349.32, gain: 0.08, decay: 1.3, type: 'sine' },      // Brass shimmer
        { freq: 3520.00, gain: 0.04, decay: 0.5, type: 'triangle' },  // Gentle clapper strike
      ];

      bellPartials.forEach(({ freq, gain, decay, type }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        // Gentle attack (10ms) and exponential acoustic decay
        oscGain.gain.setValueAtTime(0.001, now);
        oscGain.gain.exponentialRampToValueAtTime(gain, now + 0.01);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decay + 0.1);
      });
    } catch {
      // Audio gracefully handled if browser policy restricts
    }
  };

  // Trigger Respectful Divine Blessings on Charan Sparsh (Touching the Feet)
  const handleTouchFeet = (e) => {
    // Keyboard accessibility: only proceed on Enter or Space
    if (e && e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;

    // PREVENT REPEATED CLICKS:
    // If the animation is already playing or completed, do not restart or interrupt
    if (blessingPhase !== 'idle') return;

    // Set to blessing phase
    setBlessingPhase('blessing');
    setShockwaveKey((prev) => prev + 1);

    // Play Temple Ghanti chime only after user interaction
    playTempleBell();

    // Subtle tactile haptic tap on mobile devices
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([30, 40, 30]);
      } catch {
        // ignore
      }
    }

    // Origin for particle burst (centered around Ganesh Ji's feet)
    let originX = 0.5;
    let originY = 0.70;

    if (feetRef.current) {
      const rect = feetRef.current.getBoundingClientRect();
      originX = (rect.left + rect.width / 2) / window.innerWidth;
      originY = (rect.top + rect.height / 2) / window.innerHeight;
    }

    try {
      // Subtle, respectful golden sparkles and soft petals (no wild party confetti)
      confetti({
        particleCount: 28,
        spread: 60,
        startVelocity: 18,
        origin: { x: originX, y: originY },
        colors: ['#ECC875', '#FFE082', '#FFCA28', '#F48FB1', '#C9A45C'],
        scalar: 0.9,
        gravity: 0.45,
        ticks: 160,
      });

      // Second gentle drifting wave
      setTimeout(() => {
        confetti({
          particleCount: 18,
          spread: 75,
          startVelocity: 15,
          origin: { x: originX, y: originY - 0.04 },
          colors: ['#FFF59D', '#F8BBD0', '#FFE082', '#ECC875'],
          scalar: 0.8,
          gravity: 0.4,
          ticks: 200,
        });
      }, 400);
    } catch {
      // Confetti fallback
    }

    // Exactly 2.5 seconds (within the 2–3s requirement) for the blessing animation
    // After 2.5s, smoothly reveal the "Enter Wedding Invitation" button
    timerRef.current = setTimeout(() => {
      setBlessingPhase('completed');
    }, 2500);
  };

  // Toggle Sound Preference
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playTempleBell();
    }
  };

  const isBlessingActive = blessingPhase === 'blessing';
  const isCompleted = blessingPhase === 'completed';
  const hasStartedBlessing = isBlessingActive || isCompleted;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 w-full h-full flex flex-col items-center justify-between p-2 sm:p-4 md:p-6 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F3E6D2] text-[#302522] select-none"
    >
      {/* 1. Luxurious Temple Lighting & Ambient Motion Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Warm Temple God-Rays & Divine Amber Glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 blur-3xl pointer-events-none ${
            hasStartedBlessing
              ? 'w-[750px] h-[750px] bg-gradient-to-r from-[#ECC875]/35 via-[#FFD54F]/25 to-[#C9A45C]/35 scale-110'
              : 'w-[520px] h-[520px] bg-gradient-to-r from-[#ECC875]/20 via-[#FFE082]/15 to-[#C9A45C]/15 scale-100'
          }`}
        />

        {/* Delicate Golden Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,248,235,0.2),rgba(235,215,185,0.3)_60%,rgba(65,15,25,0.06)_100%)]" />

        {/* Subtle Decorative Arch Silhouette */}
        <div className="absolute inset-x-0 top-0 h-44 flex justify-center opacity-25">
          <div className="w-[92vw] max-w-3xl h-full border-x border-b border-[#C9A45C]/30 rounded-b-[120px]" />
        </div>
      </div>

      {/* Top Ambient Bar: Subtle Auspicious Crest & Temple Bell Toggle */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="w-full max-w-3xl relative z-20 flex items-center justify-between px-2 pt-1 mb-1"
      >
        {/* Sacred Sanskrit Invocation Crest */}
        <div className="flex items-center gap-2">
          <span className="text-[#7A1F2B] text-xs font-serif font-bold">ॐ</span>
          <span className="text-[10px] sm:text-xs font-display uppercase tracking-[0.25em] text-[#7A1F2B]/90 font-semibold">
            Shubh Vivah
          </span>
        </div>

        {/* Temple Bell Sound Control */}
        <button
          onClick={toggleSound}
          aria-label={soundEnabled ? 'Mute Temple Bell' : 'Enable Temple Bell'}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F0]/85 hover:bg-[#FFF9F0] border border-[#C9A45C]/40 text-[#7A1F2B] text-[11px] font-sans transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <Bell className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span className="font-medium">{soundEnabled ? 'Temple Sound' : 'Muted'}</span>
          {soundEnabled ? (
            <Volume2 className="w-3 h-3 text-[#C9A45C]" />
          ) : (
            <VolumeX className="w-3 h-3 text-[#6B5B57]" />
          )}
        </button>
      </motion.div>

      {/* Main Full-Screen Centerpiece Artwork Card */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-lg mx-auto my-auto py-1">
        {/* Side Standing Diyas for Desktop / Tablet Ambiance */}
        <div className="absolute -left-6 sm:-left-12 md:-left-16 bottom-16 sm:bottom-20 z-10 hidden sm:block">
          <AmbientDiya />
        </div>
        <div className="absolute -right-6 sm:-right-12 md:-right-16 bottom-16 sm:bottom-20 z-10 hidden sm:block">
          <AmbientDiya />
        </div>

        {/* Divine Halo Behind Lord Ganesha's Crown */}
        <div
          className={`absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full pointer-events-none transition-all duration-1000 z-0 ${
            hasStartedBlessing
              ? 'bg-[radial-gradient(circle,rgba(255,223,128,0.55)_0%,rgba(255,160,0,0.30)_40%,transparent_75%)] animate-halo-pulse scale-125'
              : 'bg-[radial-gradient(circle,rgba(236,200,117,0.25)_0%,rgba(255,160,0,0.12)_35%,transparent_70%)] animate-halo-pulse scale-100'
          }`}
        />

        {/* Master Lord Ganesha Welcome Card */}
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-auto max-w-[340px] sm:max-w-[400px] md:max-w-[430px] rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-[#ECC875] via-[#C9A45C] to-[#9E7933] shadow-[0_15px_45px_rgba(122,31,43,0.15),0_5px_20px_rgba(201,164,92,0.25)] border border-[#FFF5D0] z-10"
        >
          {/* Inner Frame */}
          <div className="relative rounded-[22px] overflow-hidden bg-[#FAF3E8] shadow-inner">
            {/* The Master Welcome Image Asset */}
            <img
              src="/images/ganesha/welcome-ganesha.jpg"
              alt="Lord Ganesha - Welcome to Our Wedding Invitation"
              className="w-full h-auto block select-none pointer-events-none object-contain max-h-[70vh] sm:max-h-[72vh] md:max-h-[74vh] mx-auto filter drop-shadow-sm"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />

            {/* Accessible Interactive Hotspot over Lord Ganesha's Sacred Feet */}
            <div
              ref={feetRef}
              role="button"
              tabIndex={blessingPhase === 'idle' ? 0 : -1}
              aria-label="Touch Lord Ganesha's sacred feet to seek divine blessings"
              onClick={handleTouchFeet}
              onKeyDown={handleTouchFeet}
              onMouseEnter={() => setIsHoveringFeet(true)}
              onMouseLeave={() => setIsHoveringFeet(false)}
              className={`absolute z-30 outline-none select-none rounded-full ${
                blessingPhase === 'idle'
                  ? 'cursor-pointer touch-manipulation group'
                  : 'pointer-events-none'
              }`}
              style={{
                left: '36%',
                top: '67.5%',
                width: '26%',
                height: '8.5%',
              }}
            >
              {/* Expanding Golden Shockwave Wave on Charan Sparsh */}
              {hasStartedBlessing && shockwaveKey > 0 && (
                <span
                  key={shockwaveKey}
                  className="absolute inset-0 rounded-full border-2 border-[#FFE082] bg-[#ECC875]/35 animate-shockwave pointer-events-none"
                />
              )}

              {/* Pre-Blessing Elegant Golden Hint over the Sacred Feet */}
              {!hasStartedBlessing && (
                <>
                  {/* Subtle Concentric Golden Ping */}
                  <span className="absolute inset-0 rounded-full border border-[#C9A45C]/70 animate-ping opacity-50 pointer-events-none" />

                  {/* Soft Warm Golden Glow */}
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none ${
                      isHoveringFeet
                        ? 'bg-[#ECC875]/45 border-2 border-[#FFE7A8] shadow-[0_0_18px_rgba(236,200,117,0.9)] scale-110'
                        : 'bg-[#ECC875]/25 border border-[#ECC875]/80 shadow-[0_0_10px_rgba(201,164,92,0.6)]'
                    }`}
                  />

                  {/* Auspicious Sacred Lotus Hint */}
                  <span className="absolute inset-0 flex items-center justify-center text-[#7A1F2B] text-xs pointer-events-none opacity-80 group-hover:scale-110 transition-transform">
                    🪷
                  </span>
                </>
              )}

              {/* Post-Blessing Radiant Aura over Feet */}
              {hasStartedBlessing && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ECC875]/35 via-[#FFE082]/45 to-[#ECC875]/35 border border-[#ECC875] shadow-[0_0_15px_rgba(236,200,117,0.8)] pointer-events-none" />
              )}
            </div>

            {/* Secondary Touch Target over the Bottom Graphic Pill */}
            {/* Visitors can tap either the feet on the idol OR the prompt pill at the bottom */}
            {!hasStartedBlessing && (
              <div
                ref={promptPillRef}
                role="button"
                tabIndex={0}
                aria-label="Touch Ganesh Ji's feet to seek blessings"
                onClick={handleTouchFeet}
                onKeyDown={handleTouchFeet}
                className="absolute z-30 cursor-pointer outline-none touch-manipulation group select-none rounded-full"
                style={{
                  left: '18%',
                  top: '80.5%',
                  width: '64%',
                  height: '9%',
                }}
              >
                {/* Gentle Shimmer Border on Hover */}
                <span className="absolute inset-0 rounded-full border border-amber-400/40 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-400/10 pointer-events-none" />
              </div>
            )}

            {/* Devotional Blessing Message Overlay during and after blessing */}
            <AnimatePresence>
              {hasStartedBlessing && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-2.5 sm:inset-x-3.5 bottom-2 sm:bottom-3 z-30 flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-[#FFFDF9]/95 via-[#FFF8EC]/95 to-[#F9EED8]/95 backdrop-blur-md border border-[#C9A45C] shadow-[0_14px_38px_rgba(122,31,43,0.2),0_0_22px_rgba(201,164,92,0.3)] text-center overflow-hidden"
                >
                  {/* Inner Gold Inlay Hairline Border */}
                  <div className="absolute inset-1 rounded-xl border border-[#ECC875]/45 pointer-events-none" />

                  {/* Corner Royal Gold Flourishes */}
                  <span className="absolute top-1.5 left-2 text-[#C9A45C] text-[9px] pointer-events-none select-none">✦</span>
                  <span className="absolute top-1.5 right-2 text-[#C9A45C] text-[9px] pointer-events-none select-none">✦</span>
                  <span className="absolute bottom-1.5 left-2 text-[#C9A45C] text-[9px] pointer-events-none select-none">✦</span>
                  <span className="absolute bottom-1.5 right-2 text-[#C9A45C] text-[9px] pointer-events-none select-none">✦</span>

                  {/* Sacred Motichoor Laddu (Prasad) with Soft Glow */}
                  <motion.div
                    initial={{ scale: 0.65, opacity: 0, y: -4 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center -mt-0.5 mb-1"
                  >
                    <GoldenLaddu />
                    <span className="text-[8.5px] sm:text-[9px] font-display uppercase tracking-[0.25em] text-[#B38D43] font-bold">
                      श्री गणेश प्रसाद
                    </span>
                  </motion.div>

                  {/* Ultra-Smooth, Classy "॥ श्री गणेशाय नमः ॥" Reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center px-1"
                  >
                    <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-[0.14em] text-[#7A1F2B] drop-shadow-[0_2px_12px_rgba(201,164,92,0.45)]">
                      ॥ श्री गणेशाय नमः ॥
                    </h2>

                    {/* Auspicious Gold Filigree Line Divider */}
                    <div className="flex items-center justify-center gap-2 my-1">
                      <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#C9A45C]" />
                      <span className="text-[#C9A45C] text-xs">🪷</span>
                      <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#C9A45C]" />
                    </div>

                    <p className="font-serif text-[11px] sm:text-xs text-[#5C4540] italic leading-relaxed max-w-[290px]">
                      May Lord Ganesha bless this sacred union with joy, wisdom, and eternal harmony.
                    </p>
                  </motion.div>

                  {/* Blessing Status Pill */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    className="flex items-center justify-center gap-1.5 mt-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
                    <span className="text-[9.5px] sm:text-[10px] text-[#7A1F2B] font-display uppercase tracking-widest font-semibold">
                      {isCompleted ? '✨ Divine Blessings Received ✨' : 'Seeking Sacred Blessings...'}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 5. Enter Wedding Invitation Button Section: */}
        {/* Strictly revealed ONLY after the 2.5s blessing animation completes */}
        <div className="mt-3 sm:mt-4 flex flex-col items-center w-full min-h-[56px] justify-center">
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-1"
              >
                <button
                  onClick={onEnter}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3 sm:px-10 sm:py-3.5 rounded-full bg-gradient-to-r from-[#7A1F2B] via-[#651520] to-[#4F131B] text-[#FFF9F0] font-display text-xs sm:text-sm uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(122,31,43,0.35)] hover:shadow-[0_14px_40px_rgba(122,31,43,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-[#ECC875]"
                >
                  <span>Enter Wedding Invitation</span>
                  <ArrowRight className="w-4 h-4 text-[#ECC875] group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[10px] sm:text-[11px] text-[#6B5B57] font-serif italic tracking-wide">
                  The Wedding Invitation of Abinash &amp; Shikha
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Auspicious Footnote */}
      <div className="relative z-20 text-center pb-1">
        <p className="text-[10px] text-[#6B5B57]/70 font-display tracking-widest uppercase">
          ✦ Abinash &amp; Shikha • 5 December 2026 ✦
        </p>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
