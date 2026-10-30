import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { weddingData } from '../data/wedding';

export const MusicPlayer = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSynth, setUseSynth] = useState(false);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthNodesRef = useRef([]);
  const gainNodeRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const stopSynth = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
    }
    setTimeout(() => {
      synthNodesRef.current.forEach((n) => {
        try {
          n.stop();
          n.disconnect();
        } catch {
          // oscillator already stopped
        }
      });
      synthNodesRef.current = [];
    }, 500);
  }, []);

  // Web Audio Procedural Indian Tanpura Drone
  const startSynth = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      stopSynth();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Sa, Pa, high Sa harmonic Indian drone
      const freqs = [146.83, 220.0, 293.66, 440.0];
      const nodes = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.06 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        nodes.push(osc, lfo);
      });

      synthNodesRef.current = nodes;
      setUseSynth(true);
      setIsPlaying(true);
    } catch {
      // Audio context restricted
    }
  }, [stopSynth]);

  const togglePlayback = () => {
    if (isPlaying) {
      if (audioRef.current && !useSynth) audioRef.current.pause();
      if (useSynth) stopSynth();
      setIsPlaying(false);
    } else {
      if (audioRef.current && !useSynth) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => startSynth());
      } else {
        startSynth();
      }
    }
  };

  useEffect(() => {
    if (!autoPlayTrigger || hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    // Register gesture handlers before attempting autoplay. Some browsers reject
    // autoplay immediately, and the next user gesture must start playback inline.
    const startAfterInteraction = (event) => {
      if (event.target.closest?.('[data-music-control]')) return;
      audio.currentTime = 0;
      audio.play().then(() => {
        setIsPlaying(true);
        window.removeEventListener('pointerdown', startAfterInteraction, true);
        window.removeEventListener('keydown', startAfterInteraction, true);
      }).catch(() => {});
    };
    window.addEventListener('pointerdown', startAfterInteraction, true);
    window.addEventListener('keydown', startAfterInteraction, true);

    audio.currentTime = 0;
    audio.play().then(() => {
      setIsPlaying(true);
      window.removeEventListener('pointerdown', startAfterInteraction, true);
      window.removeEventListener('keydown', startAfterInteraction, true);
    }).catch(() => {});

    return () => {
      window.removeEventListener('pointerdown', startAfterInteraction, true);
      window.removeEventListener('keydown', startAfterInteraction, true);
    };
  }, [autoPlayTrigger]);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2">
      <audio
        ref={audioRef}
        src={weddingData.music.audioSrc}
        loop
        preload="auto"
        onError={() => setUseSynth(true)}
      />

      <div className="flex items-center bg-[#7A1F2B]/95 backdrop-blur-md text-[#FFF9F0] border border-[#ECC875] rounded-full px-4 py-2 shadow-2xl">
        <button
          data-music-control="true"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause music' : 'Play traditional music'}
          className="flex items-center gap-2 text-xs font-display uppercase tracking-wider font-semibold focus:outline-none cursor-pointer"
        >
          {isPlaying ? (
            <>
              <div className="flex items-end gap-0.5 h-3 w-3.5" aria-hidden="true">
                <span className="w-0.5 bg-[#ECC875] h-3 animate-pulse" />
                <span className="w-0.5 bg-[#ECC875] h-2 animate-pulse delay-75" />
                <span className="w-0.5 bg-[#ECC875] h-3.5 animate-pulse delay-150" />
              </div>
              <span className="text-[#ECC875] text-[10px] sm:text-xs">Music On</span>
              <Pause className="w-3.5 h-3.5 text-[#ECC875]" />
            </>
          ) : (
            <>
              <Music className="w-3.5 h-3.5 text-[#ECC875] animate-bounce" />
              <span className="text-[#F5EBDD] text-[10px] sm:text-xs">{weddingData.music.title}</span>
              <Play className="w-3.5 h-3.5 text-[#ECC875]" />
            </>
          )}
        </button>

        <span className="h-3 w-[1px] bg-[#ECC875]/40 mx-2" />

        <button
          data-music-control="true"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Mute audio' : 'Unmute audio'}
          className="p-0.5 text-[#ECC875] hover:text-white transition-colors cursor-pointer"
        >
          {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-[#F5EBDD]/60" />}
        </button>
      </div>
    </div>
  );
};
