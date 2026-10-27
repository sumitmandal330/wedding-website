import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './components/WelcomeScreen';
import { InvitationCover } from './components/InvitationCover';
import { GaneshaBlessing } from './components/GaneshaBlessing';
import { RoyalDoors } from './components/RoyalDoors';
import { EngagementExperience } from './components/EngagementExperience';
import { WeddingExperience } from './components/WeddingExperience';
import { MusicPlayer } from './components/MusicPlayer';
import { PetalShower } from './components/PetalShower';

export const App = () => {
  // Navigation scenes: 'welcome' (first page) | 'cover' | 'ganesha' | 'doors' | 'engagement' | 'wedding'
  const [currentScene, setCurrentScene] = useState(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (['welcome', 'cover', 'ganesha', 'doors', 'engagement', 'wedding'].includes(hash)) {
        return hash;
      }
      const params = new URLSearchParams(window.location.search);
      const scene = params.get('scene');
      if (['welcome', 'cover', 'ganesha', 'doors', 'engagement', 'wedding'].includes(scene)) {
        return scene;
      }
    } catch {
      // ignore
    }
    return 'cover';
  });
  const musicTrigger = false;
  const [doorsAutoOpen, setDoorsAutoOpen] = useState(false);
  const [doorsReturnScene, setDoorsReturnScene] = useState('cover');

  // Transitions
  const handleEnterFromWelcome = () => {
    setDoorsAutoOpen(false);
    setDoorsReturnScene('welcome');
    setCurrentScene('doors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCover = () => {
    setCurrentScene('ganesha');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueFromGanesha = () => {
    setDoorsAutoOpen(true);
    setDoorsReturnScene('ganesha');
    setCurrentScene('doors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoor = useCallback((choice) => {
    if (choice === 'engagement') {
      setCurrentScene('engagement');
    } else {
      setCurrentScene('wedding');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToDoors = () => {
    setDoorsAutoOpen(false);
    setCurrentScene('doors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDoors = () => {
    setDoorsAutoOpen(false);
    setCurrentScene(doorsReturnScene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWedding = () => {
    setCurrentScene('wedding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEngagement = () => {
    setCurrentScene('engagement');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#302522] selection:bg-[#7A1F2B] selection:text-[#FFF9F0] relative overflow-x-hidden font-sans">
      {/* Gentle Floating Marigold & Rose Petals */}
      <PetalShower />

      {/* Main Cinematic Flow */}
      <AnimatePresence mode="wait">
        {currentScene === 'welcome' && (
          <WelcomeScreen key="welcome" onEnter={handleEnterFromWelcome} />
        )}

        {currentScene === 'cover' && (
          <InvitationCover key="cover" onOpen={handleOpenCover} />
        )}

        {currentScene === 'ganesha' && (
          <GaneshaBlessing key="ganesha" onContinue={handleContinueFromGanesha} onOpenEngagement={handleOpenEngagement} />
        )}

        {currentScene === 'doors' && (
          <RoyalDoors key="doors" onSelectChoice={handleSelectDoor} onBack={handleBackFromDoors} autoOpen={doorsAutoOpen} />
        )}

        {currentScene === 'engagement' && (
          <EngagementExperience key="engagement" onBackToWedding={handleBackToWedding} />
        )}

        {currentScene === 'wedding' && (
          <WeddingExperience key="wedding" onBackToDoors={handleBackToDoors} onOpenEngagement={handleOpenEngagement} />
        )}
      </AnimatePresence>

      {/* Floating Ambient Music Player */}
      <MusicPlayer autoPlayTrigger={musicTrigger} />
    </div>
  );
};

export default App;

