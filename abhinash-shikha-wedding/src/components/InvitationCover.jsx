import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const InvitationCover = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    timerRef.current = setTimeout(onOpen, prefersReducedMotion ? 1800 : 4000);
  };

  return (
    <motion.main
      className="invitation-cover-scene fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-5 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
      aria-label="Wedding invitation cover"
    >
      <div className="invitation-cover-glow" aria-hidden="true" />
      <div className="invitation-cover-arch" aria-hidden="true" />
      <div className="invitation-card-perspective">
        <motion.div
          className={`invitation-card-reveal ${isOpening ? 'is-opening' : ''}`}
          initial={false}
          animate={isOpening
            ? { opacity: 1, scale: 1.08, filter: 'blur(0px)' }
            : { opacity: 0.08, scale: 0.78, filter: 'blur(10px)' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 3.8, delay: prefersReducedMotion ? 0 : 0.15, ease: [0.22, 0.68, 0.24, 1] }}
          aria-hidden="true"
        >
          {isOpening && (
            <img
              src="/images/ganesha/auspicious-wedding-blessing.png"
              alt=""
              draggable="false"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          )}
        </motion.div>

        <motion.button
          type="button"
          className={`invitation-card-cover ${isOpening ? 'is-opening' : ''}`}
          onClick={handleOpen}
          disabled={isOpening}
          aria-label="Open the wedding invitation"
          aria-busy={isOpening}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
          animate={isOpening
            ? { opacity: 1, y: 0, scale: 1, rotateY: -158, z: 12 }
            : { opacity: 1, y: 0, scale: 1, rotateY: 0, z: 0 }}
          transition={isOpening
            ? { duration: prefersReducedMotion ? 0.01 : 2.9, ease: [0.42, 0, 0.2, 1] }
            : { duration: prefersReducedMotion ? 0.01 : 0.85, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
        >
          <span className="sr-only">INVITATION</span>
          <span className="invitation-card-sheen" aria-hidden="true" />
        </motion.button>
      </div>
      <motion.div
        className="invitation-inner-light"
        aria-hidden="true"
        animate={isOpening ? { opacity: 0.9, scale: 2.8 } : { opacity: 0, scale: 0.55 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 1.85, delay: prefersReducedMotion ? 0 : 0.95, ease: [0.22, 0.68, 0.24, 1] }}
      />
    </motion.main>
  );
};

export default InvitationCover;
