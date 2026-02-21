import React, { createContext, useContext, useState, useEffect } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/voice/ElevenLabs_2026-02-20T23_25_19_Hope - upbeat and clear_pvc_sp96_s50_sb75_v3.mp3');
    audio.loop = true;
    audio.volume = 0.5; // Set volume to 50%
    audioRef.current = audio;

    // Try to play audio on first user interaction
    const playAudio = () => {
      if (!isMuted) {
        audio.play().catch((error) => {
          console.log('Audio playback failed (browser may require user interaction):', error);
        });
      }
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };

    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
    document.addEventListener('touchstart', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
      document.removeEventListener('touchstart', playAudio);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMutedState = !prev;
      if (audioRef.current) {
        if (newMutedState) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch((error) => {
            console.log('Audio playback failed:', error);
          });
        }
      }
      return newMutedState;
    });
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
