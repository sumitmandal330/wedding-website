import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { weddingData } from '../data/wedding';

export const MusicPlayer = ({ autoPlayTrigger, onStartReady }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const interactionStartedRef = useRef(false);

  useEffect(() => {
    if (!autoPlayTrigger) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    const startAudio = () => {
      audio.currentTime = 0;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };
    onStartReady?.(startAudio);
    // Register gesture handlers before attempting autoplay. Some browsers reject
    // autoplay immediately, and the next user gesture must start playback inline.
    const startAfterInteraction = (event) => {
      if (event.target.closest?.('[data-music-control]')) return;
      if (interactionStartedRef.current) return;
      interactionStartedRef.current = true;
      audio.currentTime = 0;
      audio.play().then(() => {
        window.removeEventListener('pointerdown', startAfterInteraction, true);
        window.removeEventListener('click', startAfterInteraction, true);
        window.removeEventListener('keydown', startAfterInteraction, true);
      }).catch(() => {
        interactionStartedRef.current = false;
      });
    };
    window.addEventListener('pointerdown', startAfterInteraction, true);
    window.addEventListener('click', startAfterInteraction, true);
    window.addEventListener('keydown', startAfterInteraction, true);

    audio.currentTime = 0;
    audio.play().then(() => {
      window.removeEventListener('pointerdown', startAfterInteraction, true);
      window.removeEventListener('click', startAfterInteraction, true);
      window.removeEventListener('keydown', startAfterInteraction, true);
    }).catch(() => {});

    return () => {
      onStartReady?.(null);
      window.removeEventListener('pointerdown', startAfterInteraction, true);
      window.removeEventListener('click', startAfterInteraction, true);
      window.removeEventListener('keydown', startAfterInteraction, true);
    };
  }, [autoPlayTrigger, onStartReady]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2">
      <audio
        ref={audioRef}
        src={weddingData.music.audioSrc}
        loop
        preload="auto"
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
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
