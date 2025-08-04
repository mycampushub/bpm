import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVoice } from '@/contexts/VoiceContext';
import { VoiceTrainerToggle } from './VoiceTrainerToggle';
import { Mic, MicOff, Volume2, VolumeX, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export const VoiceTrainingManager: React.FC = () => {
  const { 
    isVoiceEnabled, 
    isSupported, 
    voices, 
    selectedVoice, 
    setSelectedVoice,
    speakText,
    stopSpeaking
  } = useVoice();

  const [testText, setTestText] = useState("Hello! This is a voice training test. I'm your AI assistant helping you with process management.");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTestVoice = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      speakText(testText);
      setIsPlaying(true);
      // Reset playing state after 5 seconds
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  const handleVoiceChange = (voiceIndex: string) => {
    const voice = voices[parseInt(voiceIndex)];
    if (voice) {
      setSelectedVoice(voice);
    }
  };

  if (!isSupported) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <VolumeX className="h-5 w-5" />
            <span>Voice Training</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>Voice synthesis is not supported in your browser.</p>
            <p className="text-sm mt-2">Try using Chrome, Firefox, or Safari.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <span>Voice Training</span>
            </div>
            <Badge variant={isVoiceEnabled ? "default" : "secondary"}>
              {isVoiceEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Voice Status</span>
            <div className="flex items-center space-x-2">
              {isVoiceEnabled ? (
                <>
                  <Mic className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Active</span>
                </>
              ) : (
                <>
                  <MicOff className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Inactive</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Voice Selection</span>
            <Select 
              value={selectedVoice ? voices.indexOf(selectedVoice).toString() : ""} 
              onValueChange={handleVoiceChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Test Voice</span>
            <div className="flex space-x-2">
              <Button
                onClick={handleTestVoice}
                disabled={!isVoiceEnabled}
                variant={isPlaying ? "destructive" : "default"}
                size="sm"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Test
                  </>
                )}
              </Button>
              <Button
                onClick={() => stopSpeaking()}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Voice Training Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Available Voices: {voices.length}</label>
                  <p className="text-xs text-muted-foreground">
                    Current voice: {selectedVoice?.name || 'None selected'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Voice Features</label>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Automatic voice selection based on language</li>
                    <li>• Optimized speech rate and pitch</li>
                    <li>• Real-time voice guidance</li>
                    <li>• Process-specific vocabulary</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <VoiceTrainerToggle />
    </div>
  );
};