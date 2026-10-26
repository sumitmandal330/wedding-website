import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const invitation = 'hum apni shaadi mein dil se aamantrit karte hain. Aapki maujoodgi aur aashirvaad hamare liye bahut khaas hain. Humein aapka intezaar rahega!';
const invitationWords = invitation.split(' ');

export const GaneshaBlessing = ({ onContinue }) => {
  const [visibleWords, setVisibleWords] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisibleWords(invitationWords.length);
      return undefined;
    }

    let wordIndex = 0;
    let typingTimer;
    const startTimer = window.setTimeout(() => {
      typingTimer = window.setInterval(() => {
        wordIndex += 1;
        setVisibleWords(wordIndex);
        if (wordIndex >= invitationWords.length) window.clearInterval(typingTimer);
      }, 170);
    }, 1100);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(typingTimer);
    };
  }, [reducedMotion]);

  const textComplete = visibleWords >= invitationWords.length;

  return (
    <motion.main
      className="couple-invitation-scene fixed inset-0 z-50 flex min-h-[100svh] flex-col items-center justify-center overflow-y-auto px-5 py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Wedding invitation from Abinash and Shikha"
    >
      <div className="couple-invitation-frame" aria-hidden="true" />
      <motion.figure
        className="couple-portrait-frame"
        initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.94, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: reducedMotion ? 0.01 : 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/images/couple-invitation.jpeg"
          alt="Abinash and Shikha, the couple celebrating their wedding"
          className="couple-portrait"
          draggable="false"
        />
        <span className="couple-portrait-caption">Abinash <i>&amp;</i> Shikha</span>
      </motion.figure>

      <motion.section
        className="couple-invitation-message"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : 0.5, duration: reducedMotion ? 0.01 : 0.75 }}
        aria-live="polite"
      >
        <p className="couple-invitation-kicker">Shubh Vivaah</p>
        <h1 className="couple-invitation-title">Dil se Nimantran</h1>
        <p className="couple-invitation-copy">
          {invitationWords.map((word, index) => (
            <span className="couple-invitation-word" key={`${word}-${index}`}>
              {index < visibleWords ? word : ''}{index < visibleWords - 1 ? ' ' : ''}
            </span>
          ))}
          {!textComplete && <span className="couple-invitation-cursor" aria-hidden="true">|</span>}
        </p>
      </motion.section>

      <motion.button
        type="button"
        className="couple-open-invitation"
        onClick={onContinue}
        disabled={!textComplete}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: textComplete ? 1 : 0, y: textComplete ? 0 : 12 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.65 }}
      >
        Open Wedding Invitation <span aria-hidden="true">✦</span>
      </motion.button>
    </motion.main>
  );
};

export default GaneshaBlessing;
