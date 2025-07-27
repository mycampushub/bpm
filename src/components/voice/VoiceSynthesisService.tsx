
import React, { useEffect, useState } from "react";

// Define the service options type
interface VoiceSynthesisOptions {
  pitch?: number;
  rate?: number;
  volume?: number;
  preferFemaleVoice?: boolean;
}

// Define a class to handle browser speech synthesis
export class BrowserVoiceSynthesisService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private options: VoiceSynthesisOptions = {
    pitch: 1.1, // Slightly higher for more natural female voice
    rate: 0.95, // Slightly slower for better comprehension
    volume: 1.0,
    preferFemaleVoice: true
  };

  constructor(options?: Partial<VoiceSynthesisOptions>) {
    this.synth = window.speechSynthesis;
    this.options = { ...this.options, ...options };
    this.loadVoices();
    
    // Chrome loads voices asynchronously
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = this.loadVoices.bind(this);
    }
  }

  private loadVoices(): void {
    this.voices = this.synth.getVoices();
    this.selectVoice();
  }

  private selectVoice(): void {
    if (this.voices.length === 0) return;

    // Try to find a high-quality female English voice
    const preferredVoices = [
      // Chrome voices
      "Google UK English Female",
      "Google US English Female",
      // Safari voices
      "Samantha",
      "Victoria",
      // Edge/Windows voices
      "Microsoft Zira Desktop",
      "Microsoft Hazel Desktop",
      // Generic
      "Female"
    ];
    
    // First try to find a preferred voice
    for (const preferredVoice of preferredVoices) {
      const voice = this.voices.find(v => 
        v.name.includes(preferredVoice) && 
        v.lang.startsWith('en')
      );
      
      if (voice) {
        this.selectedVoice = voice;
        return;
      }
    }
    
    // If we couldn't find a preferred voice, try to find any female voice
    if (this.options.preferFemaleVoice) {
      const femaleVoice = this.voices.find(v => 
        (v.name.toLowerCase().includes('female') || 
        v.name.includes('Samantha') ||
        v.name.includes('Victoria')) && 
        v.lang.startsWith('en')
      );
      
      if (femaleVoice) {
        this.selectedVoice = femaleVoice;
        return;
      }
    }
    
    // Fall back to any English voice
    const englishVoice = this.voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      this.selectedVoice = englishVoice;
      return;
    }
    
    // Last resort: use the first available voice
    this.selectedVoice = this.voices[0];
  }

  public speak(text: string): void {
    // Cancel any ongoing speech
    this.synth.cancel();
    
    // If no text or no voice, do nothing
    if (!text || this.voices.length === 0) return;
    
    // Create a new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply options
    utterance.pitch = this.options.pitch || 1.0;
    utterance.rate = this.options.rate || 1.0;
    utterance.volume = this.options.volume || 1.0;
    
    // Set the selected voice if available
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    
    // Speak the text
    this.synth.speak(utterance);
  }

  public stop(): void {
    this.synth.cancel();
  }

  public pause(): void {
    this.synth.pause();
  }

  public resume(): void {
    this.synth.resume();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    return this.selectedVoice;
  }

  public setVoice(voice: SpeechSynthesisVoice): void {
    this.selectedVoice = voice;
  }

  public setOptions(options: Partial<VoiceSynthesisOptions>): void {
    this.options = { ...this.options, ...options };
  }
}

// React hook to use the voice synthesis service
export const useVoiceSynthesis = (options?: VoiceSynthesisOptions) => {
  const [service, setService] = useState<BrowserVoiceSynthesisService | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only initialize in browser environment
    if (typeof window !== 'undefined') {
      const voiceService = new BrowserVoiceSynthesisService(options);
      setService(voiceService);
      
      // Wait a bit to ensure voices are loaded
      const readyTimer = setTimeout(() => {
        setIsReady(true);
      }, 1000);
      
      return () => {
        clearTimeout(readyTimer);
        voiceService.stop();
      };
    }
  }, []);

  const speak = (text: string) => {
    if (service) {
      service.speak(text);
    }
  };

  const stop = () => {
    if (service) {
      service.stop();
    }
  };

  const pause = () => {
    if (service) {
      service.pause();
    }
  };

  const resume = () => {
    if (service) {
      service.resume();
    }
  };

  const getVoices = () => {
    return service ? service.getVoices() : [];
  };

  const getSelectedVoice = () => {
    return service ? service.getSelectedVoice() : null;
  };

  const setVoice = (voice: SpeechSynthesisVoice) => {
    if (service) {
      service.setVoice(voice);
    }
  };

  return {
    speak,
    stop,
    pause,
    resume,
    getVoices,
    getSelectedVoice,
    setVoice,
    isReady
  };
};

// VoiceSynthesisProvider component for React context
interface VoiceSynthesisProviderProps {
  children: React.ReactNode;
  options?: VoiceSynthesisOptions;
}

const VoiceSynthesisContext = React.createContext<ReturnType<typeof useVoiceSynthesis> | null>(null);

export const VoiceSynthesisProvider: React.FC<VoiceSynthesisProviderProps> = ({ 
  children,
  options
}) => {
  const voiceSynthesis = useVoiceSynthesis(options);
  
  return (
    <VoiceSynthesisContext.Provider value={voiceSynthesis}>
      {children}
    </VoiceSynthesisContext.Provider>
  );
};

export const useVoiceSynthesisContext = () => {
  const context = React.useContext(VoiceSynthesisContext);
  
  if (!context) {
    throw new Error("useVoiceSynthesisContext must be used within a VoiceSynthesisProvider");
  }
  
  return context;
};
