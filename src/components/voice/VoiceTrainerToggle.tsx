
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVoice } from '@/contexts/VoiceContext';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

export const VoiceTrainerToggle: React.FC = () => {
  const { isVoiceEnabled, toggleVoice, isSupported } = useVoice();

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
          Voice not supported
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleVoice}
        variant={isVoiceEnabled ? "default" : "outline"}
        size="sm"
        className={`shadow-lg ${
          isVoiceEnabled 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-white hover:bg-gray-50"
        }`}
      >
        {isVoiceEnabled ? (
          <>
            <Volume2 className="h-4 w-4 mr-2" />
            Voice On
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4 mr-2" />
            Voice Off
          </>
        )}
      </Button>
    </div>
  );
};
