import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

// Gentle rising harp/chime tone on reveal using Web Audio API
const playRevealChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    // Ascending arpeggio chords (C5, E5, G5, B5, C6)
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.85);
    });
  } catch {
    // Audio gracefully ignored if browser prevents
  }
};

const FOIL_PALETTES = {
  haldi: { foil: ['#9c711f', '#e8c55f', '#fff1b5', '#d7ae43', '#f4dfa1', '#8b651c'], ink: '#5c4314', border: '#76571b', prompt: '#725317' },
  mehndi: { foil: ['#275a43', '#75a884', '#e0efc9', '#55946d', '#bad5a2', '#214b39'], ink: '#193d2c', border: '#244f39', prompt: '#28543b' },
  sangeet: { foil: ['#57427e', '#a18bc8', '#f1e8ff', '#8b75b5', '#d7c8ef', '#4d396f'], ink: '#382852', border: '#514072', prompt: '#514072' },
  aiburobhat: { foil: ['#874525', '#c87842', '#ffe2bc', '#d99a61', '#f3c89a', '#783b23'], ink: '#59331f', border: '#794422', prompt: '#744321' },
  marriage: { foil: ['#793044', '#cc7e8b', '#ffeaeb', '#b96578', '#f1bdc5', '#70283d'], ink: '#552233', border: '#713044', prompt: '#682d40' },
  classic: { foil: ['#b08b4d', '#e0c98e', '#fbf1d2', '#d9c183', '#f2e3b5', '#a88348'], ink: '#54111B', border: '#5b301b', prompt: '#5A3D18' },
};

