import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceTrainingManager } from './VoiceTrainingManager';
import { Badge } from '@/components/ui/badge';
import { useVoice } from '@/contexts/VoiceContext';
import { Volume2, VolumeX, Mic, Settings } from 'lucide-react';

export const VoiceTrainingDashboard: React.FC = () => {
  const { isVoiceEnabled, isSupported, voices, selectedVoice } = useVoice();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Voice Training Dashboard</h1>
          <p className="text-muted-foreground">
            Configure and train your AI voice assistant for process management
          </p>
        </div>
        <Badge 
          variant={isVoiceEnabled ? "default" : "secondary"}
          className="flex items-center gap-2"
        >
          {isVoiceEnabled ? (
            <>
              <Volume2 className="h-4 w-4" />
              Voice Active
            </>
          ) : (
            <>
              <VolumeX className="h-4 w-4" />
              Voice Inactive
            </>
          )}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voice Status</CardTitle>
            <Mic className={`h-4 w-4 ${isVoiceEnabled ? 'text-green-600' : 'text-gray-400'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isVoiceEnabled ? 'Active' : 'Inactive'}
            </div>
            <p className="text-xs text-muted-foreground">
              {isSupported ? 'Browser supports voice synthesis' : 'Voice not supported'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Voices</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{voices.length}</div>
            <p className="text-xs text-muted-foreground">
              {selectedVoice ? `Using: ${selectedVoice.name}` : 'No voice selected'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voice Language</CardTitle>
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedVoice?.lang?.split('-')[0]?.toUpperCase() || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedVoice?.lang || 'No language detected'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VoiceTrainingManager />
        
        <Card>
          <CardHeader>
            <CardTitle>Voice Training Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <h4 className="text-sm font-medium">Process Guidance</h4>
                  <p className="text-xs text-muted-foreground">
                    Voice-guided process modeling and navigation
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <h4 className="text-sm font-medium">Element Descriptions</h4>
                  <p className="text-xs text-muted-foreground">
                    Automatic descriptions for BPMN elements and tools
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <div>
                  <h4 className="text-sm font-medium">Accessibility Support</h4>
                  <p className="text-xs text-muted-foreground">
                    Enhanced accessibility for visually impaired users
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div>
                  <h4 className="text-sm font-medium">Real-time Feedback</h4>
                  <p className="text-xs text-muted-foreground">
                    Instant voice feedback on actions and status updates
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};