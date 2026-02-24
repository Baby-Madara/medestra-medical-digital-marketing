import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    // Determine audio file based on current language
    const englishFile = '/voice/ElevenLabs_2026-02-20T23_25_19_Hope - upbeat and clear_pvc_sp96_s50_sb75_v3.mp3';
    const arabicFile = '/voice/صوت عربي.mp3';
    const src = language === 'ar' ? arabicFile : englishFile;

    // Create or reuse audio element
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    } else if (audio.src.indexOf(src) === -1) {
      audio.src = src;
      audio.load();
    }

    // Play on first user interaction (if not muted)
    const playAudio = () => {
      if (!isMuted && audio) {
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

    // If language changes while allowed, attempt to play the new audio
    if (!isMuted) {
      audio.play().catch(() => {});
    }

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
      document.removeEventListener('touchstart', playAudio);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [language]);

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