export const ScratchCard = ({
  id,
  date,
  day,
  time,
  ceremonyName,
  bengaliName,
  isGloballyRevealed = false,
  onRevealedChange,
  promptTitle = 'SCRATCH TO REVEAL DATE',
  promptInstruction = 'Swipe finger or drag mouse to reveal',
  allowRescratch = true,
  isFeatured = false,
}) => {
  const heartClipId = `scratch-heart-${useId().replace(/:/g, '')}`;
  const ceremonyLabel = `${id} ${ceremonyName}`.toLowerCase();
  const ceremonyTheme = isFeatured || /marriage|shaadi|wedding/.test(ceremonyLabel)
    ? 'marriage'
    : /haldi/.test(ceremonyLabel)
      ? 'haldi'
      : /mehndi|mehandi/.test(ceremonyLabel)
        ? 'mehndi'
        : /sangeet/.test(ceremonyLabel)
          ? 'sangeet'
          : /aiburobhat|aiburabath/.test(ceremonyLabel)
            ? 'aiburobhat'
            : 'classic';
  const foilPalette = FOIL_PALETTES[ceremonyTheme];
  const [locallyRevealed, setIsRevealed] = useState(false);
  const isRevealed = locallyRevealed || isGloballyRevealed;
  const [scratchPercent, setScratchPercent] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);

  // Trigger celebration on successful reveal
  const handleCompleteReveal = useCallback((withEffects = true) => {
    setIsRevealed(true);
    setScratchPercent(100);
    if (onRevealedChange) onRevealedChange(id, true);

    if (withEffects) {
      playRevealChime();

      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate([25, 40, 30]);
        } catch {
          // ignore
        }
      }

      try {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ECC875', '#FFE082', '#FFD54F', '#7A1F2B', '#E57373', '#FFFFFF'],
        });
      } catch {
        // ignore
      }
    }
  }, [id, onRevealedChange]);

  // Draw the luxury golden foil cover onto the canvas
  const drawFoilSurface = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width) || 300;
    const height = Math.floor(rect.height) || 160;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    const corner = 13;
    ctx.moveTo(corner, 0);
    ctx.lineTo(width - corner, 0);
    ctx.quadraticCurveTo(width, 0, width, corner);
    ctx.lineTo(width, height - corner);
    ctx.quadraticCurveTo(width, height, width - corner, height);
    ctx.lineTo(corner, height);
    ctx.quadraticCurveTo(0, height, 0, height - corner);
    ctx.lineTo(0, corner);
    ctx.quadraticCurveTo(0, 0, corner, 0);
    ctx.closePath();
    ctx.clip();

    // Satin foil shifts color to match each ceremony.
    const grad = ctx.createLinearGradient(0, 0, width, height);
    foilPalette.foil.forEach((color, index) => grad.addColorStop(index / (foilPalette.foil.length - 1), color));

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle diagonal shimmer lines pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.11)';
    ctx.lineWidth = 0.8;
    for (let i = -height; i < width + height; i += 25) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }

    // Outer and Inner Gold Inlay Borders
    ctx.strokeStyle = foilPalette.border;
    ctx.lineWidth = 1.2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.strokeStyle = 'rgba(255, 249, 225, .82)';
    ctx.lineWidth = 0.7;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Ornate Corner Studs
    const cornerOffsets = [
      [14, 14],
      [width - 14, 14],
      [14, height - 14],
      [width - 14, height - 14],
    ];
    ctx.fillStyle = foilPalette.ink;
    cornerOffsets.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Central Royal Coin / Seal Emblem
    const centerX = width / 2;
    const centerY = height / 2 - 10;

    // Golden Coin Ring
    const coinGrad = ctx.createRadialGradient(centerX, centerY, 3, centerX, centerY, 24);
    coinGrad.addColorStop(0, '#FFFBE6');
    coinGrad.addColorStop(0.6, '#ECC875');
    coinGrad.addColorStop(1, '#8C6218');

    ctx.beginPath();
    ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
    ctx.fillStyle = coinGrad;
    ctx.fill();
    ctx.strokeStyle = '#54111B';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Central Sacred Lotus / Star Symbol
    ctx.fillStyle = foilPalette.ink;
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ 🪷 ✦', centerX, centerY);

    // Engraved couple monogram keeps the foil artwork consistent across devices.
    ctx.beginPath();
    ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
    ctx.fillStyle = coinGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(122, 31, 43, .38)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.fillStyle = foilPalette.ink;
    ctx.font = '600 11px Georgia, serif';
    ctx.fillText('A  ·  S', centerX, centerY);

    // Text: SCRATCH TO REVEAL DATE
    ctx.fillStyle = foilPalette.ink;
    const compactPrompt = width < 390 && promptTitle.length > 24;
    const titleLines = compactPrompt
      ? promptTitle.toUpperCase().replace(' OUR ', '|').split('|')
      : [promptTitle.toUpperCase()];
    ctx.font = `600 ${compactPrompt ? 9 : 11}px "Cinzel", "Playfair Display", Georgia, serif`;
    const titleTop = centerY + 34;
    titleLines.forEach((line, index) => ctx.fillText(line, centerX, titleTop + index * 13, width - 32));

    // Subtext: Swipe or drag to uncover
    ctx.fillStyle = foilPalette.prompt;
    ctx.font = 'italic 10px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(promptInstruction, centerX, titleTop + titleLines.length * 13 + 1, width - 30);

  }, [foilPalette, promptTitle, promptInstruction]);

  // Initialize foil when not revealed
  useEffect(() => {
    if (!isRevealed) {
      // Small timeout to allow container to measure dimensions properly
      const t = setTimeout(() => {
        drawFoilSurface();
      }, 50);

      const handleResize = () => {
        if (!isRevealed) drawFoilSurface();
      };
      const resizeObserver = typeof ResizeObserver !== 'undefined' && containerRef.current
        ? new ResizeObserver(handleResize)
        : null;
      if (resizeObserver && containerRef.current) resizeObserver.observe(containerRef.current);
      window.addEventListener('resize', handleResize);
      return () => {
        clearTimeout(t);
        resizeObserver?.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isRevealed, drawFoilSurface]);

  // Measure how much percentage of the foil has been scratched away
  const calculateScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    try {
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) return;

      // Sample a 24x24 grid (576 sample pixels) for fast 60fps performance
      const sampleCols = 24;
      const sampleRows = 24;
      const stepX = Math.floor(width / sampleCols);
      const stepY = Math.floor(height / sampleRows);

      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      let transparentCount = 0;
      const totalSamples = sampleCols * sampleRows;

      for (let r = 0; r < sampleRows; r++) {
        for (let c = 0; c < sampleCols; c++) {
          const x = c * stepX;
          const y = r * stepY;
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];
          if (alpha < 128) {
            transparentCount++;
          }
        }
      }

      const percent = Math.round((transparentCount / totalSamples) * 100);
      setScratchPercent(percent);

      // Auto-reveal once user scratches 35% or more of the surface
      if (percent >= 35) {
        handleCompleteReveal(true);
      }
    } catch {
      // ignore
    }
  }, [isRevealed, handleCompleteReveal]);

  // Scratch stroke logic
  const scratchAt = useCallback(
    (clientX, clientY) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealed) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 38;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (lastPointRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, 19, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      lastPointRef.current = { x, y };

      // Mild haptic vibration on mobile
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate(8);
        } catch {
          // ignore
        }
      }
    },
    [isRevealed]
  );

  // Mouse handlers
  const handleMouseDown = (e) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    lastPointRef.current = null;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current || isRevealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    calculateScratchPercentage();
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    lastPointRef.current = null;
    const touch = e.touches[0];
    if (touch) scratchAt(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDrawingRef.current || isRevealed) return;
    // Prevent scrolling while actively scratching the surface
    if (e.cancelable) e.preventDefault();
    const touch = e.touches[0];
    if (touch) scratchAt(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    calculateScratchPercentage();
  };

  // Split date into parts (e.g., "3 December 2026" -> dayNum="03", monthYear="December 2026")
  const parts = date ? date.split(' ') : ['05', 'December', '2026'];
  const dayNum = String(parts[0] || '05').padStart(2, '0');
  const monthYear = parts.slice(1).join(' ') || 'December 2026';

  return (
    <div className={`scratch-card scratch-card-heart relative w-full ${isFeatured ? 'scratch-card-featured' : ''}`} data-theme={ceremonyTheme}>
      <svg className="scratch-heart-defs" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={heartClipId} clipPathUnits="objectBoundingBox">
            <path d="M.5 .96C.43 .9 .06 .62 .06 .34.06 .17.19 .06.34 .06.42 .06.48 .1.5 .18.52 .1.58 .06.66 .06.81 .06.94 .17.94 .34.94 .62.57 .9.5 .96Z" />
          </clipPath>
        </defs>
      </svg>
      {/* Scratch Container Card */}
      <div
        ref={containerRef}
        style={{ clipPath: `url(#${heartClipId})` }}
        data-revealed={isRevealed}
        className={`scratch-heart-surface relative w-full overflow-hidden border transition-all duration-500 shadow-md ${
          isRevealed
            ? 'bg-gradient-to-b from-[#30080E] via-[#4A0E17] to-[#25050A] border-[#ECC875] shadow-[0_0_25px_rgba(236,200,117,0.35)]'
            : 'bg-[#2A080E] border-[#C9A45C]'
        }`}
      >
        {/* ══════════════════════════════════════════════════════════
            REVEALED UNDERLAY (The Auspicious Date & Time)
            ══════════════════════════════════════════════════════════ */}
        <div className="scratch-heart-content relative p-4 sm:p-5 flex flex-col justify-between h-full select-none">
          {/* Subtle Golden Shimmer Sweeper when revealed */}
          {isRevealed && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-sheen" />
            </div>
          )}

          {/* Top Row: Bengali Blessing & Revealed Checkmark */}
          <div className="scratch-heart-top-row flex items-center justify-between gap-2 mb-2 z-10">
            <span className="text-[11px] sm:text-xs font-serif text-[#ECC875] font-semibold tracking-wider flex items-center gap-1.5">
              <span>✦</span>
              <span>{bengaliName || ceremonyName}</span>
              <span>✦</span>
            </span>

          </div>

          {/* Center Date & Time Display */}
          <div className="scratch-heart-details my-1 sm:my-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
            {/* Big Auspicious Date Number */}
            <div className="flex items-baseline gap-2.5">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-gold-gradient tracking-tight drop-shadow-md">
                {dayNum}
              </span>
              <div>
                <span className="block font-display text-xs sm:text-sm uppercase tracking-widest text-[#FFF9F0] font-bold">
                  {monthYear}
                </span>
                <span className="block text-[11px] font-serif uppercase tracking-wider text-[#ECC875]/90">
                  {day}
                </span>
              </div>
            </div>

            {/* Time Pill Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-[#ECC875]/60 backdrop-blur-sm self-start sm:self-center">
              <Clock className="w-4 h-4 text-[#ECC875] shrink-0" />
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-[#F5EBDD]/70 font-sans leading-none">
                  Ceremony Time
                </span>
                <span className="block text-xs sm:text-sm font-bold text-[#FFF9F0] font-sans mt-0.5">
                  {time}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Shubh Muhurat Note */}
          <div className={`scratch-heart-footer ${isFeatured ? 'hidden' : ''} pt-2 border-t border-[#C9A45C]/30 flex items-center justify-between text-[10px] sm:text-[11px] text-[#F5EBDD]/80 z-10`}>
            <span className="font-serif italic flex items-center gap-1 text-[#ECC875]">
              <Sparkles className="w-3 h-3 text-[#ECC875]" />
              <span>শুভ মুহূর্ত • Auspicious Shubh Muhurat</span>
            </span>

            {isRevealed && allowRescratch && (
              <button
                onClick={() => {
                  setIsRevealed(false);
                  setScratchPercent(0);
                  if (onRevealedChange) onRevealedChange(id, false);
                }}
                className="text-[#ECC875]/70 hover:text-[#ECC875] inline-flex items-center gap-1 text-[10px] font-sans transition-colors cursor-pointer"
                title="Cover again to scratch once more"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Scratch Again</span>
              </button>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SCRATCHABLE GOLD FOIL CANVAS OVERLAY
            ══════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 z-20 touch-none cursor-crosshair select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Progress Indicator Pill (Scratch % info) */}
              <div className="hidden">
                <span className="px-2 py-0.5 rounded-full bg-[#1A050B]/80 border border-[#ECC875]/60 text-[9px] font-display text-[#ECC875] tracking-widest uppercase backdrop-blur-sm shadow-sm">
                  {scratchPercent > 0 ? `${scratchPercent}% scratched` : '✦ Scratch me'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instant Reveal Tap Control below the card */}
    </div>
  );
};

export default ScratchCard;
