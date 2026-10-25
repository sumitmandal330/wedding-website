import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const GaneshaBlessing = ({ onContinue }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasBlessed, setHasBlessed] = useState(false);
  const [blessingComplete, setBlessingComplete] = useState(false);
  const [touchPoint, setTouchPoint] = useState(null);
  const completionTimer = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => () => {
    clearTimeout(completionTimer.current);
  }, []);

  const handleTouchFeet = (event) => {
    if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
    if (!imageLoaded || hasBlessed) return;

    setHasBlessed(true);
    const bounds = event.currentTarget.getBoundingClientRect();
    setTouchPoint({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 });

    completionTimer.current = setTimeout(() => setBlessingComplete(true), reducedMotion ? 80 : 2600);
  };

  return (
    <motion.main
      className={`ganesha-blessing-scene fixed inset-0 z-50 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-6 text-center ${blessingComplete ? 'is-completed' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Lord Ganesha blessing experience"
    >
      <div className={`ganesha-blessing-aura ${hasBlessed ? 'is-active' : ''}`} aria-hidden="true" />

      <motion.div
        className="ganesha-blessing-art"
        initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/images/ganesha/golden-ganesh-blessings.png"
          alt="Lord Ganesha seated on a golden altar with the wedding invitation"
          className="ganesha-blessing-image"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
          draggable="false"
        />

        {imageLoaded && !hasBlessed && (
          <motion.button
            type="button"
            className="ganesha-feet-hotspot"
            onClick={handleTouchFeet}
            aria-label="Touch Lord Ganesha’s feet to receive blessings"
            title="Touch the Holy Feet to Receive Blessings"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.65, duration: reducedMotion ? 0.01 : 0.8 }}
          >
            <span className="ganesha-feet-hint" aria-hidden="true" />
          </motion.button>
        )}

        {hasBlessed && !reducedMotion && (
          <>
            <motion.div
              className="ganesha-hand-light-beam"
              initial={{ opacity: 0.32, scale: 0.9 }}
              animate={{ opacity: [0.32, 0.82, 0.32], scale: [0.9, 1.12, 0.9] }}
              transition={{ duration: 4.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
              aria-hidden="true"
            />
            <motion.div
              className="ganesha-hand-light-glow"
              initial={{ opacity: 0.42, scale: 0.84 }}
              animate={{ opacity: [0.42, 0.98, 0.42], scale: [0.84, 1.2, 0.84] }}
              transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
              aria-hidden="true"
            />
            <motion.div
              className="ganesha-hand-light-foreground"
              initial={{ opacity: 0.12, scale: 0.88 }}
              animate={{ opacity: [0.12, 0.46, 0.12], scale: [0.88, 1.1, 0.88] }}
              transition={{ duration: 4.8, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
              aria-hidden="true"
            />
          </>
        )}

        {touchPoint && !reducedMotion && (
          <motion.span
            className="ganesha-touch-ripple"
            style={{ left: touchPoint.x, top: touchPoint.y }}
            initial={{ opacity: 0.8, scale: 0.15 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 1.35, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}

      </motion.div>

      {!imageLoaded ? (
        <p className="ganesha-blessing-prompt" role="status">Preparing the sacred invitation…</p>
      ) : blessingComplete ? null : !hasBlessed ? (
        <>
          <motion.p
            className="ganesha-blessing-prompt"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.9, duration: reducedMotion ? 0.01 : 0.8 }}
          >
            Touch Lord Ganesha’s feet or use the button below
          </motion.p>
          <motion.button
            type="button"
            className="ganesha-invitation-button ganesha-receive-button"
            onClick={handleTouchFeet}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 1.05, duration: reducedMotion ? 0.01 : 0.7 }}
          >
            Receive Ashirwad
          </motion.button>
        </>
      ) : null}

      {blessingComplete && (
        <section className="ganesha-post-blessing" aria-label="Ashirwad and wedding invitation">
          <motion.article
            className="ganesha-ashirwad-card"
            initial={reducedMotion ? false : { opacity: 0, rotateX: -82, y: 24 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              className="ganesha-ashirwad-message"
              initial={reducedMotion ? false : { opacity: 0, y: 8, letterSpacing: '0.02em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
              transition={{ delay: reducedMotion ? 0 : 0.35, duration: reducedMotion ? 0.01 : 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              May Lord Ganesha Bless You Always
            </motion.h1>
          </motion.article>
          <motion.button
            type="button"
            className="ganesha-invitation-button ganesha-enter-doors-button"
            onClick={onContinue}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.75, duration: reducedMotion ? 0.01 : 0.8 }}
          >
            Open Wedding Invitation
          </motion.button>
        </section>
      )}
    </motion.main>
  );
};

export default GaneshaBlessing;
