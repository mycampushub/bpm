
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useVoice } from "./VoiceContext";

interface VoiceTrainerContextType {
  isTrainerEnabled: boolean;
  toggleTrainer: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isInitialized: boolean;
}

const VoiceTrainerContext = createContext<VoiceTrainerContextType | undefined>(undefined);

interface VoiceTrainerProviderProps {
  children: ReactNode;
}

export const VoiceTrainerProvider: React.FC<VoiceTrainerProviderProps> = ({ children }) => {
  const [isTrainerEnabled, setIsTrainerEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('voiceTrainerEnabled') === 'true';
    }
    return false;
  });
  const [currentPage, setCurrentPage] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const { speakText } = useVoice();

  useEffect(() => {
    // Initialize voice trainer
    const initializeTrainer = () => {
      console.log('Voice trainer initializing...');
      setIsInitialized(true);
      
      if (isTrainerEnabled) {
        setTimeout(() => {
          speakText("Voice trainer is now active. You will receive audio guidance as you navigate through the application.");
        }, 1000);
      }
    };

    initializeTrainer();
  }, []);

  const toggleTrainer = () => {
    const newState = !isTrainerEnabled;
    setIsTrainerEnabled(newState);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('voiceTrainerEnabled', newState.toString());
    }

    if (newState) {
      speakText("Voice trainer enabled. You will now receive audio guidance throughout the application.");
    } else {
      speakText("Voice trainer disabled.");
    }
  };

  const value: VoiceTrainerContextType = {
    isTrainerEnabled,
    toggleTrainer,
    currentPage,
    setCurrentPage,
    isInitialized
  };

  return (
    <VoiceTrainerContext.Provider value={value}>
      {children}
    </VoiceTrainerContext.Provider>
  );
};

export const useVoiceTrainer = (): VoiceTrainerContextType => {
  const context = useContext(VoiceTrainerContext);
  if (!context) {
    throw new Error("useVoiceTrainer must be used within a VoiceTrainerProvider");
  }
  return context;
};
